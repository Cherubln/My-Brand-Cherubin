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

const form = document.querySelector("#contact-form");
const fdBack = document.querySelector("#fdBack");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  db.collection("contact-form").add({
    Name: form.name.value,
    Email: form.email.value,
    Message: form.message.value,
  });
  form.name.value = "";
  form.email.value = "";
  form.message.value = "";
  fdBack.style.color = "green";
  fdBack.textContent = "Message well recieved";
});
