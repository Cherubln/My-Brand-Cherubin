const blogField = document.querySelector("body");
function blogs(doc) {
  const link = document.createElement("a");
  const title = document.createElement("h1");
  const body = document.createElement("div");
  const blogArea = document.createElement("article");
  const likebtn = document.createElement("i");
  // const dislikebtn = document.createElement("i");

  link.textContent = doc.title;
  body.textContent = doc.content.slice(0, 100) + "...";

  blogArea.setAttribute("data-id", doc._id);
  likebtn.setAttribute("class", "fa fa-thumbs-up");
  // dislikebtn.setAttribute("class", "fa fa-thumbs-down");
  title.appendChild(link);
  blogArea.appendChild(title);
  blogArea.appendChild(body);
  blogArea.appendChild(likebtn);
  // blogArea.appendChild(dislikebtn);
  likebtn.style.color = "white";
  // dislikebtn.style.color = "white";

  blogField.appendChild(blogArea);

  link.addEventListener("click", (e) => {
    localStorage.setItem("blog-id", doc._id);

    window.location = "./articles/article.html";
  });
  likebtn.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    axios
      .post("https://mybrand-app.herokuapp.com/blogs/likes/" + id)
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
}
axios.get("https://mybrand-app.herokuapp.com/blogs").then((docs) => {
  let data = docs.data;
  data.forEach((doc) => {
    blogs(doc);
  });
});
