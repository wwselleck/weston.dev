---
title: Quickly find a Pokemon card on TCG Collector
date: 2023-11-19
---

I use a website called [TCG Collector](https://www.tcgcollector.com) to keep track of my Pokemon card collection. Whenever I obtain a new card, I:

1. Click on my TCG Collector bookmark 
2. Click on "Expansions"
3. Scroll through looking for the expansion that my new card is from, and open that link
4. Scroll through the list of cards to find mine
5. Click the `+` icon to add the card to my collection

It's honestly not that much work, the whole process takes less than 10 seconds on average I'd say, but I do this often enough that I wanted to make it a little bit easier. So I wrote this small script that will prompt you to input the number that appears on the bottom left of every Pokemon card, and will then open up TCG Collector's card list page with that number as search input. (Technically you can input any search string you want, but the card's number is probably the most efficient thing to use.)

```javascript
    javascript:(function() {
        let cardNo = prompt('Enter Card # (xx/yyy)');
        let cardNoEncoded = encodeURIComponent(cardNo);
        location = `https://www.tcgcollector.com/cards/intl?releaseDateOrder=newToOld&cardsPerPage=30&displayAs=images&cardSearch=${cardNoEncoded}` 
    })()
```

If you want to use this script yourself, just create a new bookmark, name it whatever you want, and input the script above as the `URL`. Clicking the bookmark should prompt you for a card number, and then open up TCG Collector with your card as one of the results.

![](https://i.imgur.com/BXBtIIb.png)
![](https://i.imgur.com/D401UWd.png)


Bonus unintentional easter egg: if you open the input prompt on Chrome and wait about 30 seconds without submitting it, the popup will close itself automatically, and the value `null` will be used. Luckily, `null` is actually a reasonable thing to want to search for in this context.

![](https://i.imgur.com/HD2uKfi.png)

I tried this out in Microsoft Edge and couldn't replicate the behavior, and haven't been able to find any answers via Google to explain this. Maybe I'll look into this more one day. For future reference to myself, I'm using version `119.0.6045.160` of Chrome on Windows.