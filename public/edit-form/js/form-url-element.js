export const formUrlElement = (url) => {
  const urlElement = document.createElement("div");
  urlElement.classList.add("url");

  urlElement.innerHTML = `
    <span class="url-text">${url}</span>
    <button class="copy-btn">
      <i class="far fa-copy"></i>
      نسخ
    </button>
  `;

  const btn = urlElement.querySelector(".copy-btn");

  btn.addEventListener("click", () => {
    const oldState = btn.innerHTML;
    copyToClipboard(urlElement.querySelector(".url-text"));

    btn.innerHTML = `
      <i class="fas fa-check"></i>
      تم النسخ
    `;
    btn.classList.add("copied");

    setTimeout(() => {
      btn.innerHTML = oldState;
      btn.classList.remove("copied");
    }, 2000);
  });

  document.querySelector(".qr-code").appendChild(urlElement);
};


const copyToClipboard = (text) => {
  const input = document.createElement("input");
  input.value = text.textContent;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
