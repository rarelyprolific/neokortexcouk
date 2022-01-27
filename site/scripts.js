// Initialises any required JavaScript at page load
// (..until we get something more structured in here)
window.onload = function () {
  setTheRandomFing();
  setRandomNeokortexLogo();
  buildReleasesMenuItems();

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

// Builds the releases section of the navigation menu (a cheap and nasty way because I got fed
// up tweaking multiple files but didn't want to pull in excess stuff just to do a HTML include!)
function buildReleasesMenuItems() {
  let releasesMenuItems = [
    {
      name: "N0VA_19.txt",
      type: "ASCII",
      date: "22/06/2019",
      url: "collyviewer.html?collyname=nkx-nova19.txt&lineheight=506&extendedcolumns=40&displaymode=ced",
    },
    {
      name: "nkx-versus9-votesheet",
      type: "ASCII",
      date: "06/07/2019",
      url: "collyviewer.html?collyname=nkx-versus9-votesheet.txt&lineheight=149&displaymode=ced",
    },
    {
      name: "nkx-evoke2o19.txt",
      type: "ASCII",
      date: "18/08/2019",
      url: "collyviewer.html?collyname=nkx-evoke2o19.txt&lineheight=25&displaymode=ced",
    },
    {
      name: "DLine_GeoMetriX.ans",
      type: "ANSI",
      date: "04/10/2019",
      url: "collyviewer.html?collyname=DLine_GeoMetriX.ans.txt&lineheight=62",
    },
    {
      name: "nkx-rev2o2o.txt",
      type: "ASCII",
      date: "11/04/2020",
      url: "collyviewer.html?collyname=nkx-rev2o2o.txt&lineheight=1010&extendedcolumns=25&displaymode=ced",
    },
    {
      name: "nOVA-pARTY-nETWORK.ans",
      type: "ANSI",
      date: "21/06/2020",
      url: "collyviewer.html?collyname=nOVA-pARTY-nETWORK.ans&lineheight=382",
    },
    {
      name: "goodbye_solskogen.ans",
      type: "ANSI",
      date: "11/07/2020",
      url: "collyviewer.html?collyname=goodbye_solskogen.ans&lineheight=47",
    },
    {
      name: "Solskogen 2020 Logo",
      type: "GFXTRO",
      date: "11/07/2020",
      url: "solskogen2020gfxtro/",
    },
    {
      name: "b1nary_ra1n.ans",
      type: "ANSI",
      date: "15/08/2020",
      url: "collyviewer.html?collyname=b1nary_ra1n.ans&lineheight=27",
    },
    {
      name: "NKXmastro 2o2o",
      type: "INTRO",
      date: "18/12/2020",
      url: "https://code.obviousdisaster.dev/nkxmastro",
    },
    {
      name: "mERRY fORNDATA x-MAS",
      type: "ANSI",
      date: "19/12/2020",
      url: "collyviewer.html?collyname=nkx_merry_fdata_xmas.ans&lineheight=175",
    },
    {
      name: "nkx_together.ans",
      type: "ANSI",
      date: "03/04/2021",
      url: "collyviewer.html?collyname=nkx_together.ans&lineheight=505&disableblink=true",
    },
  ];

  var menu = document.getElementById("releases-menu-items");

  for (const item of releasesMenuItems) {
    menu.insertAdjacentHTML(
      "afterbegin",
      `<a href=${item.url}><li class="navmenu-item">${item.name}<br />[${item.type}] ${item.date}</li></a>`
    );
  }
}
