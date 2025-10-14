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
  nkxWebApp.buildLinksMenu("data/pages.json", "pages", "pages-menu-items");
  nkxWebApp.buildPartyResultsMenu("data/partyresults.json", "partyresults", "partyresults-menu-items");
  nkxWebApp.buildReleasesMenu("data/releases.json", "releases", "releases-menu-items");
  nkxWebApp.buildLinksMenu("data/interviews.json", "interviews", "interviews-menu-items");

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
        let aTrulyRandomFing = randomFings[Math.floor(Math.random() * numberOfFings)];

        let randomFingElement = document.getElementById("random-fing");

        if (aTrulyRandomFing.production == undefined) {
          // Builds a simple text "random fing".
          randomFingElement.insertAdjacentHTML(
            "afterbegin",
            `<span>${aTrulyRandomFing.text}</span>`
          );
        } else {
          // Builds the title attibute and external links if this "random fing" is a demoscene production.
          const productionFing = `${aTrulyRandomFing.production} by ${aTrulyRandomFing.releasedBy} [${aTrulyRandomFing.platform} ${aTrulyRandomFing.releaseYear}]`;

          randomFingElement.insertAdjacentHTML(
            "afterbegin",
            `<span title="${productionFing}">${aTrulyRandomFing.text}</span> ` +
            `<a href="https://www.demozoo.org/${aTrulyRandomFing.demozooUrl}" target="_blank">[demozoo]</a> ` +
            `<a href="https://www.pouet.net/${aTrulyRandomFing.pouetUrl}" target="_blank">[pouet]</a> ` +
            `<a href="https://www.youtube.com/${aTrulyRandomFing.youTubeUrl}" target="_blank">[youtube]</a>`
          );
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

        // Builds menu items using the SAME ordering as in the JSON file.
        for (const item of data[collectionName]) {
          let link = document.createElement("a");
          link.href = item.url;

          let listItem = document.createElement("li");
          listItem.className = "navmenu-item";
          listItem.textContent = item.name;

          link.appendChild(listItem);
          menu.appendChild(link);
        }
      });
  }

  buildPartyResultsMenu(sourceJson, collectionName, targetListElement) {
    return fetch(sourceJson)
      .then(function (response) {
        return response.json();
      })
      .then(data => {
        let menu = document.getElementById(targetListElement);

        // Group by partyname
        const groups = {};
        for (const item of data[collectionName]) {
          if (!groups[item.partyname]) {
            groups[item.partyname] = [];
          }
          groups[item.partyname].push(item);
        }

        // For each group, sort by year descending and render
        Object.keys(groups).sort().forEach(partyname => {
          // Sort group by year descending
          groups[partyname].sort((a, b) => b.year - a.year);

          // Add each item
          for (const item of groups[partyname]) {
            let link = document.createElement("a");
            link.href = item.url;

            let listItem = document.createElement("li");

            if (this.isCurrentlyDisplayed(item)) {
              listItem.className = "navmenu-item-selected";
            } else {
              listItem.className = "navmenu-item";
            }

            listItem.textContent = `${item.partyname} ${item.year}`;

            link.appendChild(listItem);
            menu.appendChild(link);
          }
        });
      });
  }

  buildReleasesMenu(sourceJson, collectionName, targetListElement) {
    return fetch(sourceJson)
      .then(function (response) {
        return response.json();
      })
      .then(data => {
        let menu = document.getElementById(targetListElement);

        // Builds release menu items using the REVERSE of the ordering in the JSON file (i.e. newest releases first!).
        for (const item of data[collectionName]) {
          let className = "";

          if (this.isCurrentlyDisplayed(item)) {
            className = "navmenu-item-selected";
          } else {
            className = "navmenu-item"
          }

          menu.insertAdjacentHTML(
            "afterbegin",
            `<a href=${item.url}><li class=${className}>${item.name}<br />[${item.type}] ${item.date}</li></a>`
          );
        }
      });
  }

  isCurrentlyDisplayed(item) {
    return window.location.search === item.url.substring(item.url.lastIndexOf('?'));
  }
}
