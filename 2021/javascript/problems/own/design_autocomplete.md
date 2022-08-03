# Design Search Autocomplete system

from: System Design Interview book

## specification

+ think of Google
  + type into search bar - 'dinner'
  + Google shows suggestions to complete your query
+ does it match any string or only the beginning of queries?
  + only beginning
+ how many suggestions should it return?
  + 5
+ how are the suggestions selected?
  + popularity. historical query frequency
+ spell check?
  + no
+ in languages other than English?
  + no. possible extension.
+ capitals or special characters?
  + no. lowercase only.
+ how many users?
  + 10 MM DAU

+ fast response time
  + 100 ms
+ relevant
+ sorted by popularity
+ scalable
+ available

+ do we know anything about the distribution of queries?
  + assumption: some are hotter than others


## estimation
  
+ how many possible searches?
  + how many words in the english language?
  + guess: 1 MM
  + size of possible results (combinations of words): 1 MM * 10 = 10 MM
+ storage
  + query string + historical counter
    + how big could counter get?
      + assumption: 64 bytes (2 ^ (64*8))
  + 10 MM * 1 KB (very long query string) = 10K MB = 10 GB
    + easy to store in memory!
    + makes me think that set of possible results should be bigger
+ compute
  + 10 MM DAU * 20 queries (avg) = 200 MM queries / day
  + 200 MM / 24 / 60 / 60 = ~2300 requests / s
    + could handle this many connections on a single machine
    
## thoughts

+ fast read time => caching
  + but... how to do string matching?
    + prefix tree (trie)? (of size 10 GB)
      + would need to find max of all leaves at a given point
      + would we be able to collect all leaves easily?
        + if trie had an array representation, then we could find the [start,end] interval
          + how big might this interval be?
      + once we have the leaves, it would be easy to find the 5 max
        + use a heap or linear search
          + could this interval be slow on a large interval?
  + cache
    + string -> results
+ writes
  + need to descend into trie and increment counter
  + assume eventual consistency ok
    + accumulate into virtual trie then merge & swap occasionally
    + or, just store them in a key-value data store
    + or, stream query events to all application servers
    
## design

+ load balancer
+ query-results cache
  + LRU
  + TTL could be tunable
    + lower TTL => fresher, but (possibly) more slow requests
      + at end of TTL, could simply regenerate existing query
        + we already know the most popular queries!
    + higher TTL => less fresh, but more cache hits
+ trie cache application
  + holds trie in memory
  + searches for queries
  + tabulates results
  + returns to cache
+ persistent store
  + necessary to re-build trie
  + though, ideally we could replicate between memory on different machines
+ write system
  + accumulates queries
  + periodically rebuilds trie
  + transfers to trie cache application
