const messages = document.querySelector("body");
const queryId = localStorage.getItem("query-Id");

function contactFormData(doc) {
  const logout = document.querySelector("#logout");
  const messageContainer = document.createElement("div");
  const name = document.createElement("h4");
  const email = document.createElement("span");
  const message = document.createElement("p");
  const deletebtn = document.createElement("button");
  deletebtn.setAttribute("class", "myBtn2");
  deletebtn.textContent = "Delete";
  name.textContent = doc.data.name;
  email.textContent = doc.data.email;
  message.textContent = doc.data.message;
  message.style.backgroundColor = "#0e0e0e";
  message.style.padding = 8 + "px";
  messageContainer.appendChild(name);
  messageContainer.appendChild(email);
  messageContainer.appendChild(message);
  messageContainer.appendChild(deletebtn);
  messages.appendChild(messageContainer);
  console.log(doc);
  deletebtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // let id = e.target.parentElement.getAttribute("data-id");
    axios
      .delete("https://mybrand-app.herokuapp.com/queries/" + queryId, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      })
      .then((docs) => {
        console.log(docs);
        alert("Message deleted");
      });
    // db.collection("blogs").doc(id).delete();
  });
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../blog-page/blog.html";
  });
}

axios
  .get("https://mybrand-app.herokuapp.com/queries/" + queryId, {
    headers: { Authorization: localStorage.getItem("SavedToken") },
  })
  .then((doc) => {
    contactFormData(doc);
  });
