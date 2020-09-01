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
let blogField = document.querySelector("body");
const blogId = localStorage.getItem("blog-id");

function blogs(doc) {
  const link = document.createElement("a");
  const title = document.createElement("h1");
  const body = document.createElement("div");
  const blogArea = document.createElement("article");
  const likebtn = document.createElement("i");
  // const dislikebtn = document.createElement("i");
  const form = document.createElement("form");
  const name = document.createElement("input");
  const message = document.createElement("textarea");
  const btn = document.createElement("input");
  const label = document.createElement("label");
  const labelcomments = document.createElement("h4");

  link.textContent = doc.data.title;
  body.textContent = doc.data.content;
  label.textContent = "Leave a comment below:";
  blogArea.setAttribute("data-id", doc._id);
  likebtn.setAttribute("class", "fa fa-thumbs-up");
  // dislikebtn.setAttribute("class", "fa fa-thumbs-down");
  name.setAttribute("required", "");
  name.setAttribute("id", "name");
  name.setAttribute("placeholder", "Name");
  name.setAttribute("type", "text");
  message.setAttribute("required", "");
  message.setAttribute("id", "comments");
  message.setAttribute("placeholder", "Message");
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", "Submit");
  title.appendChild(link);
  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(likebtn);
  // blogArea.appendChild(dislikebtn);
  likebtn.style.color = "white";
  // dislikebtn.style.color = "white";
  labelcomments.textContent = "Comments:";
  blogField.appendChild(blogArea);
  form.appendChild(label);
  form.appendChild(name);
  form.appendChild(message);
  form.appendChild(btn);

  blogField.appendChild(form);
  blogField.appendChild(labelcomments);
  doc.data.comments.forEach((comment) => {
    const username = document.createElement("h5");
    const usermessage = document.createElement("p");
    const userbox = document.createElement("article");

    username.style.color = "#ffa500";
    userbox.style.backgroundColor = "#0e0e0e";
    userbox.style.padding = 8 + "px";
    userbox.style.lineHeight = 0.5 + "px";
    username.textContent = comment.name;
    usermessage.textContent = comment.message;

    userbox.appendChild(username);
    userbox.appendChild(usermessage);
    blogField.appendChild(userbox);
  });
  likebtn.addEventListener("click", (e) => {
    axios
      .post("https://mybrand-app.herokuapp.com/blogs/likes/" + blogId)
      .then((doc) => {
        alert(doc.data.message);
      });
    if (likebtn.style.color === "white") {
      likebtn.style.color = "blue";
      // dislikebtn.style.color = "white";
      // } else if (likebtn.style.color === "blue") {
      //   likebtn.style.color = "white";
      // }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    axios
      .post("https://mybrand-app.herokuapp.com/blogs/comments/" + blogId, {
        name: name.value,
        message: message.value,
      })
      .then(
        () => {
          name.value = "";
          message.value = "";
          alert("Comment added");
        }
        // db.collection(blogId).add({
        //   Name: name.value,
        //   Message: message.value,
        // });
      );
  });
}
// let likes = 0;
// let dislikes = 0;

//   let id = e.target.parentElement.getAttribute("data-id");
//   db.collection("blogs").doc(id).update({
//     Likes: likes,
//   });
// });

// dislikebtn.addEventListener("click", (e) => {
//   if (dislikebtn.style.color === "white") {
//     dislikebtn.style.color = "blue";
//     likebtn.style.color = "white";
//     dislikes++;
//   } else if (dislikebtn.style.color === "blue") {
//     dislikebtn.style.color = "white";
//     dislikes--;
//   }
//   let id = e.target.parentElement.getAttribute("data-id");
//   db.collection("blogs").doc(id).update({
//     Dislikes: dislikes,
//   });
//   db.collection("blogs")
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         console.log(doc.data());
//       });
//     });
// });
//   );
// }

// db.collection("blogs")
//   .doc(blogId)
//   .get()
//   .then((doc) => {
//     blogs(doc);
//   });

axios.get("https://mybrand-app.herokuapp.com/blogs/" + blogId).then((doc) => {
  blogs(doc);
});
