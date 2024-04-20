var pmessage = document.getElementById("message");
var container = document.querySelector(".container");

createButtons();

function createButtons() {
  // Create the import button
  var importButton = document.createElement("button");
  importButton.innerHTML = "Import";
  importButton.onclick = function () {
    openFileUploadTab();
    window.close();
  };
  container.appendChild(importButton);

  // Create Export button
  var exportButton = document.createElement("button");
  exportButton.innerHTML = "Export";
  exportButton.onclick = function () {
    downloadLocalStorageContentAsFile("threads");
  };
  container.appendChild(exportButton);

  // Create Clear button
  var clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear Thread List";
  clearButton.onclick = function () {
    clearThreads();
  };
  container.appendChild(clearButton);
}

function openFileUploadTab() {
  // Open a new tab with the file upload dialog
  chrome.tabs.create({
    url: "file_upload.html", // Replace "file_upload.html" with the path to your file upload page
    active: true,
  });
}

function downloadLocalStorageContentAsFile(key) {
  chrome.storage.local.get("threads", (data) => {
    if (data.threads) {
      // Convert the content to a Blob
      const blob = new Blob([data.threads], { type: "text/plain" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      chrome.downloads.download(
        {
          url: url,
          filename: `threads.txt`,
          saveAs: false,
        },
        (downloadId) => {
          if (downloadId) {
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 10000); // 10-second delay before revoking URL, adjust as necessary
          } else if (chrome.runtime.lastError.message) {
            console.error(
              "Download failed: " + chrome.runtime.lastError.message
            );
          }
        }
      );

      pmessage.style.color = "green";
      pmessage.innerText = "File exported, check you downloads!";
    } else {
      pmessage.style.color = "red";
      pmessage.innerText = "Thread List is blank!";
    }
  });
}

function clearThreads() {
  chrome.storage.local.remove("threads", function () {
    if (chrome.runtime.lastError) {
      // If an error occurred while removing the item
      console.error(chrome.runtime.lastError);
      // Display error message
      pmessage.style.color = "red";
      pmessage.innerText =
        "Error clearing thread list: " + chrome.runtime.lastError.message;
    } else {
      // If removal was successful
      console.log("Thread list cleared successfully!");
      // Display success message
      pmessage.style.color = "green";
      pmessage.innerText = "Thread List cleared successfully!";
    }
  });
}
