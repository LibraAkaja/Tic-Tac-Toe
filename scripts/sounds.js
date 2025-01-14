// For box containing game sound button
export function addSettingBtnEvent(gs,gsb) {
    gs.style.visibility = "hidden";
    document.getElementById("settings").addEventListener("click",() => {
        if(gs.style.visibility === "hidden") {
            gs.style.visibility = "visible";
            gs.style.opacity = "1";
            gs.style.transform = "scale(1)";
            gsb.style.cursor = "pointer";
        }
        else {
            gs.style.visibility = "hidden";
            gs.style.opacity = "0";
            gs.style.transform = "scale(0.9)";
        }
        gs.style.transition = "opacity 0.5s linear, transform 0.5s ease-in-out";
    });
}

// Function for adding sounds
export function addGameSound(elementIDs,soundIDs,soundPaths){
    sessionStorage.setItem("status",1);        // Set sound status to 1 
    for(let i = 1; i < soundPaths.length; i += 1) {
        document.getElementById(soundIDs[i]).src = soundPaths[i];
    }
    document.getElementById(soundIDs[0]).play()          // Play the bgm
    .then(() => {       
        // Adding sounds to other necessary elements
        for(let i = 1; i <= elementIDs.length; i+=1){
            document.getElementById(elementIDs[i-1]).addEventListener("mouseenter", () => {
                document.getElementById(soundIDs[i]).play().catch((error) => {
                    console.error("Error playing audio: ",error);
                });
            });
        }
    })
    .catch((error) => {
        console.error("Error playing audio: ",error);
    });
    console.log("Sound Status: " + sessionStorage.getItem("status"));     // To see what is the status of sound
}

// Function for stopping sounds
export function stopGameSound(soundIDs){
    sessionStorage.setItem("status",0);        // Reset the sound status
    console.log("Sound Status: " + sessionStorage.getItem("status"));     // To see what is the status of sound
    document.getElementById(soundIDs[0]).pause();        // Pause playing bgm
    for(let i = 1; i <= soundIDs.length; i+=1) {
        document.getElementById(soundIDs[i]).src = "0";
    }
}

// Animation when sound is on
export function addSoundAnimation(gsb){
    gsb.style.backgroundColor = "rgba(4, 255, 0, 0.25)";
    gsb.style.transition = "background 0.5s linear";
}

// Animation when sound is off
export function stopSoundAnimation(gsb){
    gsb.style.backgroundColor = "rgba(53, 52, 58, 0.5)";
    gsb.style.transition = "background 0.5s linear";
}

// Function to check sound status initially
export function initCheckSstatus(gsb,elementIDs,soundIDs,srcs){
    if(sessionStorage.getItem("status") == 1){
        addSoundAnimation(gsb);
        addGameSound(elementIDs,soundIDs,srcs);
    }
}

