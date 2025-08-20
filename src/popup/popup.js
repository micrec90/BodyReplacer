const modeSelect = document.getElementById("mode");
const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");

function updateModeUI(mode) {
  if (mode === "image") {
    imageInput.classList.remove("hidden");
    textInput.classList.add("hidden");
  } else if (mode === "text") {
    imageInput.classList.add("hidden");
    textInput.classList.remove("hidden");
  }
}

modeSelect.addEventListener("change", () => {
  updateModeUI(modeSelect.value);
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const keywords = document.getElementById("keywords").value.trim();
  const separator = document.getElementById("separator").value || " ";
  const mode = modeSelect.value;
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const replacementText = document.getElementById("replacementText").value.trim();

  if (!keywords) {
    alert("Please enter at least one keyword.");
    return;
  }
  if (mode === "image" && !imageUrl) {
    alert("Please enter an image source URL.");
    return;
  }
  if (mode === "text" && !replacementText) {
    alert("Please enter replacement text.");
    return;
  }

  chrome.storage.sync.set({ keywords, separator, mode, imageUrl, replacementText }, () => {
    alert("Settings saved!");
  });
});

window.onload = () => {
  chrome.storage.sync.get(["keywords", "separator", "mode", "imageUrl", "replacementText"], (data) => {
    if (data.keywords) document.getElementById("keywords").value = data.keywords;
    if (data.separator) document.getElementById("separator").value = data.separator;
    if (data.mode) {
      modeSelect.value = data.mode;
      updateModeUI(data.mode);
    }
    if (data.imageUrl) document.getElementById("imageUrl").value = data.imageUrl;
    if (data.replacementText) document.getElementById("replacementText").value = data.replacementText;
  });
};