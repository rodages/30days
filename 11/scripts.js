// elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

//functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton() {
    const icon = this.paused ? '►' : '▌▌'
    toggle.textContent = icon
}

function skip() {
    //converts to gloat and updates the tracker of time
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    //volume || playback rate will be equal to the value of param
    video[this.name=this.value]
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}

function expand() {
    //checks if fullscreen is on
    if (document.fullscreenElement) {
        //exits if true
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (video.webkitRequestFullscreen) {
      // Need this to support Safari
      video.webkitRequestFullscreen();
    } else {
      video.requestFullscreen();
    }
}

//###EVENT LISTENERS

//plays vid
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
//updates the play button

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//playback controls for rewinding and going forward
skipButtons.forEach(button => button.addEventListener("click", skip));

//controls for range sliders on change and mousemove
ranges.forEach(slider => slider.addEventListener("change",handleRangeUpdate))
ranges.forEach(slider => slider.addEventListener("mousemove", handleRangeUpdate))

//updates the timebar
video.addEventListener("timeupdate", handleProgress)

///
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
//sets mousedown bool depending on mouseclick
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

fullscreen.addEventListener("click",expand)