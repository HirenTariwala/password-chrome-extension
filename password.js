let createdPassword;
let confirmedPassword;
let encryptedPassword;
let decryptedPassword;
let encryptedKey;

chrome.storage.sync.get("encryptedPassword", ({ encryptedPassword }) => {
  encryptedPassword = encryptedPassword;
  decryptedPassword = btoa(encryptedPassword);
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("isLogin", async ({ isLogin }) => {
    
    chrome.storage.sync.get("encryptedPassword", ({ encryptedPassword }) => {
      encryptedPassword = encryptedPassword;
      decryptedPassword = btoa(encryptedPassword);
      console.log("isLogin", isLogin, encryptedPassword);
      if (encryptedPassword) {
        if (isLogin) {
          location.href = "secretKey.html";
        }
        if (!isLogin) {
          location.href = "login.html";
        }
      }
    });
  });
});

chrome.storage.sync.get("secretKey", async ({ secretKey }) => {
  encryptedKey = btoa(secretKey);
});

//access the create password values
document
  .getElementById("create-password")
  .addEventListener("change", (event) => {
    createdPassword = event.target.value;
  });

//access the confirm password values
document
  .getElementById("confirm-password")
  .addEventListener("change", (event) => {
    confirmedPassword = event.target.value;
  });

//check if the create password value matches the  confirm password value
document.getElementById("confirm").addEventListener("click", () => {
  if (createdPassword === confirmedPassword) {
    console.log("key", encryptedKey);
    let encryptedPassword = btoa(createdPassword);
    chrome.storage.sync.set({ encryptedPassword: encryptedPassword }, () => {});
    chrome.storage.sync.set({ encryptedKey: encryptedKey }, () => {});
    location.href = "login.html";
  } else {
    alert("Not MATCHED");
  }
});
