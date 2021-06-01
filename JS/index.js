const url = "https://www.tomanking.one/wp-json/wp/v2/posts/?per_page=12";

const blogCards = document.querySelector(".blogCards");

const loader = document.querySelector(".loader");

let jump = getJump();
let start = 0;
let end = start + jump;

let articles;
let posts = [];

fetchPosts();

// fetct articles from api
async function fetchPosts() {
  try {
    const response = await fetch(url);
    articles = await response.json();
    loader.style.display = "none";
    build();
  } catch (error) {
    console.log("An error occured");
  }
}

// build html
function build() {
  posts = getPosts();
  blogCards.innerHTML = "";
  posts.forEach((post) => {
    blogCards.innerHTML += `<div class="latestBlog">
    <a href="article.html?id=${post.id}">
    <img src="${post.img}" alt="${post.imgAlt}" />
    <h2>${post.title}</h2>
    <p>Read More</p>
    </a>
    </div>`;
  });
}

// gets the correct posts(based on start and end) and formats each post into an object.
function getPosts() {
  const posts = [];
  for (let i = start; i <= end; i++) {
    const sections = articles[i].content.rendered.split("#");
    let post = {};
    post = {
      id: articles[i].id,
      title: articles[i].title.rendered,
      body: sections[0],
      author: sections[1],
      date: sections[2],
      img: articles[i].better_featured_image.source_url,
      imgAlt: articles[i].better_featured_image.alt_text,
    };
    posts.push(post);
  }
  return posts;
}

// shows how many posts to display
window.addEventListener("resize", function (event) {
  jump = getJump();
  end = start + jump;
  if (end >= articles.length - 1) {
    end = articles.length - 1;
    start = articles.length - jump - 1;
  }
  if (start <= 0) {
    start = 0;
    end = start + jump;
  }
  build();
});

// show next posts
function next() {
  end += jump + 1;
  start = end - jump;
  if (end >= articles.length - 1) {
    end = articles.length - 1;
    start = articles.length - jump - 1;
  }
  build();
}

// show prev posts
function prev() {
  start -= jump + 1;
  end = start + jump;
  if (start <= 0) {
    start = 0;
    end = start + jump;
  }
  build();
}

// sets jump based on browser width
function getJump() {
  let jump;
  if (window.innerWidth >= 1150) {
    jump = 2;
  } else if (window.innerWidth < 1150 && window.innerWidth >= 768) {
    jump = 1;
  } else {
    jump = 0;
  }
  return jump;
}
