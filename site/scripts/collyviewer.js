// Quick and messy function to show an ANSI colly using ansilove. Tidy later!
function displayColly() {
  var querystringParams = new URLSearchParams(window.location.search);
  var collyName = querystringParams.get("collyname");

  // TODO: Make a generic ASCII/ANSI loader page which can load any of the collys.
  // Tweak the layout to look a little better too.
  // Make sure we update the menu and give ansilove a credit on the footer.
  var controller = AnsiLove.animate(
    "collys/" + collyName,
    function(canvas, sauce) {
      document.getElementById("geometrix-render").appendChild(canvas);
      document.getElementById("colly-name").innerHTML = "LoADING: " + collyName;
      controller.play(57600, function() {
        document.getElementById("colly-name").innerHTML =
          "SHoWING: " + collyName;
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
