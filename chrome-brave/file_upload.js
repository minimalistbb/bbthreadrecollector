var errMsg = document.getElementById("error");
var succMsg = document.getElementById("success");
var submit = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", function () {
  var fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("click", function () {
    errMsg.innerText = "";
    succMsg.innerText = "";
  });

  submit.addEventListener("click", function () {
    var file = fileInput.files[0];
    if (file) {
      // Check if the selected file is a .txt file
      if (file.name.endsWith(".txt")) {
        checkFileStructure(file)
          .then(function (numbers) {
            pushNewThreads(numbers);
          })
          .catch(function (error) {
            errMsg.innerText = "Invalid structure";
            console.error(error); // File structure is not valid or error occurred
          });
      } else {
        errMsg.innerText = "File must be .txt";
      }
    } else {
      errMsg.innerText = "Please choose a file first";
    }
  });
});

function checkFileStructure(file) {
  // Create a FileReader to read the contents of the file
  var reader = new FileReader();

  // Define a promise to handle asynchronous file reading
  return new Promise((resolve, reject) => {
    // Set up event listener for when file reading is completed
    reader.onload = function (event) {
      // Get the contents of the file
      var contents = event.target.result;
      // Remove any leading or trailing whitespace
      contents = contents.trim();
      // Split the contents into an array of numbers using comma as delimiter
      var numbersArray = contents.split(",").map(Number);

      // Resolve with the array of numbers
      resolve(numbersArray);
    };

    // Set up event listener for when an error occurs during file reading
    reader.onerror = function (event) {
      reject("Error reading the file.");
    };

    // Read the file as text
    reader.readAsText(file);
  });
}

function pushNewThreads(threadList) {
  // Retrieve existing threads or initialize as an empty array
  chrome.storage.local.get("threads", function (result) {
    let threads = result.threads || [];

    // Ensure threads is an array
    if (!Array.isArray(threads)) {
      threads = [];
    }

    threadList.forEach(function (thread) {
      var sthread = thread.toString();
      if (!threads.includes(sthread)) {
        threads.push(sthread);
      }
    });

    // Save the updated list
    chrome.storage.local.set({ threads: threads }, function () {
      if (chrome.runtime.lastError) {
        // If an error occurred while saving
        console.error(chrome.runtime.lastError);
        errMsg.innerText =
          "Error saving threads: " + chrome.runtime.lastError.message;
      } else {
        // If saving was successful
        console.log("Threads saved:", threads);
        succMsg.innerText = "Threads saved successfully";
      }
    });
  });
}
