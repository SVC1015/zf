// Study on 10/15


// step 1 always create function to set variables (seemingly always queryselector for everything that the user will make changes to. can get the classes from html)
(function () {
  //
  // Variables
  //
  const entryForm = document.querySelector("#entry-form");
  const entriesList = document.querySelector(".entries-list");
  const entryTitle = document.querySelector(".entry-title");
  const entryTextbox = document.querySelector(".entry-textbox");

  const lastChangedSpan = document.querySelector(".date-updated");
// step 2 make an array so your elements can be read by cpu)
  var entries = [];
  readData();
  updateEntries();
  //
  // step 3 make sure that u create functions for functionality (always prevent default)
  //

  function onEntrySubmit(event) {
    event.preventDefault();

    addNewEntry(entryTitle.value, entryTextbox.value);
    updateEntries();
    clearInputFields();

    console.log(entries);
  }

  // step 4 now tht infrastructure is in place add function to allow posting
  function addNewEntry(title, description) {
    let entry = {
      entryTitle: title,
      entryDescription: description,
      entryDate: getCurrentDateTime(),
    };

    entries.push(entry);
    saveData();
  }

  // step 5 update entries make sure if they are empty they get deleted
  function updateEntries() {
    // Clear out entires from list in html dom
    entriesList.innerHTML = "";
// for loop to create objects
    entries.forEach(function (entry, index) {
      const displayEntryBtn = document.createElement("button");
      displayEntryBtn.className = "display-entry-button";
      displayEntryBtn.innerText = entry.entryDate;
      entriesList.appendChild(displayEntryBtn); // Insert at the start of entires

      // creation of delete btn
      const deleteEntryBtn = document.createElement("button");
      deleteEntryBtn.className = "delete-entry-button";
      deleteEntryBtn.innerText = "Delete";
      entriesList.appendChild(deleteEntryBtn); // Insert at the start of entires
      // creation of entry
      const singleEntryTitleEl = document.createElement("h3");
      singleEntryTitleEl.className = "single-entry title";
      singleEntryTitleEl.innerText = entry.entryTitle;
      singleEntryTitleEl.style.display = "none";
      entriesList.appendChild(singleEntryTitleEl);
      // creation of entry div
      const singleEntryTextEl = document.createElement("div");
      singleEntryTextEl.className = "single-entry clear";
      singleEntryTextEl.innerText = entry.entryDescription;
      singleEntryTextEl.style.display = "none";
      entriesList.appendChild(singleEntryTextEl);
      
      // step 6 for loop for event listeners
      displayEntryBtn.addEventListener("click", function () {
        // Hide all entries upon display entry button click
        const allEntries = document.querySelectorAll(".single-entry");
        allEntries.forEach((element) => {
          element.style.display = "none";
        });

        // Only show submitted work
        singleEntryTitleEl.style.display = "block";
        singleEntryTextEl.style.display = "block";
      });
      // not sure what delete at index means?
      deleteEntryBtn.addEventListener("click", function () {
        deleteAtIndex(index);
      });
    });

    getLastChangedDate();
  }
  // tell cpu to read the data into LS
  function readData() {
    let parsedEntries = JSON.parse(localStorage.getItem("entries"));

    if (parsedEntries) {
      entries = parsedEntries;
    }

    getLastChangedDate();
  }

  function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
    localStorage.setItem(
      "lastChangedDate",
      JSON.stringify(getCurrentDateTime())
    );
  }
  // when to delete items
  function deleteAtIndex(index) {
    console.log("Want to delete at index: " + index);
    entries.splice(index, 1);
    saveData();
    updateEntries();
  }

  function getLastChangedDate() {
    let parsedDate = JSON.parse(localStorage.getItem("lastChangedDate"));

    if (parsedDate) {
      lastChangedSpan.textContent = "Last updated: " + parsedDate;
      console.log(parsedDate);
    } else {
      lastChangedSpan.textContent = "";
    }
  }

  function clearInputFields() {
    entryTitle.value = "";
    entryTextbox.value = "";
  }

  // Gets current date time
  function getCurrentDateTime() {
    let nowDate = new Date();
    nowDate.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
    });

    return nowDate.toLocaleString();
  }

  //
  // Inits & Event Listeners
  //
  entryForm.addEventListener("submit", onEntrySubmit);
})();