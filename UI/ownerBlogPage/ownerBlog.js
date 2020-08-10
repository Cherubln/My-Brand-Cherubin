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
const auth = firebase.auth();
const blogField = document.querySelector("body");

function blogs(doc) {
  const title = document.createElement("h1");
  const body = document.createElement("div");
  const blogArea = document.createElement("article");
  const updatebtn = document.createElement("button");
  const deletebtn = document.createElement("button");
  const inputTitle = document.createElement("input");
  const inputBody = document.createElement("textarea");
  const btn = document.createElement("input");
  const logout = document.querySelector("#logout");
  const form = document.createElement("form");

  updatebtn.setAttribute("class", "myBtn");
  blogArea.setAttribute("data-id", doc.id);
  deletebtn.setAttribute("class", "myBtn2");
  inputTitle.setAttribute("required", "");
  inputTitle.setAttribute("id", "name");
  inputTitle.setAttribute("placeholder", "Edit Title");
  inputTitle.setAttribute("type", "text");
  inputBody.setAttribute("required", "");
  inputBody.setAttribute("id", "comments");
  inputBody.setAttribute("placeholder", "Edit Body");
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", "Update");

  updatebtn.textContent = "Update";
  deletebtn.textContent = "Delete";

  title.textContent = doc.data().Title;
  body.textContent = doc.data().Body;
  inputTitle.value = doc.data().Title;
  inputBody.value = doc.data().Body;

  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(updatebtn);
  blogArea.appendChild(deletebtn);

  blogField.appendChild(blogArea);

  updatebtn.addEventListener("click", (e) => {
    form.appendChild(inputTitle);
    form.appendChild(inputBody);
    form.appendChild(btn);
    blogArea.appendChild(form);
  });

  deletebtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("blogs").doc(id).delete();
    alert("Blog deleted");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("blogs").doc(id).update({
      Title: inputTitle.value,
      Body: inputBody.value,
    });
    form.removeChild(inputTitle);
    form.removeChild(inputBody);
    form.removeChild(btn);
    blogArea.removeChild(form);
    alert("Blog updated");
  });
}

db.collection("blogs")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      blogs(doc);
    });
  });
logout.addEventListener("click", (e) => {
  auth.signOut();
  window.location = "../blog-page/blog.html";
});
