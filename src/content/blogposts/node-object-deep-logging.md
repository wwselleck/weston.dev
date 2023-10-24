---
title: Logging deep objects in Node
date: 2023-06-03
references: [https://stackoverflow.com/a/27534731]
tags: [node]
---


Node has a `util` package, with functions `inspect` and `format` that can be used for logging. `util.inspect` has an option param `depth` that allows you to specify how many levels of nesting the function should recurse and continue to print full objects/arrays.

`console.log` uses `util.inspect` by default, but it doesn't allow you to configure the `depth` of the `util.inspect` call, it just defaults to 2. `console.dir`, on the other hand, does allow you to pass through options to the `util.inspect` call, and so it can be used to print objects of depth larger than 2.

```js
const obj = {
  w: {
    x: {
      y: {
        z: ["a"],
      },
    },
  },
};

console.log(obj); // {w: { x: y: { [Object] }}}
console.dir(obj, { depth: 2 }); // {w: { x: { y: [Object] }}}
console.dir(obj, { depth: 3 }); // {w: { x: { y: { z: [Array] }}}}
// `null` for depth allows infinite recursion
console.dir(obj, { depth: null }); // {w: { x: { y: { z: ['a'] }}}}
```
