# Design Chat

from: System Design Interview book

## Specification

+ 1-to-1 and small group chat
+ low latency
+ online presence
+ multi device support
  + same user can be signed into many devices at the same time
+ push notifications
+ 50 MM DAU


## Solution

### Questions & Assumptions

+ is encryption in scope?
  + assumption: no, but might be a discussion add-on
+ is authentication or authorization in scope?
  + assumption: no. assume another system handles this
+ how much latency is tolerable on push notifications?
  + assumption: seconds is ok. most of the delay will be in APNS & GNS
+ what's the average size of a chat room?
  + better question: percentiles
  + assumption: most chat rooms are 1-on-1. few have large #'s of users.
+ what's _online presence_?
  + assumption: the `...` you see when someone is writing
  

### Calculations

+ 50 MM DAU
+ assumption: 50 messages / user / day 
+ messages/day = 50 MM * 50 = 250 MM
+ assumption: message size = 1KB
+ message size / day = 250 MM * 1KB = 250 GB
  + could fit in memory on a single machine!
+ assumption: store messages for 10 years
+ total storage / 10yr = 250 GB * 365 * 10 = 912 500 GB = ~913 TB

+ requests per second
  + 50 MM / 24 / 60 / 60 = ~ 600
+ machines required for 50 MM active connections
  + assume 1k connections per machine
  + 50 MM / 1k = 50k
    + that's a lot of machines!
  + new assumption: 10k connections per machine
  + 50 MM / 10k = 5k
    + still a lot of machines, but more manageable
  + new assumption: 50k (65535) connections per machine
  + 50 MM / 50k = 1k



### data model

+ user
  + id
  + name
  + email

+ device
  + id
  + user id
  + device type
  + active?

+ room
  + id
  + []user id

+ message
  + id
  + timestamp
  + room id
  + user id
  + content
  
+ indexes
  + message [ room, timestamp(desc) ]
  


### Thoughts

+ need to maintain connections
  + pull
    + would require a lot of requests, especially since we can about low latency
  + long poll
    + maintain a long running connection from all active clients
  + push
    + can we use a notification to push to an active user, or only when inactive?
      + I'm not aware of this being possible on iOS...
      + In fact, I'm not aware of any targetted mechanism to send data
        to a client device other than APNS
  + conclusion: long poll
    + would need 5k machines just to hold all the long poll connections
+ notifications
  + queuing system
  + ~600 requests/s * 1 user (avg per room) = 600 expected queue size
  + what happens is APNS or GCN are down?
    + continue to store until back up
    + dropping buffer?
      + no need to send multiple messages for same room
        + well, some people would like that...
  + does APNS or GCN allow batch messages?
    + assumption: no


### Design

+ Writes
  + machine with connection accepts new message request
  + forwards to write/fan-out service
    + updates database & write-thru LRU cache
    + continues to notification app
    + templating, if necessary
    + db: devices for user
    + put on proper queue
  + need service to find machine holding active long poll connection
    to any user>device
  + Application: push to APNS & GCN
    + read from queue
    + send to service
    
+ Reads
  + cache of messages by room
  + if returning from inactive
    + accept timestamp of most recently read message
    + read from cache all messages since given timestamp
    + return new messages
    + update devices table, setting to active
    
+ Find Active Connection Service
  + maybe we don't need to _find_
   + rather, we could have machines with connections register their
     interest in a device
  + Zookeeper or Chubby for service discovery
