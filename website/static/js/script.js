const BASE_URL = "http://127.0.0.1:8000";

const submitbtn = document.getElementById("submitbtn");
const urlinput = document.getElementById("urlinput");
const tdTable = document.getElementById("td-table");

const shortURL = async (url) => {
  let res = await fetch(`s/?url=${url}`);
  let data = await res.json();

  if (data["success"] === true) {
    return data["url"];
  } else {
    return null;
  }
};

// Create Td
const createTd = (uid) => {
  let newTd = document.createElement("td");
  newTd.innerHTML = `
    <td><a style="color: white;" target="_blank" href="${BASE_URL}/${uid}">${BASE_URL}/${uid}</a><div class="btn btn-sm">Copy</div>
    </td>`;
  tdTable.appendChild(newTd);
};

// Save to Localstorage
const saveToLS = (data) => {
  // ls - [id, id]
  console.log(data);
  // data - id
  if (localStorage.getItem("urls")) {
    let newData = JSON.parse(localStorage.getItem("urls"));
    newData.push(data);
    localStorage.setItem("urls", JSON.stringify(newData));
  } else {
    localStorage.setItem("urls", JSON.stringify([data]));
  }
};

// Get data
const showLSData = () => {
  if (localStorage.getItem("urls")) {
    JSON.parse(localStorage.getItem("urls")).forEach((element) => {
      createTd(element);
    });
  }
};

// Submit button
submitbtn.addEventListener("click", async () => {
  const urlInput = urlinput.value.trim();

  if (urlInput && urlInput != "") {
    let uid = await shortURL(urlInput);
    // console.log(uid);
    if (uid) {
      createTd(uid);
      saveToLS(uid);
    }
  }

  // Clear the input
  document.getElementById("urlinput").value = "";
});

showLSData();
