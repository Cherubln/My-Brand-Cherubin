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

const messages = document.querySelector("#messages");
// const btnLogout = document.querySelector("#logout");

function contactFormData(doc) {
  const messageContainer = document.createElement("div");
  const name = document.createElement("h4");
  const email = document.createElement("span");
  const message = document.createElement("p");
  const link = document.createElement("a");
  const logout = document.querySelector("#logout");
  link.textContent = doc.name;
  link.addEventListener("click", (e) => {
    localStorage.setItem("query-Id", doc._id);

    window.location.href = "./query.html";
  });
  email.textContent = doc.email;
  message.textContent = doc.message;
  message.style.backgroundColor = "#0e0e0e";
  message.style.padding = 8 + "px";
  name.appendChild(link);
  messageContainer.appendChild(name);
  messageContainer.appendChild(email);
  messageContainer.appendChild(message);
  messages.appendChild(messageContainer);
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../blog-page/blog.html";
  });
}

axios
  .get("https://mybrand-app.herokuapp.com/queries", {
    headers: { Authorization: localStorage.getItem("SavedToken") },
  })
  .then((docs) => {
    let data = docs.data;
    data.forEach((doc) => {
      contactFormData(doc);
    });
  });

// db.collection("contact-form")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       contactFormData(doc);
//     });
//   });

// btnLogout.addEventListener("click", () => {
//   firebase.auth().signOut();
//   window.location = "../blog-page/blog.html";
// });
