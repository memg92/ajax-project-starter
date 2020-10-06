const newPicBtn = document.getElementById("new-pic");
const loader = document.querySelector(".loader");
const errorField = document.querySelector(".error");
const upVote = document.querySelector("#upvote");
const downVote = document.querySelector("#downvote");
const score = document.querySelector(".score");
const commentPost = document.querySelector(".comment-form");
const comments = document.querySelector(".comments");
const userComment = document.getElementById("user-comment");

document.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/kitten/image");
  const json = await res.json();
  console.log(json);

  //this could potentially be refactored (lines 14-18)
  if (!res.ok) {
    errorField.innerHTML = json.message;
  } else {
    document.querySelector("img").src = json.src;
  }
});

newPicBtn.addEventListener("click", async (event) => {
  loader.innerHTML = "Loading...";
  const res = await fetch("/kitten/image");
  const json = await res.json();
  loader.innerHTML = "";

  //this could potentially be refactored (lines 27-32)
  if (!res.ok) {
    errorField.innerHTML = json.message;
  } else {
    document.querySelector("img").src = json.src;
    score.innerHTML = 0;
  }
});

upVote.addEventListener("click", async (event) => {
  const res = await fetch("/kitten/upvote", {
    method: "PATCH",
  });
  const json = await res.json();

  //this could potentially be refactored (lines 41-45)
  if (!res.ok) {
    errorField.innerHTML = json.message;
  } else {
    score.innerHTML = json.score;
  }
});

downVote.addEventListener("click", async (event) => {
  const res = await fetch("/kitten/downvote", {
    method: "PATCH",
  });
  const json = await res.json();

  //this could potentially be refactored (lines 57-61)
  if (!res.ok) {
    errorField.innerHTML = json.message;
  } else {
    score.innerHTML = json.score;
  }
});

commentPost.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(commentPost);
  const comment = formData.get("user-comment");

  console.log(JSON.stringify({ comment }));

  const res = await fetch("/kitten/comments", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  const json = await res.json();
  console.log(formData);
  console.log(json);

  if (!res.ok) {
    errorField.innerHTML = json.message;
  } else {
    comments.innerHTML = json.comments;
    // console.log(json.comments);
    // userComment.innerHTML = "";
  }
});
