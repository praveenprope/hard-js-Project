const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("time-display");
const volumeSlider = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");
const videoInput = document.getElementById("video-input");

// Play/Pause functionality
playPauseBtn.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Update progress bar
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;

  const currentTime = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

// Seek video
progressBar.addEventListener("input", () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

// Fullscreen functionality
fullscreenBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
});

// Load video from input
videoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;
    video.play();
    playPauseBtn.textContent = "⏸️";
  }
});

// Format time (seconds to mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}
