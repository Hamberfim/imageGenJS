import "./style.css";

// grab the from
const form = document.querySelector("form");
// listen for the form submit click
form.addEventListener("submit", async (event) => {
  // prevent the form from refreshing the entire page
  event.preventDefault();

  // load/show spinner
  showSpinner();

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

  // handle errors
  if (response.ok) {
    const { image } = await response.json();

    // send it back to the DOM
    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  // hide spinner
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Generate Image";
}
