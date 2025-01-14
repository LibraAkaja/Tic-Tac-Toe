// Getting the sound status from previous page
const sStat = sessionStorage.getItem("status");

// Getting the game win/lose/draw status
const gStats = localStorage.getItem("gameStat");
console.log("Game Status: " + gStats);

const gameStatus = document.getElementById("gameStatus");

if(gStats == '0'){
    gameStatus.innerHTML = "Draw!";
}
else if(gStats == '1'){
    gameStatus.innerHTML = "Player 1 Won!";
}
else if(gStats == '2'){
    gameStatus.innerHTML = "Player 2 Won!";
}

//Getting the buttons for respective actions
const playA = document.getElementById("playAgain");
const mMenu = document.getElementById("mainMenu");
playA.addEventListener("click",() => {
    location.href = "../pages/game.html";
});
mMenu.addEventListener("click", ()=>{
    location.href = "../pages/main.html";
});

const elementsForSound = ["playAgain","mainMenu","gameStatus"];
const soundIDs = ["bgm","oS1","oS1","oS2"];
const srcs = ["../assets/sounds/Win.mp3","../assets/sounds/optionS.MP3","../assets/sounds/optionS.MP3","../assets/sounds/optionS2.MP3"];

// Plays sound automatically if was previously enabled

import {addGameSound} from "./sounds.js";

if(sStat == 1){
    addGameSound(elementsForSound,soundIDs,srcs);
}
