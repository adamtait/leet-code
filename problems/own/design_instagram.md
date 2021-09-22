# Design Instagram

url: https://www.educative.io/courses/grokking-the-system-design-interview/m2yDVZnQ8lG

## Specification

### What is Instagram?

Instagram is a social networking service that enables its users to
upload and share their photos and videos with other users. Instagram
users can choose to share information either publicly or privately.
Anything shared publicly can be seen by any other user, whereas
privately shared content can only be accessed by the specified set of
people. Instagram also enables its users to share through many other
social networking platforms, such as Facebook, Twitter, Flickr, and
Tumblr.

We plan to design a simpler version of Instagram for this design
problem, where a user can share photos and follow other users. The
‘News Feed’ for each user will consist of top photos of all the people
the user follows.


### Requirements

+ users can upload photos & videos + text
+ users can search for photos & video by text
+ users can follow other users
+ each user has a "news feed" displaying the most recent photos &
  videos + text from other users they follow
  
+ needs to be highly available
+ news feed request time should be 200ms
+ consistency is less important than availability
+ uploaded content never be lost (highly reliable)

+ do not need to handle tags or tagging



## Solution

### Questions (& reasonable assumptions)

+ are there any limits to the size of images & videos?
  + what are suggested sizes that client/server to reduce to maintain quality?
  + assumption: 500 KB images, 5 MB videos
+ if a video was at the top of a newsfeed, would the entirety of the
  video need to be downloaded with the 200ms requirement?
  + assumption: no. an image placeholder would be enough
+ is 200ms requirement just the server time?
  + assumption: yes. transmission time varies widely and is out of our control
+ how many users?
  + assumption: 5MM DAU
+ how many new images & videos uploaded?
  + assumption: 1MM per day. 4 photos for every 1 video
+ do we know anything about the distribution of followers?
  + assumption: assume exponential but mean ~ 100
+ do we know anything about geographic distribution of users?
  + assumption: assume even globally
+ can anyone become a follower of anyone else? Are there private media?
  + assumption: no.
+ how long should we retain data?
  + assumption: 10 years


### Thoughts

+ biggest challenge is probably scaling reads
  + how long does it take to download 2x 500 KB images?
    + rest can be cached in background
    + depends on connection speed
  + 200ms is little more than lookup in a cache
    + we (probably) need a cache for newsfeed items!
    
### Calculations

+ 5MM users per day
+ avg user requests 15 media items per day
+ 5MM * 15 = 75MM media items in cache
  + probably less b/c exponential distribution
+ 75MM / 5 = 15MM * (0.5 * 4 + 5 * 1)[7]
  + = 105MM MB = 105 000 000 MB = 105 TB
+ 1 TB Memory per machine
  + ~ 100 cache machines?
+ retention
  + (0.5 * 4 + 5 * 1)[7mb] * (1MM / 5)[200k] = 1.4 MM MB = 1.4 TB
  + 1.4 TB * 365 * 10 = 5110 TB = ~ 5.1 PB
  
  

### ilities

+ scalability
  + horizontally scalable cache
+ security
  + requests would need to be authenticated
    + possibly rate limited, if authentication was easy to achieve
  + all requests in SSL
  + 
+ availability & failures
  + high availability desired
  + in-datacenter machine/network outage
    + replace with another machine
      + new data would need to be pulled from replication on another
        node, or directly from primary data store
  + full datacenter outage
    + failover to another replicated datacenter
+ observability
  + analytic events
  + machine & OS stats
  
    
### Design

+ read
  + newsfeed metadata service
    + given current `user id`
      + id => ids => post ids => sort by timestamp => limit to 10/page
  + 100 x 1 TB x N global datacenter cache
    + or, large CDN network
    + LRU
    + key value stores
      + `user id` => user ids (in LRU cache)
      + `user id` => post ids (in LRU cache)
      + `post id` => structured data (media + text)
    + if `user id` or `post id` not available
      + pull from data store then store in cache


+ write
  + pipeline
    + connected by persistent queuing system
      + resilient to failures
    + nodes
      + accept
      + post-process media
        + image processing
        + video encoding
      + store media in blob store
      + store post metadata in data store
      + forward to cache
      
+ persistent data store
  + user entity
    + id
    + follows[] => user ids
  + post entity
    + id
    + user id
    + text
    + media type (& other metadata)
    
+ blob store
  + post id => media content
