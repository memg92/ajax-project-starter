
document.addEventListener("DOMContentLoaded", async (event) => {

    const res = await fetch("/kitten/image");
    const json = await res.json();
    console.log(json)


})