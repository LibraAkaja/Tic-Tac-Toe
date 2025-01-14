let crossORcircle = null,     //To store the source path of image
count = 0;      //To count the plays

const srcs = ["../assets/images/circle.svg","../assets/images/cross.svg"];     //Store the srcs of the images of cross and circle

//All the box images
let image = new Array(9).fill(null); 
let stats = new Array(9).fill(null);
for(let i = 0; i < 9; i++) {
    image[i] = document.getElementById('i'+(i+1));
}

//To help initialize what will a box hold; cross or circle
function getRandomInt(min, max) {
    let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
}

/*  To check if a pattern for winning the match is matched  */

function checkDiagonal() {
    //To check the diagonals
    if(stats[0] !== null && stats[0] === stats[4] && stats[0] === stats[8]){
        updateGstatus();
    }
    if(stats[2] !== null && stats[2] === stats[4] && stats[2] === stats[6]){
        updateGstatus();
    }
}

function checkRow() {
    //To check row-wise
    for(let i = 0; i < 3; i++){
        if(stats[i] !== null && stats[i] === stats[i+3] && stats[i] === stats[i+6]){
            updateGstatus();
        }
    }
}
    
function checkColumn() {
    //To check column-wise 
    for(let i = 0; i < 7; i += 3){
        if(stats[i] !== null && stats[i] === stats[i+1] && stats[i] === stats[i+2]){
            updateGstatus();
        }
    }
}

//To select every box in order to add event listener
const boxes = document.querySelectorAll(".crossOcircle");
boxes.forEach((b) => {
    b.addEventListener("click",(event) => {
        localStorage.setItem("gameStat",0);     // 0 denoting draw, by default if no one wins, it is a draw 
        count++;        
        const index = parseInt(event.target.id[1],10) - 1;
        if(stats[index] !== null) return;       //Prevents re-clicking:is very very imporatant
        const bximg = document.getElementById('i'+ event.target.id[1]);
        if(crossORcircle === "../assets/images/circle.svg") {
            crossORcircle = "../assets/images/cross.svg";
            stats[index] = 0;
        }
        else {
            crossORcircle = "../assets/images/circle.svg";
            stats[index] = 1;
        }
        bximg.src = crossORcircle;
        console.log(stats);
        if(count >= 5) {        // because min of 5 moves are required for a win
            checkDiagonal();
            checkRow();
            checkColumn();
        }
        if(count === 9) {
            gameOver();
        }
    });
});

//Updates game status and send signal for leaderboard
function updateGstatus() {
    if(count % 2 !== 0) {
        //Implies player 1 has won
        localStorage.setItem("gameStat",1);
    }
    else {
        //Implies player 2 has won
        localStorage.setItem("gameStat",2);
    }
    gameOver();
}

//  Executes when the game finishes
function gameOver() {
    location.href = "../pages/leaderboard.html";
}

// Main game function
function runGame() {
    const rNum = getRandomInt(0,1);    //Get a random number
    crossORcircle = srcs[rNum];        //Set Circle or Cross for the first player
}

window.addEventListener("load",runGame);

/* Game sound */

import { addSettingBtnEvent, addGameSound, stopGameSound, addSoundAnimation, stopSoundAnimation, initCheckSstatus } from "./sounds.js";

const gsb = document.getElementById("soundBar");
const gs = document.getElementById("gs");

const elementsForSound = ["settings","gameName","developer"];
const soundIDs = ["bgm","oS1","oS2","oS2"];
const srcses = ["../assets/sounds/DuringGame.mp3","../assets/sounds/optionS.MP3","../assets/sounds/optionS2.mp3","../assets/sounds/optionS2.mp3"];

initCheckSstatus(gsb,elementsForSound,soundIDs,srcs);       // Plays sound automatically if was previously enabled

addSettingBtnEvent(gs,gsb);

gsb.addEventListener("click", () => {
    if(window.getComputedStyle(gsb).backgroundColor == "rgba(53, 52, 58, 0.5)") {
        addSoundAnimation(gsb);
        addGameSound(elementsForSound,soundIDs,srcses);
    }
    else{
        stopSoundAnimation(gsb);
        stopGameSound(["bgm","oS1","oS2","p1","P1"]);
    }
    gsb.style.cursor = "default";       // Doing this makes cursor appearance around the invisible game sound button/trigger look normal
});