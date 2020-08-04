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

const form = document.querySelector("#comment-form");
const comments = document.querySelector("#comments");
const commentField = document.querySelector("#comments-section");
const name = document.querySelector("#name");

function commentFormData(doc) {
  const comment = document.createElement("p");
  const id = document.createElement("p");
  comment.textContent = doc.data().Comment;
  id.textContent = ` Comment by ${doc.data().Name}`;
  commentField.style.backgroundColor = "#0e0e0e";
  commentField.style.padding = 8 + "px";
  commentField.appendChild(comment);
  commentField.appendChild(id);
}

db.collection("comment-form")
  .get()
  .then((snapshot) => snapshot.docs.forEach((doc) => commentFormData(doc)));

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(form.comments.value);
  db.collection("comment-form").add({
    Name: form.name.value,
    Comment: form.comments.value,
  });
  form.name.value = "";
  form.comments.value = "";
});
