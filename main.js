import "./style.css";

// grab the from
const form = document.querySelector("form");
// listen for the form submit click
form.addEventListener("submit", async (event) => {
  // prevent the form from refreshing the entire page
  event.preventDefault();

  // extract the data from the form
  const data = new FormData(form);

  // make a request to our api- await/promise
  const response = await fetch("http://localhost:8080/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  const { image } = await response.json();

  // send it back to the DOM
  const result = document.querySelector("#result");
  result.innerHTML = `<img src="${image}" width="512" />`;
});
