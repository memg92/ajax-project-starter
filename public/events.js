const newPicBtn = document.getElementById("new-pic");
const loader = document.querySelector(".loader");
const errorField = document.querySelector(".error");
const upVote = document.querySelector("#upvote");
const downVote = document.querySelector("#downvote");
const score = document.querySelector(".score");
const commentPost = document.querySelector(".comment-form");
const comments = document.querySelector(".comments")

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
    method: "PATCH"
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
    const res = await fetch("/kitten/comments", {
        method: "POST"
    });
    const json = await res.json();

    if (!res.ok) {
        errorField.innerHTML = json.message;
    } else {
        comments.innerHTML = json.comments;
        document.getElementById("user-comment").innerHTML = "unset";
    }
} )
