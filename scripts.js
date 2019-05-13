window.onload = function() {
  setTheRandomFing();
}

function setTheRandomFing() {
  return fetch('randomfings.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let randomFings = data.randomFings;
      let numberOfFings = randomFings.length;
      let aTrulyRandomFing = Math.floor(Math.random() * numberOfFings);
    
      document.getElementById('random-fing').textContent = randomFings[aTrulyRandomFing].text;
    });
}
          