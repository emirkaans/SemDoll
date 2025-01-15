// Etsy'de all items sayfasında veri çeken kod

const items = [];

const generateIdFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

Array.from(document.querySelectorAll(".v2-listing-card")).map((item, key) => {
  const name =
    item.querySelector(".v2-listing-card__title")?.textContent.trim() || "";
  const product = {
    id: key + "_" + generateIdFromName(name),
    name:
      item.querySelector(".v2-listing-card__title")?.textContent.trim() || "",
    price:
      item
        .querySelector(".n-listing-card__price .currency-value")
        ?.textContent.trim() || "",
    originalPrice:
      item
        .querySelector(".search-collage-promotion-price .currency-value")
        ?.textContent.trim() || "",
    currency:
      item
        .querySelector(".n-listing-card__price .currency-symbol")
        ?.textContent.trim() || "",
    img: item.querySelector("img")?.src || "",
    url: item.querySelector("a")?.href || "",
  };

  items.push(product);
});
