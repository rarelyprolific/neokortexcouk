// Initialises any required JavaScript at page load
// (..until we get something more structured in here)
window.onload = function () {
  setTheRandomFing();
  setRandomNeokortexLogo();

  // Runs the collyviewer (..if we're on a page which includes the collyviewer)
  if (typeof displayCollyModemStyle !== "undefined") {
    displayCollyModemStyle();
  }
};

// Displays a new random fing each the page is loaded
function setTheRandomFing() {
  return fetch("randomfings.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let randomFings = data.randomFings;
      let numberOfFings = randomFings.length;
      let aTrulyRandomFing = Math.floor(Math.random() * numberOfFings);

      // Set the "random fing" text
      document.getElementById("random-fing").textContent = randomFings[aTrulyRandomFing].text;

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

// Switches the Amiga display font on the old ASCII viewer
function changeAsciiFont(fontFamily) {
  document.getElementsByTagName("pre")[0].style.fontFamily = fontFamily;
}

// Sets a random Neokortex logo
function setRandomNeokortexLogo() {
  const arrayOfLogos = [
    "img/neokortex-logo-1.jpg",
    "img/neokortex-logo-2.png",
    "img/neokortex-logo-3.png",
    "img/neokortex-logo-4.png",
  ];
  const randomLogoIndex = Math.floor(Math.random() * arrayOfLogos.length);

  document.getElementById("neokortex-logo").setAttribute("src", arrayOfLogos[randomLogoIndex]);
}
