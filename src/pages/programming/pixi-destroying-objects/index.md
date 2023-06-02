---
published: true
title: "Destroying objects in Pixi.js"
---

To destroy any DisplayObject, you can call `.destroy()` on it

```
const container = new PIXI.Container();
container.destroy();
```

Similarly, you can clear out a DisplayObjects contents by looping over its children and destroying them

```
const container = new PIXI.Container();
container.addChild(new PIXI.Text('Kyle'))
// Goodbye Kyle
container.children.forEach(child => child.destroy());
```

While debugging my Pixi app, I realized that I still had a ton of memory leaks, despite calling `destroy()` in all of the places I thought I should be. After looking through the API docs a bit, I found out that `destroy` accepts an object argument of options, one of them being `children: boolean`, which will recursively destroy all of that object's children. I figured that was a pretty important piece for my use, so I added that param and...still a ton of leaks.

After looking more closely at the profilings, it looked like most of the memory was being taken up by PIXI `Texture` objects. I don't know much about how PIXI Textures work, but what I did notice was that `destroy` took another 2 options that I was ignoring previously, `texture: boolean` and `baseTexture: boolean`, which, according to the API docs,

> destroy the [base] texture of the child sprite

After adding those 2 params to all of my `destroy` calls...

```
obj.destroy({
    children: true,
    texture: true,
    baseTexture: true
})
```

it looks like my memory leak issues are solved. And now looking back through some of the forum posts I had opened while looking into this, I now notice that most of the example `destroy` calls were being called as `destory(true)`, which is the same as passing `true` for all 3 options like I was doing. So at the very least, setting these options to `true` isn't a niche thing to do, and may even be the most commmon usage of `destroy`.

I'm still not sure what the significance of destroying or not destroying a texture is, or what the difference is between a "texture" and a "base texture", but I expect I'll learn more about that at some point. For now, this is getting the job done.
