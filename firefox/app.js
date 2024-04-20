currentUrl = window.location.href;

window.addEventListener("pageshow", function (event) {
  const navigationType = performance.getEntriesByType("navigation")[0].type;
  console.log(event.persisted);
  if (event.persisted && currentUrl.includes("search.php")) {
    clearReadedMessageInSearch();
    searchScript();
  } else if (
    navigationType === "back_forward" &&
    currentUrl.includes("search.php")
  ) {
    clearReadedMessageInSearch();
    searchScript();
  }
});

if (currentUrl.includes("?t=") || currentUrl.includes("&t=")) {
  split1 = currentUrl.split("t=");
  threadID = split1[1].split("&")[0];
  save(threadID);
} else if (currentUrl.includes("p=")) {
  var topicUrl = document
    .querySelector(".topic-title")
    .querySelector("a")
    .getAttribute("href");
  split1 = topicUrl.split("t=");
  threadID = split1[1].split("&")[0];
  console.log(threadID);
  save(threadID);
}

if (currentUrl.includes("search.php")) {
  searchScript();
}

function searchScript() {
  searchPosts = retrieveSearchPosts();
  retrieve()
    .then((storageArray) => {
      searchPosts.forEach((threadID, post) => {
        post.style.border = "1px solid black";
        post.style.margin = "0 0 20px 0";
        if (storageArray.includes(threadID)) {
          addReadMessageForSearchThread(post);
        }
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during retrieval
      console.error("Error:", error);
    });
}

function save(newValue) {
  // Retrieve existing numbers or initialize as an empty array
  browser.storage.local
    .get("numbers")
    .then((result) => {
      let numbers = result.numbers || [];

      // Ensure numbers is an array
      if (!Array.isArray(numbers)) {
        numbers = [];
      }

      // Check if newValue already exists in the list
      if (numbers.includes(newValue)) {
        addReadMessage();
        return; // Exit the function without adding the value
      }

      // Append the new value
      numbers.push(newValue);

      // Save the updated list
      browser.storage.local
        .set({ numbers: numbers })
        .then(() => {
          console.log("Numbers saved:", numbers);
        })
        .catch((error) => {
          console.error("Error saving numbers:", error);
        });
    })
    .catch((error) => {
      console.error("Error retrieving numbers:", error);
    });
}

// retrun array of (readed) threadID from local storage
function retrieve() {
  // Retrieve the list of numbers from local storage
  return browser.storage.local
    .get("numbers")
    .then((result) => {
      const numbers = result.numbers || [];
      return numbers;
    })
    .catch((error) => {
      throw error; // Re-throw the error to be caught by the caller if needed
    });
}

function addReadMessage() {
  var container = document.querySelectorAll(".affiliatelinks")[0];

  // Create a new div element
  var newDiv = document.createElement("div");

  // Optionally, set attributes, styles, or content for the new div
  newDiv.textContent = "You have already read this thread.";
  newDiv.style.textAlign = "center";
  newDiv.style.backgroundColor = "#d4edda";
  newDiv.style.border = "1px solid #155724";
  newDiv.style.color = "#155724";
  newDiv.style.borderRadius = "5px";
  newDiv.style.padding = "10px";
  newDiv.style.margin = "10px 0";

  // Append the new div to the selected element
  container.appendChild(newDiv);
}

function addReadMessageForSearchThread(post) {
  var container = post.querySelector(".inner");

  // Create a new div element
  var newDiv = document.createElement("div");
  newDiv.textContent = "You have already read this thread.";
  newDiv.setAttribute("id", "readed");
  newDiv.style.textAlign = "center";
  newDiv.style.backgroundColor = "rgb(8, 170, 47)";
  newDiv.style.border = "1px solid rgb(21, 87, 36)";
  newDiv.style.color = "#000";
  newDiv.style.borderRadius = "5px";
  newDiv.style.padding = "10px";
  newDiv.style.margin = "10px 0";
  newDiv.style.fontSize = "15px";

  container.appendChild(newDiv);
}

// retrurn map [threadID][post]
function retrieveSearchPosts() {
  var posts = document.querySelectorAll(".post");

  var postMap = new Map();

  // Iterate over each postprofile element
  posts.forEach(function (post) {
    var postProfile = post.querySelector(".postprofile");
    // Find the corresponding <dd> element containing the topic link
    var topicDDElement = postProfile.querySelector("dd:nth-of-type(3)");

    // Check if the <dd> element exists
    if (topicDDElement) {
      // Find the <a> element within the <dd> element
      var linkElement = topicDDElement.querySelector("a");

      // Check if the <a> element exists
      if (linkElement) {
        // Retrieve the href attribute (link) of the <a> element
        var link = linkElement.getAttribute("href");

        split1 = link.split("t=");
        threadID = split1[1].split("&")[0];
        postMap.set(post, threadID);
      }
    }
  });

  return postMap;
}

//use to prevent multiple readed messages if the page is cached
function clearReadedMessageInSearch() {
  document.querySelectorAll("#readed").forEach(function (threadStatus) {
    threadStatus.remove();
  });
}
