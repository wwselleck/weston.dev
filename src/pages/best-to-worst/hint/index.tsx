import { renderBestToWorstPage } from "../BestToWorst";

const stars = (num: number) => {
  return "⭐".repeat(num);
};

const rankings = [
  {
    name: "Blackberry",
    stars: 5,
    desc: "No-contest, the best flavored water product in existence.",
    image: "https://i5.peapod.com/c/LC/LCN68.webp",
  },
  {
    name: "Blackberry Lemon",
    stars: 5,
    desc: "Just about as good as regular blackberry, but it loses the tie-breaker by having a more aggressive flavor, and I prefer subtle water flavors.",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/0504_FallBerryLoversM_M_BlackberryLemon_2x_546a1dc5-f07d-4d7e-9480-81611744afa7_1080x.webp?v=1635292125",
  },
  {
    name: "Strawberry Kiwi",
    stars: 4,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Strawberry_Kiwi_1200x1600_ba859d2f-ea1a-4ed7-965f-d7c9d3db4ead_1080x.webp?v=1538069422",
  },
  {
    name: "Blackberry (Sparkling)",
    stars: 4,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BlackberrySparkling_1080x.webp?v=1632761646",
  },
  {
    name: "Blueberry Lemon",
    stars: 4,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/0665_PDPImages_BlueberryLemon_1080x.webp?v=1646345485",
  },
  {
    name: "Strawberry Lemon",
    stars: 4,
    desc: "",
    image:
      "https://pro2-bar-s3-cdn-cf2.myportfolio.com/965c2eba62e89c27cf72597be0ccf3ec/38b11a8b-d71a-4cbe-8555-b31a88f2eff0_rw_1200.webp?h=62d808e385dfa1f40414edb57fc80fa5",
  },
  {
    name: "Grapefruit (Sparkling)",
    stars: 3,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/GrapefruitSparkling_1080x.webp?v=1632761662",
  },
  {
    name: "Lemon",
    stars: 3,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Lemon_1200x1600_2efbf8a6-5d7a-4410-acf1-870dde043afe_1080x.webp?v=1582842921",
  },
  {
    name: "Peach Raspberry",
    stars: 3,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/PeachRaspberry_2_900x.webp?v=1640202832",
  },
  {
    name: "Raspberry",
    stars: 3,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Raspberry_1200x1600_165ace30-0b08-41f5-8ae0-9fec94faf554_1080x.webp?v=1538069348",
  },
  {
    name: "Apple",
    stars: 2,
    desc: "",
    image:
      "https://s.cornershopapp.com/product-images/2731426.webp?versionId=yY_NXL8j70FxH4cJNYOgFS8TcblBDNwD",
  },
  {
    name: "Peach",
    stars: 2,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Peach_1200x1600_2eac5c4b-4bb8-4af5-acbd-74bb02e40293_1080x.webp?v=1538068630",
  },
  {
    name: "Ginger (Sparkling)",
    stars: 2,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/GingerUpdate_1080x.webp?v=1632762067",
  },
  {
    name: "Clementine",
    stars: 2,
    desc: "",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/Clementine-1200x1600_1080x.webp?v=1609377520",
  },
  {
    name: "Blood Orange",
    stars: 2,
    desc: "A little reminiscent of medicine, but not to the same extent as Mango Grapefruit.",
    image:
      "https://images.freshop.com/00184739001009/0fb10b8012bd7975d51a7bf5e2c6474d_large.webp",
  },
  {
    name: "Mango Grapefruit",
    stars: 1,
    desc: "Reminiscent of vitamins",
    image:
      "https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Mango_Grapefruit_1200x1600_5f5042c9-4267-43b9-8ae0-7007e21d608d_1080x.webp?v=1538068490",
  },
];

export const page = {
  title: "Best To Worst: Hint Water",
  published: true,
  renderToHTML() {
    return renderBestToWorstPage(
      "Best To Worst: Hint Water",
      rankings.map((r) => ({
        primaryText: `${r.name}`,
        secondaryText: stars(r.stars),
        desc: r.desc,
        image: r.image,
      }))
    );
  },
};
/*
---
published: true
title: "Best to Worst: Hint Water"
---
# Best to Worst: Hint Water

## 1. Blackberry ⭐⭐⭐⭐⭐


<img src="https://i5.peapod.com/c/LC/LCN68.webp" width="200px"/>


## 2. Blackberry Lemon ⭐⭐⭐⭐⭐

Just about as good as regular blackberry, but it loses the tie-breaker by having a more aggressive flavor, and I prefer subtle water flavors.

<img src="https://cdn.shopify.com/s/files/1/0014/3015/9418/products/0504_FallBerryLoversM_M_BlackberryLemon_2x_546a1dc5-f07d-4d7e-9480-81611744afa7_1080x.webp?v=1635292125" width="200px">

### 3. Strawberry Kiwi ⭐⭐⭐⭐

<img src="https://cdn.shopify.com/s/files/1/0014/3015/9418/products/BottleImage_Still_Strawberry_Kiwi_1200x1600_ba859d2f-ea1a-4ed7-965f-d7c9d3db4ead_1080x.webp?v=1538069422" width="200px">

*/
