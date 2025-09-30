// Displays an ASCII or ANSI colly from the "collys" folder based on the filename
// specified in the "collyname" parameter (e.g. "/site/collyviewer.html?collyname=DLine_GeoMetriX.ans.txt")
// as if it were being downloaded on a modem at 57600 baud.
async function displayCollyModemStyle() {
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

  // Count the number of lines in the colly if lineheight isn't specified in the querystring
  // (Still need to figure out the line counter function for some types of ANSI files which are not CRLF line endings.)
  if (lineHeight > 0) {
    var lineCount = lineHeight;
  } else {
    var lineCount = await countLinesFromFileAsync(collyPath);
  }


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
      // Sets the height (i.e. number of lines) of the colly and adds a few extra blank rows for formatting.
      rows: lineCount + 5,
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

// Counts the number of lines in the colly to calculate the height.
async function countLinesFromFileAsync(pathToColly) {
  const response = await fetch(pathToColly);

  const text = await response.text();
  const lines = text.split(/\r?\n/);

  // Standard text file with CRLF line endings
  if (lines.length > 1) {
    return lines.length;
  }

  // Weird ANSI on a single line without line endings so assume the
  // lines are 80 characters wide (..and hope it works out! :p).
  return text.length / 80;
}
