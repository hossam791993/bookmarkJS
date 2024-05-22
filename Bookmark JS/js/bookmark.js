let bookmarkName = document.getElementById("bookmark-name");
let websiteUrl = document.getElementById("website-url");
let submitBtn = document.getElementById("submit");
let bookmarkWebsitesBody = document.querySelector(".bookmarks-website-body");
let alertContainer = document.querySelector(".alert");
let overlay = document.querySelector(".overlay");
let closeToggle = document.getElementById("close-toggle");
let urlReg =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

let inputObjContainer;

if (localStorage.getItem("bookmark") == null) {
  inputObjContainer = [];
} else {
  inputObjContainer = JSON.parse(localStorage.getItem("bookmark"));
  addElement();
}

submitBtn.addEventListener("click", displayElement);
closeToggle.addEventListener("click", diplayAlert);
overlay.addEventListener("click", diplayAlert);
window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    alertContainer.classList.remove("alert-appear");
    overlay.classList.remove("d-block");
    overlay.classList.add("d-none");
  }
});

function displayElement() {
  let inputObj = {
    bookmarkNameValue: bookmarkName.value,
    websiteUrlValue: websiteUrl.value,
  };
  if (inputObj.websiteUrlValue.includes("https://www.")) {
    console.log("yes");
  } else if (!inputObj.websiteUrlValue.includes("https://www.")) {
    console.log("no");
  }
  if (
    !inputObj.bookmarkNameValue ||
    !inputObj.websiteUrlValue ||
    !urlReg.test(inputObj.websiteUrlValue)
  ) {
    diplayAlert();
    inputObjContainer = JSON.parse(localStorage.getItem("bookmark"));
    addElement();
  } else {
    inputObjContainer.push(inputObj);
    localStorage.setItem("bookmark", JSON.stringify(inputObjContainer));
    addElement();
  }
  clearInputs();
}

function clearInputs() {
  bookmarkName.value = null;
  websiteUrl.value = null;
}

function addElement() {
  let bookmarkContainer = "";
  for (let i = 0; i < inputObjContainer.length; i++) {
    const element = inputObjContainer[i];
    bookmarkContainer += `
    <div class="row fw-normal item py-2">
      <div class="col-3 d-flex justify-content-center align-items-center">
        <p class="m-0">${i + 1}</p>
      </div>
      <div
        class="col-3 text-center d-flex justify-content-center align-items-center"
      >
        <p class="m-0">${element.bookmarkNameValue}</p>
      </div>
      <div class="col-3 text-center">          
          <a
            target="_blank"
            href="${
              element.websiteUrlValue.includes("https://www.") ||
              element.websiteUrlValue.includes("http://www.")
                ? ""
                : "https://www."
            }${element.websiteUrlValue}/"
            class="text-decoration-none text-white btn btn-success visit"
            ><i class="fa-solid fa-eye text-white me-1"></i> Visit</a
          >
      </div>
      <div class="col-3 text-center">
        <button class="btn btn-danger" id = "delete-btn" onclick = "deleteItem(${i})">
          <i class="fa-solid fa-trash-can text-white me-1"></i>
          Delete
        </button>
      </div>
    </div>`;
  }
  bookmarkWebsitesBody.innerHTML = bookmarkContainer;
}

function diplayAlert() {
  alertContainer.classList.toggle("alert-appear");
  overlay.classList.toggle("d-block");
  overlay.classList.toggle("d-none");
}

function deleteItem(index) {
  inputObjContainer.splice(index, 1);
  addElement();
  localStorage.setItem("bookmark", JSON.stringify(inputObjContainer));
}
