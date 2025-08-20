chrome.storage.sync.get(
  ["keywords", "separator", "mode", "imageUrl", "replacementText"],
  ({ keywords, separator, mode, imageUrl, replacementText }) => {
    if (!keywords || !mode) return;

    const url = window.location.href.toLowerCase();

    // fallback: space separator if none given
    const sep = separator && separator.trim() ? separator : " ";
    const keywordList = keywords.toLowerCase().split(sep).map(k => k.trim()).filter(Boolean);

    const found = keywordList.some(kw => url.includes(kw));

    if (found) {
      document.body.innerHTML = "";

      if (mode === "image" && imageUrl) {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.style.display = "block";
        image.style.margin = "0 auto";
        image.style.maxWidth = "100vw";
        image.style.maxHeight = "100vh";
        document.body.appendChild(image);
      }

      if (mode === "text" && replacementText) {
        const textEl = document.createElement("div");
        textEl.innerText = replacementText;
        textEl.style.display = "flex";
        textEl.style.justifyContent = "center";
        textEl.style.alignItems = "center";
        textEl.style.height = "100vh";
        textEl.style.fontSize = "2rem";
        textEl.style.fontFamily = "Arial, sans-serif";
        document.body.appendChild(textEl);
      }
    }
  }
);