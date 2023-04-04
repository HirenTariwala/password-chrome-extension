let decryptedKey;

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateString = (length) => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

chrome.storage.sync.get("encryptedKey", ({ encryptedKey }) => {
  console.log("encryptedKey", encryptedKey)
  decryptedKey = atob(encryptedKey);
  document.getElementById("secret-key").innerHTML = decryptedKey;
});

document.getElementById("re-generate").addEventListener("click", () => {
  let newSecretKey = generateString(10);
  let newEncryptedKey = btoa(newSecretKey);
  document.getElementById("secret-key").innerHTML = newSecretKey;
  chrome.storage.sync.set({ encryptedKey: newEncryptedKey }, () => {});
  chrome.storage.sync.set({ secretKey: newSecretKey }, () => {});
});

document.getElementById("logout").addEventListener("click", () => {
  chrome.storage.sync.set({ isLogin: false }, () => {});
  const resetConfirmation = confirm("Do you want to reset the extensin state");
  if (resetConfirmation) {
    chrome.storage.sync.remove(["encryptedKey", "encryptedPassword"])
    window.close();
  } else {
    location.href = "login.html";
  }
});
