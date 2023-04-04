let decryptedPassword;
let enteredPassword;
let encryptedPassword;

chrome.storage.sync.get("encryptedPassword", ({ encryptedPassword }) => {
  encryptedPassword = encryptedPassword;
  decryptedPassword = atob(encryptedPassword);
});

document.getElementById("password").addEventListener("change", (event) => {
  enteredPassword = event.target.value;
});

document.getElementById("login").addEventListener("click", (event) => {
    if (decryptedPassword === enteredPassword) {
      chrome.storage.sync.set({ isLogin: true }, () => {});
      location.href = "secretKey.html";
    } else {
      location.href = "password.html";
    }
});
