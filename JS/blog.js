const url = "https://www.tomanking.one/wp-json/wp/v2/posts/?per_page=12";

const blogContainer = document.querySelector(".blogContainer");

const moreButton = document.querySelector(".moreButton");

let articles;

fetchPosts(0, 6);

//  fetct articles from api
async function fetchPosts() {
  try {
    const response = await fetch(url);
    articles = await response.json();
    blogContainer.innerHTML = "";
    build(0, 6);
  } catch (error) {
    console.log("An error occured");
  }
}

// build html
function build(start, end) {
  const posts = getPosts(articles, start, end);
  posts.forEach((post) => {
    blogContainer.innerHTML += `<a href="article.html?id=${post.id}">
    <div class="post">
    <img id="image" src="${post.img}" alt="${post.imgAlt}" />
    <p class="title">${post.title}</p>
    <p class="date">${post.author}${post.date}</p>
    <p class="readMore">Read More</p>
    </div>
    </a>`;
  });
}

// gets the correct posts(based on start and end) and formats each post into an object.
function getPosts(articles, start, end) {
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

// show the remaning articles
moreButton.addEventListener("click", () => {
  build(7, articles.length - 1);
  moreButton.style.display = "none";
});
