const alarmList = document.querySelector("#alarm-list");
const addButton = document.querySelector(".add");
let ul = document.querySelector("ul");
ul.classList.add("checked");
let alarmTime = "";

//Function to save the alarms so that they aren't lost when refreshed
function saveAlarm(){
    localStorage.setItem("data", alarmList.innerHTML)
};

//creating multiple alarms:
addButton.addEventListener("click", function addAlarm(){
    const input = document.getElementById("input");

    //if no value is entered:
    if (input.value ===""){
        alert("Invalid alarm");
        return;
    }

    //Adding the alarm:
    else{
        let li = document.createElement("li");
        li.innerHTML = String(input.value);
        alarmList.appendChild(li);
        let span2 = document.createElement("span");
        span2.classList.add("snooze");
        span2.innerHTML = '<button type="button" class="temp">Snooze</button>';
        li.appendChild(span2);
        let span = document.createElement("span");
        span2.classList.add("dismiss");
        span.innerHTML = "🗑️";
        li.appendChild(span);
    }
    //set alarm-time
    alarmTime = input.value;

    //reset input value:
    input.value = "";

    //To save the alarm call saveAlarm():
    saveAlarm();
});

alarmList.addEventListener("click", function(event){
    if(event.target.tagName === "SPAN"){// span= trash can. Thus, removing span's parent element results in removal of li
        event.target.parentElement.remove();
        stopAudio();
        saveAlarm();
    }
    if(event.target.classList.contains("temp")){
        snoozeAlarm();
    }
    
},false);

//To show the alarms:
function showAlarm(){
    alarmList.innerHTML = localStorage.getItem("data");
}

showAlarm();


//Display the current time:
let liveTime = document.querySelector("#live-time");
function liveTimeChange() {
    let curr = new Date();
    let hrs = String(curr.getHours()).padStart(2,"0");
    let min = String(curr.getMinutes()).padStart(2, "0");
    let sec = String(curr.getSeconds()).padStart(2, "0");
    liveTime.textContent = `${hrs}:${min}:${sec}`;
}
liveTimeChange();
//function that changes liveTime every second:
setInterval(liveTimeChange, 1000);


//function to check the alarm every second:
setInterval(checkAlarm, 1000);

function checkAlarm(){
    //let alarm = new Date(alarmTime);
    let now = new Date();
    let alarm = new Date();
    let [hours, minutes] = alarmTime.split(":");
    alarm.setHours(hours, minutes, 0);

    if(!alarmTime){
        return;
    }
    if (now>= alarm){
        //trigger alarm
        playAudio();
        alarmTime = "";//Reset alarmTime
    }
}

let audio; //giving audio global scope so that I can access it later to dismiss the alarm
function playAudio(){
    if(!audio){audio = new Audio("alarm.mp3");}
    audio.play();
}
//Function to dismiss audio:
function stopAudio() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset the audio
        alarmTime = ""; // Clear the alarm
    }
}

//Function to snooze alarm by 5 minutess
function snoozeAlarm(){
    // Set the snooze time to 5 minutes later:
    stopAudio();
    let now = new Date();
    let snoozeTime = new Date(now.getTime() + 5 * 60 * 1000);
    
    // Convert the snooze time back to "HH:MM" format:
    let hours = String(snoozeTime.getHours()).padStart(2, "0");
    let minutes = String(snoozeTime.getMinutes()).padStart(2, "0");
    alarmTime = `${hours}:${minutes}`;
}


//Dark Mode function
const div = document.querySelector(".app");
const mode = document.querySelector(".mode");
mode.addEventListener("click",
function darkMode(){
    if (div.classList.contains("darkMode")){
        mode.innerHTML = "Dark mode";
    }
    
    else{
        mode.innerHTML = "Light mode";
    }
    div.classList.toggle("darkMode");
});

