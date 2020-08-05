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

function blogs(doc) {
  const link = document.createElement("a");
  const title = document.createElement("h1");
  const body = document.createElement("div");
  const blogArea = document.createElement("article");
  const likebtn = document.createElement("i");
  const dislikebtn = document.createElement("i");

  link.textContent = doc.data().Title;
  body.textContent = doc.data().Body;

  likebtn.setAttribute("class", "fa fa-thumbs-up");
  dislikebtn.setAttribute("class", "fa fa-thumbs-down");
  title.appendChild(link);
  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(likebtn);
  blogArea.appendChild(dislikebtn);

  blogField.appendChild(blogArea);
}

db.collection("blogs")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      blogs(doc);
    });
  });
