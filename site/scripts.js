// Initialises any required JavaScript at page load
// (..until we get something more structured in here)
window.onload = function () {
  buildPartyResultsMenuItems();
  buildReleasesMenuItems();

  // Runs the collyviewer (..if we're on a page which includes the collyviewer)
  if (typeof displayCollyModemStyle !== "undefined") {
    displayCollyModemStyle();
  }

  const nkxWebApp = new NkxWebApp();

  // Displays a new neokortex logo and random fing each the page is loaded
  nkxWebApp.setRandomNeokortexLogo();
  nkxWebApp.setTheRandomFing();

  // Populates the version number and moniker in the page footer.
  document.getElementById("version-number").innerHTML = nkxWebApp.getVersionNumber();
  document.getElementById("version-moniker").innerHTML = nkxWebApp.getVersionMoniker();
};

class NkxWebApp {
  getVersionNumber() {
    return "neokortex.co.uk v1.0.3.20230820";
  }

  getVersionMoniker() {
    return "[virtuallynojavascriptimprovements]";
  }

  setRandomNeokortexLogo() {
    const arrayOfLogos = [
      "img/neokortex-logo-1.jpg",
      "img/neokortex-logo-2.png",
      "img/neokortex-logo-3.png",
      "img/neokortex-logo-4.png",
      "img/neokortex-logo-5.png",
      "img/neokortex-logo-6.png",
    ];
    const randomLogoIndex = Math.floor(Math.random() * arrayOfLogos.length);

    document.getElementById("neokortex-logo").setAttribute("src", arrayOfLogos[randomLogoIndex]);

    // TODO: Refactor above array of logos into a data/neokortexlogo.json datafile.
    // Give each logo a background colour property and use/set it here. Hard-coded to black until I do this!
    const element = document.getElementById("logo-section");
    element.style.backgroundColor = "black";
  }

  setTheRandomFing() {
    return fetch("data/randomfings.json")
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
}

// Switches the Amiga display font on the old ASCII viewer
function changeAsciiFont(fontFamily) {
  document.getElementsByTagName("pre")[0].style.fontFamily = fontFamily;
}

// Builds the party releases section of the navigation menu (a cheap and nasty way because I got fed
// up tweaking multiple files but didn't want to pull in excess stuff just to do a HTML include!)
function buildPartyResultsMenuItems() {
  return fetch("data/partyresults.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let menu = document.getElementById("partyresults-menu-items");

      for (const item of data.partyresults) {
        menu.insertAdjacentHTML(
          "afterbegin",
          `<a href=${item.url}><li class="navmenu-item">${item.name}</li></a>`
        );
      }
    });
}

// Builds the releases section of the navigation menu (a cheap and nasty way because I got fed
// up tweaking multiple files but didn't want to pull in excess stuff just to do a HTML include!)
function buildReleasesMenuItems() {
  return fetch("data/releases.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let menu = document.getElementById("releases-menu-items");

      for (const item of data.releases) {
        menu.insertAdjacentHTML(
          "afterbegin",
          `<a href=${item.url}><li class="navmenu-item">${item.name}<br />[${item.type}] ${item.date}</li></a>`
        );
      }
    });
}
