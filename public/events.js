const newPicBtn = document.getElementById("new-pic");
const loader = document.querySelector(".loader");
const errorField = document.querySelector(".error")
const upVote = document.querySelector("#upvote");
const downVote = document.querySelector("#downvote");

document.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/kitten/image");
  const json = await res.json();
  console.log(json);

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

  if (!res.ok) {
    console.log("error");
  } else {
    document.querySelector("img").src = json.src;
  }
});

upVote.addEventListener("click", async (event) => {
  const res = await fetch("/kitten/upvote");
  const json = await res.json();
  console.log(json)

})
