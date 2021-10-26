const myVideo = document.getElementById('myVideo');
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnStop = document.getElementById('btnStop');
const timeOut = document.getElementById('timeOut');
const volumeUp = document.getElementById('btnVolumePlus');
const volumeDown = document.getElementById('btnVolumeMinus');
const mute = document.getElementById('btnMute');
const fullScreen = document.getElementById('btnFullScreen');
const seekslider = document.getElementById('seekslider');
const speedUp = document.getElementById('btnSpeedUp');
const speedSlow = document.getElementById('btnSpeedSlow');

let timer = null;


btnPlay.addEventListener('click', vidAction);
btnPause.addEventListener('click', vidAction);
btnStop.addEventListener('click', vidAction);
mute.addEventListener('click', muteAction);
fullScreen.addEventListener('click', toggleFullScreen);
seekslider.addEventListener('change', vidSeek);
myVideo.addEventListener('timeupdate', seekTimeUpdate);
speedUp.addEventListener('click', speed);
speedSlow.addEventListener('click', speed);


//Volume
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

//play, stop, pause
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


//Mute
function muteAction() {
    myVideo.muted = !myVideo.muted;
}

//FullScreen
function toggleFullScreen() {
    if(myVideo.requestFullScreen) {
        myVideo.requestFullScreen();
    } else if(myVideo.webkitRequestFullScreen) {
        myVideo.webkitRequestFullScreen();
    }else if(myVideo.mozRequestFullScreen) {
        myVideo.mozRequestFullScreen();
    }
}

//progressbar
function vidSeek() {
    let seekTo = myVideo.duration * (seekslider.value / 100);
    myVideo.currentTime = seekTo;
}
function seekTimeUpdate () {
    let newTime = myVideo.currentTime * (100 / myVideo.duration);
    seekslider.value = newTime;
}

//playback rate
function speed() {
    if(speedSlow) {
        myVideo.playbackRate = 0.75;
        if(speedSlow) myVideo.playbackRate = 0.5;
    } else if(speedUp) {
        myVideo.playbackRate = 1.75;
        if(speedUp) myVideo.playbackRate =2.0;
    }
}


//timer
function update() {
    timeOut.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
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



