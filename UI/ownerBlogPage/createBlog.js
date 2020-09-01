// var firebaseConfig = {
//   apiKey: "AIzaSyAyuyxcth2vf-Cxp911GxUX25i1WCyp0Qg",
//   authDomain: "fir-my-brand.firebaseapp.com",
//   databaseURL: "https://fir-my-brand.firebaseio.com",
//   projectId: "fir-my-brand",
//   storageBucket: "fir-my-brand.appspot.com",
//   messagingSenderId: "828238082301",
//   appId: "1:828238082301:web:7daae22b54f73cef9b8e94",
//   measurementId: "G-1Q52GL66BN",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const form = document.querySelector("#comment-form");
const title = document.querySelector("#name");
const body = document.querySelector("#comments");
const logout = document.querySelector("#logout");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  axios
    .post(
      "https://mybrand-app.herokuapp.com/blogs",
      {
        title: form.name.value,
        content: form.comments.value,
      },
      {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      }
    )
    .then((docs) => {
      if (docs.data.error) {
        alert(docs.data.error);
      } else {
        alert("Blog created");
      }
    });

  // db.collection("blogs").add({
  //   Title: form.name.value,
  //   Body: form.comments.value,
  // });
  // form.name.value = "";
  // form.comments.value = "";
  // alert("Article succefully created");
  // window.location = "./ownerBlog.html";
});
logout.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../blog-page/blog.html";
});
