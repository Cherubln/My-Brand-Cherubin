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

function blogs(doc) {
  const blogArea = document.querySelector("article");
  const likebtn = document.querySelector("#up");
  const dislikebtn = document.querySelector("#down");

  blogArea.setAttribute("data-id", doc.id);

  likebtn.style.color = "white";
  dislikebtn.style.color = "white";

  likebtn.addEventListener("click", (e) => {
    if (likebtn.style.color === "white") {
      likebtn.style.color = "blue";
      dislikebtn.style.color = "white";
    } else if (likebtn.style.color === "blue") {
      likebtn.style.color = "white";
    }
  });

  dislikebtn.addEventListener("click", (e) => {
    if (dislikebtn.style.color === "white") {
      dislikebtn.style.color = "blue";
      likebtn.style.color = "white";
    } else if (dislikebtn.style.color === "blue") {
      dislikebtn.style.color = "white";
    }
  });
}

db.collection("blogs")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      blogs(doc);
    });
  });

const form = document.querySelector("#comment-form");
const comments = document.querySelector("#comments");
const commentField = document.querySelector("#comments-section");
const name = document.querySelector("#name");

function commentFormData(doc) {
  const commentArea = document.createElement("div");
  const comment = document.createElement("p");
  const id = document.createElement("h5");
  comment.textContent = doc.data().Comment;
  id.textContent = doc.data().Name;

  commentArea.appendChild(id);
  commentArea.appendChild(comment);
  commentField.appendChild(commentArea);
}

db.collection("comment-article1")
  .get()
  .then((snapshot) => snapshot.docs.forEach((doc) => commentFormData(doc)));

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(form.comments.value);
  db.collection("comment-article1").add({
    Name: form.name.value,
    Comment: form.comments.value,
  });
  form.name.value = "";
  form.comments.value = "";
});
