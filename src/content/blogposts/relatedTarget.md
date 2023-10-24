---
title: relatedTarget
date: 2023-06-10
references: [https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget]
tags: [js]
---

I was recently debugging an issue where I was trying to put focus on an text input after a popover closed, but the input was getting that focus immediately removed..._sometimes_. I added some logs to `onblur` and `onfocus` callbacks to confirm my understanding of when the element was getting focused/blurred, but wasn't able to figure out what element was stealing focus, and why. After some aimless clicking around in the console, I noticed that the `focus`/`blur` event logs that I had added before had a field called `relatedTarget`, containing an HTML Element object. It turns out that this field was exactly what I needed to debug my issue.

The `relatedTarget` property is present on `focus`, `blur`, `focusin`, and `focusout` events, and contains the element on the opposite side of whatever event just occurred. So if you received a `focus` event on an element, the `relatedTarget` property will be set to the element that lost its focus, and vice-versa for `blur` events.

In my situation, the popover I referred to earlier was an emoji picker, which it turns out was forcing focus onto any emoji that you hovered over. So if I opened and closed that popover fast enough, the `mouseover` event for at least one of the hovered emojis could actually get emitted after focus was already forced onto the input, putting focus back on the emoji element that was now hidden.

