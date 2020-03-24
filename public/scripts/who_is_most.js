const gameID = getUrlParameter('gameID');

document.getElementById('game_code').innerHTML += " <b>" + gameID +"</b>";
const currentPlayersUL = document.getElementById('current_players_ul')

db.collection("who is most").doc(gameID)
    .onSnapshot(function(doc) {
        players = doc.data().players;
        currentPlayersUL.innerHTML = "";
        players.forEach(player => {
            li = `  <li>
                        ${player.name}
                    </li>`
            currentPlayersUL.innerHTML+=li;
        });
    });