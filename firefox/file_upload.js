var errMsg = document.getElementById("error");
var succMsg = document.getElementById("success");

document.addEventListener("DOMContentLoaded", function () {
  var fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("change", function (event) {
    errMsg.innerText = "";
    succMsg.innerText = "";
    var file = event.target.files[0];
    if (file) {
      // Check if the selected file is a .txt file
      if (file.name.endsWith(".txt")) {
        checkFileStructure(file)
          .then((numbers) => {
            pushNewNumbers(numbers);
          })
          .catch((error) => {
            errMsg.innerText = "Invalid structure";
            console.error(error); // File structure is not valid or error occurred
          });
      } else {
        errMsg.innerText = "File must be .txt";
      }
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

function pushNewNumbers(numberList) {
  // Retrieve existing numbers or initialize as an empty array
  browser.storage.local
    .get("numbers")
    .then((result) => {
      let numbers = result.numbers || [];

      // Ensure numbers is an array
      if (!Array.isArray(numbers)) {
        numbers = [];
      }

      numberList.forEach((number) => {
        var snumber = number.toString();
        if (!numbers.includes(snumber)) {
          numbers.push(snumber);
        }
      });

      // Save the updated list
      browser.storage.local
        .set({ numbers: numbers })
        .then(() => {
          console.log("Numbers saved:", numbers);
          succMsg.innerText = "File imported correctly";
        })
        .catch((error) => {
          errMsg.innerText = error;
        });
    })
    .catch((error) => {
      errMsg.innerText = error;
    });
}
