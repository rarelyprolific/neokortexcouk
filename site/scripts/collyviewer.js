// Displays an ASCII or ANSI colly from the "collys" folder based on the filename
// specified in the "collyname" parameter (e.g. "/site/collyviewer.html?collyname=DLine_GeoMetriX.ans.txt")
// and with the height specified in the "lineheight" parameter
// as if it were being downloaded on a modem at 57600 baud.
function displayCollyModemStyle() {
  // Process the querystring parameters
  var querystringParams = new URLSearchParams(window.location.search);
  var collyName = querystringParams.get("collyname");
  var displayMode = querystringParams.get("displaymode");
  var lineHeight = Number(querystringParams.get("lineheight"));
  var extendedColumns = Number(querystringParams.get("extendedcolumns"));
  var disableblink = querystringParams.get("disableblink");
  var font = querystringParams.get("font");

  // Set the base directory to load collys from
  var collyPath = "collys/" + collyName;

  // Load and display the colly
  var controller = AnsiLove.animate(
    collyPath,
    function (canvas) {
      document.getElementById("colly-content").appendChild(canvas);
      document.getElementById("colly-name").innerHTML = "LoADING: " + collyName;
      controller.play(57600, function () {
        document.getElementById("colly-name").innerHTML =
          "SHoWING: <a href='" + collyPath + "'>" + collyName + "</a>";
      });
    },
    {
      font: font || "topazplus",
      bits: displayMode || "8",
      icecolors: 0,
      rows: lineHeight,
      extendedcolumns: extendedColumns || 0,
      disableblink: disableblink || "false",
    }
  );
}

// Changes the current display font.
function collyviewerFontChanger(font) {
  var querystringParams = new URLSearchParams(window.location.search);

  // If there is currently a "font" set, remove it.
  if (querystringParams.has("font")) {
    querystringParams.delete("font");
  }

  // Set the "font" parameter and reload the page.
  querystringParams.append("font", font);
  window.location.href = window.location.pathname + "?" + querystringParams.toString();
}
