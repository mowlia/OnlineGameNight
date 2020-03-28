const gameID = getUrlParameter('gameID');
const myName = getUrlParameter('myName');

const currentPlayersUL = document.getElementById('current_players_ul')
const currentChoicesDiv = document.getElementById('current_choices_div')
const resultsDiv = document.getElementById('results_div')
const hostBtnMain = document.getElementById('host-btn-main')
const timerSpan = document.getElementById('timer')
const questionSpan = document.getElementById('question')

const gameRef = db.collection("who is most").doc(gameID)
 
myRole = "player";
hostName = "";
currentState = 0;
player = [];
questionNumber = 0;
questionMax = 70;
last_state_1 = null;
timerMax = 30;
myVote = null;
players = null;

//Whenever game doc changed state
gameRef.onSnapshot(function(doc) {
        players = doc.data().players;
        currentState = doc.data().state;
        questionNumber = doc.data().questionNumber;
        last_state_1 = doc.data().last_state_1;
        
        currentPlayersUL.innerHTML = "";

        for (const [playerName, playerData] of Object.entries(players)) {
            var isMe = ""
            if (playerName == myName){
                myRole = playerData.role
                myVote = playerData.vote
                isMe = "player_you"
            }
            if (playerData.role == "host")
                hostName = playerName;
        };

        updateGameInfo("id","Game Code: ", gameID)
        updateGameInfo("host", "Host: ",hostName)
        updateGameInfo("question","Question #", doc.data().questionNumber)
        updateGameInfo("state","State: ", currentState == 0 ? "Waiting for others": (currentState == 1 ? "Voting" :  "Result"))
        questionSpan.innerText = doc.data().questions[doc.data().questionNumber] + "?"

        if (currentState%2 == 0){
            // Results
            currentChoicesDiv.style.display = "none"
            timerSpan.style.display = "none"
            resultsDiv.style.display = "inline";

            if (myRole == "host")
                hostBtnMain.style.display = "inline"
            else 
                hostBtnMain.style.display = "none"
            
            if (currentState == 2){

                // Find the player ranking
                playersCopy = players
                playersOrdered = [{name:"No Vote",score:-1,voted:[]}]
                
                // Orders the number of votes received for each player
                for (const [playerName, playerData] of Object.entries(players)) {
                    console.log(playerData)
                    if (playerData.vote!=""){
                        if (playersCopy[playerData.vote].hasOwnProperty('votesGot'))
                            playersCopy[playerData.vote].votesGot.push(playerName)
                        else
                            playersCopy[playerData.vote].votesGot = [playerName]   
                    } else {
                        playersOrdered[0].voted.push(playerName)
                    }
                }
                // Orders the number of votes received for each player
                for (const [playerName, playerData] of Object.entries(playersCopy)) {
                    if (playerData.hasOwnProperty('votesGot')){
                        playersOrdered = addInPlace(playersOrdered,{name:playerName,score:playerData.votesGot.length,voted:playerData.votesGot})
                    }
                }

                
                // Draw the results
                resultsDiv.innerHTML = ""
                i=0
                playersOrdered.forEach(function(playerResult){
                    if (playerResult.voted.length != 0){
                        playersVote = ""
                        playerResult.voted.forEach(function(playerVoted){
                            playersVote += playerVoted + "<br>"
                        })

                        classExtra = ""
                        if (playerResult.voted.length == playersOrdered[0].voted.length){
                            classExtra = "winner"
                            playerResult.voted.forEach(function(playerVoted){ playersCopy[playerVoted].scoreChange = 1})
                        }
                        else if (i==(playersOrdered.length-1)){
                            classExtra = "loser"
                            playerResult.voted.forEach(function(playerVoted){ playersCopy[playerVoted].scoreChange = -1})
                        } else {
                            playerResult.voted.forEach(function(playerVoted){ playersCopy[playerVoted].scoreChange = 0})
                        }
                        resultsDiv.innerHTML += `<div class="result ${classExtra}">
                                                    ${playersVote}
                                                    <b>${playerResult.name}</b>
                                                </div>`
                        }
                    i++
                })
                console.log(playersCopy)
            }
            
        } else {
            // Voting
            resultsDiv.innerHTML = "";
            resultsDiv.style.display = "none";
            currentChoicesDiv.style.display = "inline"
            hostBtnMain.style.display = "none"
            timerSpan.style.display = "block"

            currentChoicesDiv.innerHTML = "";
            for (const [playerName, playerData] of Object.entries(players)) {
                extraClass = ""
                if (myVote == playerName)
                    extraClass = "selected"
                span = `<span onClick="sendChoice('${playerName}')" class="choice ${extraClass}" id="choice_${playerName}">
                            ${playerName}
                        </span>`
                currentChoicesDiv.innerHTML+=span;
            };

            updateTimeRemaining()

        }



        hostBtnMain.onclick = function(){
            if (currentState % 2 == 0){
                if (questionNumber < questionMax){ //Haven't reach the end yet
    
                    for (const [playerName, playerData] of Object.entries(players)) {
                        scoreZ = parseInt (playersCopy[playerName].scoreChange);
                        if (isNaN(scoreZ)){
                            scoreZ = 0;
                        }
                        players[playerName].vote = ""
                        players[playerName].score += scoreZ
                        players[playerName].votesGot = []
                        players[playerName].scoreChange = 0
                    }
                    
                    answer = playersOrdered[0].name
                    playersOrdered = [{name:""}]
                    //state should become 1 and question number+1
                    gameRef.update({
                        questionNumber: questionNumber+1,
                        state:1,
                        last_state_1: firebase.firestore.FieldValue.serverTimestamp(), 
                        players:players,
                        answers: firebase.firestore.FieldValue.arrayUnion(answer)
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                    });

                } else {
                    
                }
            }
        }

        playersCopy = players
        playersList = []
        for (const [playerName, playerData] of Object.entries(players)) {
            playersList.push({name:playerName,data:playerData})
        };
        playersList.sort((a, b) => (a.data.score < b.data.score) ? 1 : -1)
        playersList.forEach(function(playerSingle){
            score = playerSingle.data.score;
            scoreC = ""
            if (playersCopy[playerSingle.name].scoreChange == 1){
                scoreC = " +1"
            } if (playersCopy[playerSingle.name].scoreChange == -1){
                scoreC = " -1"
            }
            li = `  <li class="${isMe}">
                        ${playerSingle.name}
                        (${score}<b>${scoreC}</b>)
                    </li>`
            currentPlayersUL.innerHTML+=li;
        })
        


    });

function updateGameInfo(id,info,value){
    document.getElementById('info-'+id).innerHTML = info + value +"";
}

function updateTimeRemaining(){
    if (currentState == 1 && last_state_1!=null){
        var startTime = new Date();
        startTime.setTime(last_state_1.seconds*1000);
        var now = new Date();
        difference = (now.getTime() - startTime.getTime())/1000
        timer = Math.trunc(timerMax - difference)
        if (timer<=0 && myRole == "host"){
            gameRef.update({
                state:2,
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        }
        timerSpan.innerText=timer;
        setTimeout(updateTimeRemaining, 1000)
    }
}

function sendChoice(playerName){
    gameRef.update({
        [`players.${myName}.vote`] : playerName,
    })
   .then(function() {
        console.log("Choice sent!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
}