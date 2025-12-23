//function to format text accordin each tag for example(@,#,gmail.com,links)
export const formatText = (editableDiv) => {
  const text = editableDiv.innerText.replace(/\n/g, " ");
  const words = text.split(/(\s+)/);
  const fragment = document.createDocumentFragment();

  words.forEach((word) => {
    if (word.trim() === "") {
      fragment.appendChild(document.createTextNode(word));
    } else {
      const span = document.createElement("span");

      if (word.startsWith("#")) {
        span.style.color = "purple";
        span.style.fontWeight = "bold";
      } else if (word.includes("@gmail.com")) {
        span.style.color = "orange";
        span.style.fontWeight = "bold";
      } else if (isValidURL(word)) {
        span.style.color = "#3b82f6";
        span.style.textDecoration = "bold";
      } else if (word.includes("@")) {
        span.style.color = "green";
      } else {
        span.style.color = "black";
      }

      span.textContent = word;
      fragment.appendChild(span);
    }
  });

  editableDiv.innerHTML = "";
  editableDiv.appendChild(fragment);
  restoreCursor(editableDiv);
};

//function to validate urls
export const isValidURL = (string) => {
  if (string.startsWith("www.") || string === "ww") {
    return true;
  }
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const restoreCursor = (editableDiv) => {
  const selection = window.getSelection();
  const range = document.createRange();

  range.selectNodeContents(editableDiv);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
};
