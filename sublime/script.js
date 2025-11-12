const editor = document.getElementById("editor");
const tabs = document.querySelectorAll(".tab");
const saveBtn = document.getElementById("saveBtn");

const files = {
  "index.html": "<!DOCTYPE html>\n<html>\n<head>\n<title>Hello</title>\n</head>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>",
  "app.js": "console.log('Hello from app.js');",
  "style.css": "body { background: #1e1e1e; color: #fff; }"
};

let activeFile = "index.html";
editor.textContent = files[activeFile];

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    activeFile = tab.dataset.file;
    editor.textContent = files[activeFile];
  });
});

saveBtn.addEventListener("click", () => {
  files[activeFile] = editor.textContent;
  localStorage.setItem("project", JSON.stringify(files));
  alert(`Saved ${activeFile}`);
});

// Basic syntax highlighting on input
editor.addEventListener("input", highlight);
function highlight() {
  const code = editor.textContent;
  const html = code
    .replace(/(&)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\".*?\"|'.*?')/g, '<span class=\"string\">$1</span>')
    .replace(/(\/\/.*)/g, '<span class=\"comment\">$1</span>')
    .replace(/\\b(const|let|var|function|return|if|else|for|while|class|import|export|new)\\b/g,
             '<span class=\"keyword\">$1</span>');
  editor.innerHTML = html;
  placeCaretAtEnd(editor);
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
