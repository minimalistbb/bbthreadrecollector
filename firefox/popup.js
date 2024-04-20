var pmessage = document.getElementById("message");
const exportMsg = "export";

function createButtons() {
  // Create the import button
  var importButton = document.createElement("button");
  importButton.innerHTML = "Import";
  importButton.onclick = function () {
    openFileUploadTab();
    window.close();
  };
  document.body.appendChild(importButton);

  // Create Export button
  var exportButton = document.createElement("button");
  exportButton.innerHTML = "Export";
  exportButton.onclick = function () {
    downloadLocalStorageContentAsFile("numbers");
  };
  document.body.appendChild(exportButton);

  // Create Clear button
  var clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear Thread List";
  clearButton.onclick = function () {
    browser.storage.local
      .remove("numbers")
      .then(() => {
        pmessage.style.color = "green";
        pmessage.innerText = "Thread List cleared successfully!";
      })
      .catch((error) => {
        pmessage.style.color = "red";
        pmessage.innerText = error;
      });
  };
  document.body.appendChild(clearButton);
}

function downloadLocalStorageContentAsFile(key) {
  // Retrieve the content of the specified key from local storage
  browser.storage.local
    .get(key)
    .then((result) => {
      // Check if the key exists in local storage
      if (result[key]) {
        // Convert the content to a Blob
        const blob = new Blob([result[key]], { type: "text/plain" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        // Initiate the file download using the downloads API
        browser.downloads.download(
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
            } else if (browser.runtime.lastError) {
              console.error("Download failed: " + browser.runtime.lastError);
            }
          }
        );
      } else {
        pmessage.innerText = "Thread list blank!";
      }
    })
    .catch((error) => {
      pmessage.style.color = "red";
      pmessage.innerText =
        "Error retrieving content from local storage:" + error;
    });
}

function openFileUploadTab() {
  // Open a new tab with the file upload dialog
  browser.tabs.create({
    url: "file_upload.html", // Replace "file_upload.html" with the path to your file upload page
    active: true,
  });
}

createButtons();
