---
published: true
title: "Use an identity function to constrain a Typescript type"
---

Say you have an object like this

```ts
interface Animal {
  name: string;
  noise: string;
}

const Animals = {
  cow: { name: "cow", noise: "moo" },
  duck: { name: "duck", noise: "quack" },
};
```

and you want

- `Animals` to have values of type `Animal`
- to not have a pre-determined set of keys for `Animals`.
- have the keys of `Animals` be typed to a specific string union.

The issue here is that since the keys of `Animals` aren't defined ahead of time, we can't define `Animals` as being of type `Record<KEYS_TYPE, Animal>`, because we don't know what `KEYS_TYPE` should be; the valid keys for Animals are whatever keys are in there.

A solution here is to create an identity function with a generic param typed to the widest version of `Animals` (`Record<string, Animal>`), and then have that function just return that param, allowing it to infer a stricter return type.

```ts
interface Animal {
    name: string;
    noise: string;
}

const createAnimals = <T extends Record<string, Animal>>(t: T) {
    return t;
}
const Animals = {
    cow: {name: 'cow', noise: 'moo'},
    duck: {name: 'duck', noise: 'quack'},
} //  Record<'cow' | 'duck', Animal>
```

Note that an _almost_ solution to this issue would be to just use `as const` after the declaring `Animals`, but that wouldn't constrain the values to be of type `Animal`.

```ts
interface Animal {
  name: string;
  noise: string;
}

const Animals = {
  cow: { name: "cow", noise: "moo" },
  duck: { name: "duck", noise: "quack" },
  sheep: "baa",
} as const;
/*
Record<{
    'cow': Animal,
    'duck': Animal,
    'sheep': 'baa'
}>
*/
```
