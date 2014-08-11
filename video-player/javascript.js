var videoStatus = "paused";

var video = document.getElementById("video");
var progressbar = document.getElementById("progressbar")
var progressBarCompleted = document.getElementById("progressbar-completed");
var progressBarRemaining = document.getElementById("progressbar-remaining");
var playpause = document.getElementById("playPause");

video.addEventListener("click", playPause, false);
playpause.addEventListener("click", playPause, false);
progressbar.addEventListener("click", seekVideo, false);

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

setInterval(function init () {
	updateProgressBar();
	checkIfEnded();
}, 1)

