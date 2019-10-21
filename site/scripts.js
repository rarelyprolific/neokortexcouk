window.onload = function() {
  setTheRandomFing();

  // Runs the ANSI colly display function if we're on a page where we've included the script
  // (Yes, this is messy and hacky! I need to tidy this up later.)
  if (typeof displayColly !== "undefined") {
    displayColly();
  }
};

function setTheRandomFing() {
  return fetch("randomfings.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let randomFings = data.randomFings;
      let numberOfFings = randomFings.length;
      let aTrulyRandomFing = Math.floor(Math.random() * numberOfFings);

      // Set the "random fing" text
      document.getElementById("random-fing").textContent =
        randomFings[aTrulyRandomFing].text;

      // Sets the title attribute if the "random fing" is related to a demoscene production
      if (randomFings[aTrulyRandomFing].production != undefined) {
        document.getElementById("random-fing").title =
          randomFings[aTrulyRandomFing].production +
          " by " +
          randomFings[aTrulyRandomFing].releasedBy +
          " [" +
          randomFings[aTrulyRandomFing].platform +
          " " +
          randomFings[aTrulyRandomFing].releaseYear +
          "]";
      }
    });
}

function changeAsciiFont(fontFamily) {
  document.getElementsByTagName("pre")[0].style.fontFamily = fontFamily;
}
