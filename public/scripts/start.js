const startGameForm  = document.getElementById('start-game-form');
const createGameBtn =  document.getElementById('create-game-btn');
const joinGameBtn =  document.getElementById('join-game-btn');
const gameName = getUrlParameter('game');

if (gameName == "who_is_most"){
  $(document).prop('title', 'Who is most likely to ...?');
}

$('#alert-error').hide();


createGameBtn.onclick = function(){
  if (startGameForm.name.value == ""){
    showAlert("Please enter your name!")
  } else {
    $('#alert-error').hide();
    gameID = makeRandomCode(4)
    playerHost = {name: startGameForm.name.value, score:0,role:'host'}
    db.collection("who is most").doc(gameID).set({
      host: startGameForm.name.value,
      players: [playerHost]
    }).then(function() {
      document.location.href = `who_is_most.html?gameID=${gameID}`;
    })
    .catch(function(error) {
      showAlert(error)
    });
  }
}

joinGameBtn.onclick = function(){
  if (startGameForm.name.value == "" || startGameForm.game-code.value == ""){
    showAlert("Please enter your name and game code!")
  } else{
    $('#alert-error').hide();

  }
}