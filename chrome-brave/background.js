// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save") {
    saveData(sendResponse, message.data); // Pass sendResponse to saveData function
  } else if (message.action === "retrieve") {
    retrieveData(sendResponse);
  }
  return true;
});

function saveData(sendResponse, threadID) {
  // Retrieve existing threads from storage
  chrome.storage.local.get("threads", (data) => {
    let threads = data.threads || []; // Get existing threads or initialize empty array if not present

    // Check if threadID is already present in threads array
    if (!threads.includes(threadID)) {
      // If not present, push the threadID into the threads array
      threads.push(threadID);

      // Save updated threads array to storage
      chrome.storage.local.set({ threads: threads }, () => {
        console.log("Thread ID added to storage:", threadID);
        if (sendResponse) {
          sendResponse("saved");
        }
      });
    } else {
      // If threadID is already present, do not add it again
      console.log("Thread ID already exists in storage:", threadID);
      if (sendResponse) {
        sendResponse("readed");
      }
    }
  });
}

// Function to retrieve data from Chrome local storage
// Function to retrieve data from Chrome local storage
function retrieveData(sendResponse) {
  chrome.storage.local.get("threads", (data) => {
    const threads = data.threads || [];
    sendResponse(threads);
  });
  return true; // Keep the message channel open to send response asynchronously
}
