window.onload = function () {
  // Runs the collyviewer (..if we're on a page which includes the collyviewer)
  if (typeof displayCollyModemStyle !== "undefined") {
    displayCollyModemStyle();
  }

  const nkxWebApp = new NkxWebApp();

  // Displays a new neokortex logo and random fing each the page is loaded
  nkxWebApp.setRandomNeokortexLogo();
  nkxWebApp.setTheRandomFing();

  // Load menus
  nkxWebApp.buildLinksMenu("data/partyresults.json", "partyresults", "partyresults-menu-items");
  nkxWebApp.buildReleasesMenu("data/releases.json", "releases", "releases-menu-items");

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
    return fetch("data/neokortexlogos.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const neokortexLogos = data.neokortexLogos;

        // Pick a random logo.
        const randomLogoIndex = Math.floor(Math.random() * neokortexLogos.length);

        // Display the logo.
        document
          .getElementById("neokortex-logo")
          .setAttribute("src", neokortexLogos[randomLogoIndex].filepath);

        // Match the background colour of the logo section to the logo.
        const element = document.getElementById("logo-section");
        element.style.backgroundColor = neokortexLogos[randomLogoIndex].backgroundColor;
      });
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

  buildLinksMenu(sourceJson, collectionName, targetListElement) {
    return fetch(sourceJson)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let menu = document.getElementById(targetListElement);

        for (const item of data[collectionName]) {
          menu.insertAdjacentHTML(
            "afterbegin",
            `<a href=${item.url}><li class="navmenu-item">${item.name}</li></a>`
          );
        }
      });
  }

  buildReleasesMenu(sourceJson, collectionName, targetListElement) {
    return fetch(sourceJson)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let menu = document.getElementById(targetListElement);

        for (const item of data[collectionName]) {
          menu.insertAdjacentHTML(
            "afterbegin",
            `<a href=${item.url}><li class="navmenu-item">${item.name}<br />[${item.type}] ${item.date}</li></a>`
          );
        }
      });
  }
}
