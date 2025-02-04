// Get data from the api
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const apiData = await response.json();
  return apiData;
}
// desplay the blog posts
async function displayPost() {
  const data = await getData();
  document.querySelector("main").innerHTML = "";
  // loop in data array and creating new elemnts of blog posts
  data.map((post) => {
    const mainHtml = document.querySelector("main");
    const newPost = document.createElement("div");
    newPost.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    newPost.classList.add("post");
    newPost.classList.add(`post${post.id}`);
    mainHtml.appendChild(newPost);
  });
}

displayPost();

// Form to add a new post

// call this if we click "add blog post" button in html form
document.getElementById("blogForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const mainHtml = document.querySelector("main");
      const newPost = document.createElement("div");
      newPost.innerHTML = `<h3>${json.title}</h3><p>${json.body}</p>`;
      newPost.classList.add("post");
      newPost.classList.add(`post0`);
      mainHtml.appendChild(newPost);
      this.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerHTML = `
          <p style="color: red">Error submitting post</p>
      `;
    });
});
