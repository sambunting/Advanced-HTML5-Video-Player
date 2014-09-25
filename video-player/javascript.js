var videoStatus = "paused";
var volumeStatus = 3

var video = document.getElementById("video");
var progressbar = document.getElementById("progressbar");
var progressBarCompleted = document.getElementById("progressbar-completed");
var progressBarRemaining = document.getElementById("progressbar-remaining");
var volumeBar = document.getElementById("volume-bar");
var volumeBarCompleted = document.getElementById("soundbar");
var volumeBarRemaining = document.getElementById("soundbar-remaining");
var playpause = document.getElementById("playPause");
var muteUnmute = document.getElementById("volume-icon");
var fullscreen = document.getElementById("fullscreen-icon");

video.addEventListener("click", playPause, false);
video.addEventListener("dblclick", toggleFullScreen, false);
playpause.addEventListener("click", playPause, false);
progressbar.addEventListener("click", seekVideo, false);
volumeBar.addEventListener("click", changeVolume, false);
muteUnmute.addEventListener("click", mute, false);
fullscreen.addEventListener("click", toggleFullScreen, false);

function playPause () {
	if (video.paused) {
		video.play();
		console.log("Playing video.");
		playpause.src = "video-player/images/btn-pause.png";
		videoStatus = "playing";
	} else {
		video.pause();
		console.log("Pausing video.");
		playpause.src = "video-player/images/btn-play.png";
		videoStatus = "paused";
	}
}

function seekVideo(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
   	var seekto = video.duration * (xPosition / progressbar.clientWidth);

	console.log("Seek to: " + seekto + ". Clicked at: " + xPosition + " pixels. Progress bar total width: " + progressbar.clientWidth + ". Video duration: " + video.duration);
	video.currentTime = seekto;
}
 
function getPosition(element) {
    var xPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        element = element.offsetParent;
    }
    return { x: xPosition};
}

function updateProgressBar () {
	completedWidth = video.currentTime * (100 / video.duration);
	remainingWidth = (100 - completedWidth)

	progressBarCompleted.style.width = completedWidth + "%";
	progressBarRemaining.style.width = remainingWidth + "%";
}

function checkIfEnded () {
	if (video.currentTime === video.duration) {
		playpause.src = "video-player/images/btn-replay.png";
	}
}

function changeVolume(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
   	
   	var seekto = xPosition / 100;

   	if (seekto == 0) {
		muteUnmute.src = "video-player/images/btn-volume-0.png";
   	} else {
   		if (seekto > 0.3) {
	   		if (seekto > 0.6) {
	   			if (seekto > 0.9) {
						muteUnmute.src = "video-player/images/btn-volume-4.png";
						volumeStatus = 4;
			   	} else {
			   		muteUnmute.src = "video-player/images/btn-volume-3.png";
			   		volumeStatus = 3;
			   	}
		   	} else {
		   		muteUnmute.src = "video-player/images/btn-volume-2.png";
		   		volumeStatus = 2;
		   	}
	   	} else {
	   		muteUnmute.src = "video-player/images/btn-volume-1.png";
	   		volumeStatus = 1;
	   	}
   	}
   	

	console.log("Changing volume to: " + seekto + ". Clicked at: " + xPosition + " pixels. Volume bar total width: " + volumeBar.clientWidth);
	video.volume = seekto;
}

function updateVolumeBar() {
	remainingVolume = (1 - video.volume) * 100;

	volumeBarCompleted.style.width = video.volume * 100 + "%";
	volumeBarRemaining.style.width = remainingVolume + "%";

}

function mute() {
	if (volumeStatus != 0) {
		muteUnmute.src = "video-player/images/btn-volume-0.png";
		volumeStatus = 0;
		video.volume = 0;
	} else {
		muteUnmute.src = "video-player/images/btn-volume-3.png";
		volumeStatus = 3;
		video.volume = 0.8;
	}
}

function toggleFullScreen() {
	if (video.requestFullScreen) {
		video.requestFullScreen();
	} else if (video.webkitRequestFullScreen) {
		video.webkitRequestFullScreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	}
}

setInterval(function init () {
	updateProgressBar();
	updateVolumeBar();
	checkIfEnded();
}, 1)
