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

const messages = document.querySelector("#messages");
const btnLogout = document.querySelector("#logout");

function contactFormData(doc) {
  const name = document.createElement("h4");
  const email = document.createElement("p");
  const message = document.createElement("p");

  name.textContent = doc.data().Name;
  email.textContent = doc.data().Email;
  message.textContent = `${doc.data().Name} said: ${doc.data().Message}`;
  messages.style.backgroundColor = "#0e0e0e";

  messages.style.padding = 8 + "px";

  messages.appendChild(name);
  name.appendChild(email);
  messages.appendChild(message);
}

db.collection("contact-form")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      contactFormData(doc);
    });
  });

btnLogout.addEventListener("click", () => {
  firebase.auth().signOut();
  window.location = "../blog-page/blog.html";
});
