---
title: Bloom filters
published: true
---

Bloom filters are a set implementation that achieves high space efficiency by trading off accuracy when querying for the existence of an element. If you ask a bloom filter if an element exists in the set, it will either answer with

- The element is 100% not in the set
- The element might be in the set

Bloom filters are used for cases that would typically require unreasonably large amounts of data to store as a regular hash set, and can tolerate some amount of error when querying the set (CDN caches seem to be the prime example of a bloom filter use case.)

There also exists a variant of the bloom filter that associates a value with each element of the set, essentially implementing a space-efficient map with similar trade-offs to the regular bloom filter. This variant is called a "Bloomier Filter", which is very funny and is the main reason I chose to write this.

https://en.wikipedia.org/wiki/Bloom_filter
