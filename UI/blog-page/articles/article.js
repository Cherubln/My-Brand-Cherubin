var firebaseConfig = {
  apiKey: "AIzaSyAyuyxcth2vf-Cxp911GxUX25i1WCyp0Qg",
  authDomain: "fir-my-brand.firebaseapp.com",
  databaseURL: "https://fir-my-brand.firebaseio.com",
  projectId: "fir-my-brand",
  storageBucket: "fir-my-brand.appspot.com",
  messagingSenderId: "828238082301",
  appId: "1:828238082301:web:7daae22b54f73cef9b8e94",
  measurementId: "G-1Q52GL66BN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const blogField = document.querySelector("body");
const blogId = localStorage.getItem("blog-id");

function blogs(doc) {
  const link = document.createElement("a");
  const title = document.createElement("h1");
  const body = document.createElement("div");
  const blogArea = document.createElement("article");
  const likebtn = document.createElement("i");
  const dislikebtn = document.createElement("i");
  const form = document.createElement("form");
  const name = document.createElement("input");
  const message = document.createElement("textarea");
  const btn = document.createElement("input");
  const label = document.createElement("label");
  const username = document.createElement("h5");
  const usermessage = document.createElement("p");
  const userbox = document.createElement("article");

  link.textContent = doc.data().Title;
  body.textContent = doc.data().Body;
  username.textContent = doc.data().Name;
  usermessage.textContent = doc.data().Message;
  label.textContent = "Leave a comment below";
  blogArea.setAttribute("data-id", doc.id);
  likebtn.setAttribute("class", "fa fa-thumbs-up");
  dislikebtn.setAttribute("class", "fa fa-thumbs-down");
  name.setAttribute("required", "");
  name.setAttribute("id", "name");
  name.setAttribute("placeholder", "Name");
  name.setAttribute("type", "text");
  message.setAttribute("required", "");
  message.setAttribute("id", "comments");
  message.setAttribute("placeholder", "Message");
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", "Submit");
  title.appendChild(link);
  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(likebtn);
  blogArea.appendChild(dislikebtn);
  likebtn.style.color = "white";
  dislikebtn.style.color = "white";

  blogField.appendChild(blogArea);
  form.appendChild(label);
  form.appendChild(name);
  form.appendChild(message);
  form.appendChild(btn);

  blogField.appendChild(form);
  userbox.appendChild(username);
  userbox.appendChild(usermessage);

  blogField.appendChild(userbox);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for a comment");
    db.collection("blogs").doc(blogId).update({
      Name: name.value,
      Message: message.value,
    });
    name.value = "";
    message.value = "";
  });
  let likes = 0;
  let dislikes = 0;
  likebtn.addEventListener("click", (e) => {
    if (likebtn.style.color === "white") {
      likebtn.style.color = "blue";
      dislikebtn.style.color = "white";
      likes++;
    } else if (likebtn.style.color === "blue") {
      likebtn.style.color = "white";
      likes--;
    }
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("blogs").doc(id).update({
      Likes: likes,
    });
    db.collection("blogs")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
  });

  dislikebtn.addEventListener("click", (e) => {
    if (dislikebtn.style.color === "white") {
      dislikebtn.style.color = "blue";
      likebtn.style.color = "white";
      dislikes++;
    } else if (dislikebtn.style.color === "blue") {
      dislikebtn.style.color = "white";
      dislikes--;
    }
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("blogs").doc(id).update({
      Dislikes: dislikes,
    });
    db.collection("blogs")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
  });
}

db.collection("blogs")
  .doc(blogId)
  .get()
  .then((doc) => {
    blogs(doc);
  });
