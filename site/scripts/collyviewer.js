// Displays an ASCII or ANSI colly from the "collys" folder based on the filename
// specified in the "collyname" parameter (e.g. "/site/collyviewer.html?collyname=DLine_GeoMetriX.ans.txt")
// as if it were being downloaded on a modem at 57600 baud.
function displayCollyModemStyle() {
  var querystringParams = new URLSearchParams(window.location.search);
  var collyName = querystringParams.get("collyname");
  var collyPath = "collys/" + collyName;

  // TODO: Make a generic ASCII/ANSI loader page which can load any of the collys.
  // Tweak the layout to look a little better too.
  // Make sure we update the menu and give ansilove a credit on the footer.
  var controller = AnsiLove.animate(
    collyPath,
    function(canvas) {
      document.getElementById("colly-content").appendChild(canvas);
      document.getElementById("colly-name").innerHTML = "LoADING: " + collyName;
      controller.play(57600, function() {
        document.getElementById("colly-name").innerHTML =
          "SHoWING: <a href='" + collyPath + "'>" + collyName + "</a>";
      });
    },
    {
      font: "amiga",
      bits: "8",
      icecolors: 0,
      columns: 80,
      rows: 62
    }
  );
}
