const generateIdFromName = (name) => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash).toString();
};

const toCamelCase = (input) => {
  return input
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

export const getRandomElements = (number, array) => {
  if (array.length <= number) {
    return array;
  }

  const shuffled = [...array].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, number);
};

const parsePrice = (stringPrice) => {
  let price = 0;

  stringPrice = (stringPrice || "").toString();
  price = stringPrice.replace(/[^0-9.,]/g, "");

  if (price.slice(-3).indexOf(",") !== -1) {
    price =
      parseFloat(stringPrice.replace(/[^0-9,]/g, "").replace(",", ".")) || 0;
  } else if (price.slice(-3).indexOf(".") !== -1) {
    price = parseFloat(stringPrice.replace(/[^0-9.]/g, "")) || 0;
  } else {
    price = parseFloat(stringPrice.replace(/[^0-9]/g, "")) || 0;
  }

  return price;
};

// jQuery'deki contains mantığını uygular:
const findLastMatchingNode = (htmlContainer, selector, text) => {
  const elements = Array.from(htmlContainer.querySelectorAll(selector));
  const matchingElements = elements.filter((el) =>
    el.textContent.includes(text),
  );

  return matchingElements.length > 0
    ? matchingElements[matchingElements.length - 1]
    : null;
};

// Ürün sayfalarına istek atarak detaylı ürün verilerini toplar:
const getFullDataOnCategory = async () => {
  const products = [];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const createProductObject = (htmlContainer, url) => {
    const name =
      htmlContainer
        .querySelector("h1[data-buy-box-listing-title]")
        ?.textContent.trim() || "";
    const priceText = (
      htmlContainer.querySelector("[data-buy-box-region=price] p")
        ?.textContent || ""
    )
      .split(":")
      .slice(-1)[0]
      .trim();
    const price = parsePrice(priceText);
    const product = {
      id: generateIdFromName(name),
      name,
      price,
      originalPrice:
        parsePrice(
          htmlContainer.querySelector(
            "[data-buy-box-region=price] [class*=strikethrough]",
          )?.textContent,
        ) || price,
      currency: priceText.split(" ").slice(-1)[0],
      description: (
        htmlContainer.querySelector(
          "p[data-product-details-description-text-content]",
        )?.textContent || ""
      ).trim(),
      materials: (
        htmlContainer.querySelector("p#legacy-materials-product-details")
          ?.textContent || ""
      )
        .trim()
        .split(":")
        .slice(-1)[0]
        .trim(),
      height: (
        findLastMatchingNode(
          htmlContainer,
          "li.wt-block-grid__item div",
          "Height",
        )?.textContent || ""
      )
        .trim()
        .split(":")
        .slice(-1)[0]
        .trim(),
      img: Array.from(
        htmlContainer.querySelectorAll("li[data-carousel-pagination-item] img"),
      ).map((node) => {
        return (node?.dataset?.srcDelay || "").replace("il_75x75", "il_794x");
      }),
      url,
    };

    return product;
  };

  const fetchSequentially = async () => {
    const items = Array.from(document.querySelectorAll(".v2-listing-card"));
    for (const item of items) {
      const url = item.querySelector("a")?.href;
      if (url) {
        try {
          const response = await window.fetch(url);
          const htmlText = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const product = createProductObject(doc, url);

          products.push(product);
        } catch (error) {
          console.error("Error fetching data for", url, error);
        }
      }
      await delay(1000);
    }
  };

  await fetchSequentially();

  return products;
};

// Kategori sayfasındaki tüm ürünlerin verisini DOM elementlerinden çeker:
const getBasicDataOnCategory = () => {
  const items = [];

  Array.from(document.querySelectorAll(".v2-listing-card")).map((item, key) => {
    const name =
      item.querySelector(".v2-listing-card__title")?.textContent.trim() || "";
    const product = {
      id: key + "_" + generateIdFromName(name),
      name,
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
};

// Ürün sayfasından ürün verilerini alır:
const getProductFromProductDetail = () => {
  const name =
    document
      .querySelector("h1[data-buy-box-listing-title]")
      ?.textContent.trim() || "";
  const height = (
    findLastMatchingNode(
      window.document,
      "li.wt-block-grid__item div",
      "Height",
    )?.textContent || ""
  )
    .trim()
    .split(":")
    .slice(-1)[0]
    .trim();
  const type = "Waldorf Doll";
  const priceText = (
    document.querySelector("[data-buy-box-region=price] p")?.textContent || ""
  )
    .split(":")
    .slice(-1)[0]
    .trim();
  const price = parsePrice(priceText);
  const url = window.location.href.split("?")[0];
  const product = {
    id: generateIdFromName(name + url),
    name: `${height} ${type}`,
    price,
    originalPrice:
      parsePrice(
        document.querySelector(
          "[data-buy-box-region=price] [class*=strikethrough]",
        )?.textContent,
      ) || price,
    currency: "USD",
    materials: (
      document.querySelector("p#legacy-materials-product-details")
        ?.textContent || ""
    )
      .trim()
      .split(":")
      .slice(-1)[0]
      .trim(),
    height,
    img: Array.from(
      document.querySelectorAll("li[data-carousel-pagination-item] img"),
    ).map((node) => {
      return (node.src || "").replace("il_75x75", "il_794x");
    }),
    url,
    type: toCamelCase(type),
  };

  return product;
};
