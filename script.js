const myVideo = document.getElementById('myVideo');
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnStop = document.getElementById('btnStop');
const timeOut = document.getElementById('timeOut');
const volumeUp = document.getElementById('btnVolumePlus');
const volumeDown = document.getElementById('btnVolumeMinus');
const mute = document.getElementById('btnMute');
const fullScreen = document.getElementById('btnFullScreen');

let timer = null;


btnPlay.addEventListener('click', vidAction);
btnPause.addEventListener('click', vidAction);
btnStop.addEventListener('click', vidAction);
mute.addEventListener('click', muteAction);
fullScreen.addEventListener('click', screenAction);


let alterVolume = function(dir) {
    let currentVolume = Math.floor(myVideo.volume * 10) / 10;
    if (dir === '+') {
        if (currentVolume < 1) myVideo.volume += 0.1;
    }
    else if (dir === '-') {
       if (currentVolume > 0) myVideo.volume -= 0.1;
    }
}

volumeUp.addEventListener('click', function(e) {
    alterVolume('+');
});
volumeDown.addEventListener('click', function(e) {
    alterVolume('-');
});


function vidAction(event) {
    switch(event.target.id) {
        case "btnPlay":
            playVideo();
            timer = setInterval(update, 100);
            break;
        case "btnPause":
            myVideo.pause();
            break;
        case "btnStop":
            myVideo.pause();
            myVideo.currentTime = 0;
            break;
    }
}

//Play
function playVideo() {
    myVideo.play();
    timer = setInterval(update, 100);
}


function update() {
    timeOut.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
}

//Mute
function muteAction() {
    myVideo.muted = !myVideo.muted;
}

//FullScreen
function screenAction() {

}

function myTime(time) {
    var hr = ~~(time/3600);
    var min = ~~((time % 3600)/60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
        sec_min += "" + hts + ":" + (min < 10 ? "0" : ""); 
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + Math.round(sec);
    return sec_min;
}



