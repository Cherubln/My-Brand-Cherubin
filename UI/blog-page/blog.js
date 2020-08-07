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
  body.textContent = doc.data().Body.slice(0, 50) + "...";

  blogArea.setAttribute("data-id", doc.id);
  likebtn.setAttribute("class", "fa fa-thumbs-up");
  dislikebtn.setAttribute("class", "fa fa-thumbs-down");
  title.appendChild(link);
  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(likebtn);
  blogArea.appendChild(dislikebtn);
  likebtn.style.color = "white";
  dislikebtn.style.color = "white";

  blogField.appendChild(blogArea);

  link.addEventListener("click", (e) => {
    localStorage.setItem("blog-id", doc.id);
    // e.target.parentElement.setAttribute("data-id", doc.id);
    window.location = "./articles/article.html";
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
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      blogs(doc);
    });
  });
