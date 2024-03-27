const wrapper = document.querySelector(".wrapper"),
  input = wrapper.querySelector("input"),
  textEl = wrapper.querySelector(".upload p"),
  textArea = wrapper.querySelector("textarea"),
  image = wrapper.querySelector("img"),
  clearBtn = wrapper.querySelector(".clear"),
  copyBtn = document.querySelector(".copy"),
  url = "http://api.qrserver.com/v1/read-qr-code/";

input.onchange = (el) => {
  let file = el.target.files[0],
    formData = new FormData();

  if (!file) return;

  textEl.textContent = "Uploading QR Code Image...";

  formData.append("file", file);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((response) => {
      const decoded = response[0].symbol[0].data;

      textEl.innerHTML = decoded
        ? "Upload QR Code Image to Scan"
        : "Couldn't Upload QR Code Image";

      if (!decoded) return;

      wrapper.classList.add("uploaded");
      textArea.innerText = decoded;
      image.src = URL.createObjectURL(file);
    })
    .catch(() => (textEl.textContent = "Couldn't Upload QR Code Image"));
};

clearBtn.onclick = () => wrapper.classList.remove("uploaded");
copyBtn.onclick = () => {
  navigator.clipboard.writeText(textArea.textContent);
  copyBtn.innerText = "Copied!";

  setTimeout(() => {
    copyBtn.innerText = "Copy Text";
  }, 1000);
};
