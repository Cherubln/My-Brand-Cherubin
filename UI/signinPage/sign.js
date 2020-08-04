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

// Get elements
const userEmail = document.querySelector("#email");
const password = document.querySelector("#password");
const btnLogin = document.querySelector("#login-form");

// Add login event
btnLogin.addEventListener("submit", (e) => {
  // Get email and pass
  e.preventDefault();
  let email = userEmail.value;
  let pass = password.value;

  const auth = firebase.auth();

  //signin
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise
    .then(() => (window.location = "../ownerBlogPage/ownerBlog.html"))
    .catch((e) => {
      console.log(e.message);
      document.getElementById("message").style.color = "red";
      document.getElementById("message").textContent = "Wrong credentials!";
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else console.log("Not logged in");
});
