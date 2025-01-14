// Setting what happens when user clicks the Pikachu play button
const playBtn = document.querySelector("#playB");
playBtn.addEventListener("click", function() {
    location.href = "pages/game.html";
});

//Buttons from the html 
const gs = document.getElementById("gs"),
gsb = document.getElementById("soundBar");

// Random Function needed if multiple pokemon sounds were to be triggered
// function getRandomInt(min, max) {
//     let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
//     return randNum;
// }

// Importing functions from sound.js

import { addSettingBtnEvent, addGameSound, stopGameSound, addSoundAnimation, stopSoundAnimation, initCheckSstatus } from "./sounds.js";

const elementsForSound = ["settings","gameName","developer","playB","pichu","pikachu"];
const soundIDs = ["bgm","oS1","oS2","oS2","oS1","p1","P1"];
const srcs = ["assets/sounds/bgm.mp3","assets/sounds/optionS.MP3","assets/sounds/optionS2.mp3","assets/sounds/optionS2.mp3","assets/sounds/optionS.MP3","assets/sounds/pichu1.MP3","assets/sounds/pika1.mp3"];

initCheckSstatus(gsb,elementsForSound,soundIDs,srcs);       // Plays sound automatically if was previously enabled

addSettingBtnEvent(gs,gsb);

gsb.addEventListener("click", () => {
    if(window.getComputedStyle(gsb).backgroundColor == "rgba(53, 52, 58, 0.5)") {
        addSoundAnimation(gsb);
        addGameSound(elementsForSound,soundIDs,srcs);
    }
    else{
        stopSoundAnimation(gsb);
        stopGameSound(["bgm","oS1","oS2","p1","P1"]);
    }
    gsb.style.cursor = "default";       // Doing this makes cursor appearance around the invisible game sound button/trigger look normal
});

const sStats = sessionStorage.getItem("status");  // Getting the sound status from previous interactions with the sound enabling/disabling button


