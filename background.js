// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//function to generate random string
const generateString = (length) => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


 var keymy = "loooo";
  chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension successfully installed!");
  keymy = generateString(10);
  console.log("key", keymy);
  chrome.storage.sync.set({secretKey : keymy}, () => {})
  return;
});
 

chrome.action.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow:true},
       function(tabs) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id,
              {"message": "clicked_browser_action"}
          );
    });
 });