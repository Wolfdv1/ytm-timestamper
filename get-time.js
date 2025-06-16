function getCurrentTimestamp() {
  const video = document.querySelector('video');
  if (video) {
    const currentTime = Math.floor(video.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const link = `https://www.youtube.com/watch?v=${new URLSearchParams(window.location.search).get('v')}&t=${currentTime}s`;
    browser.runtime.sendMessage({ formattedTime, link });
  } else {
    browser.runtime.sendMessage({ error: "No video is currently playing." });
  }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTimestamp") {
    getCurrentTimestamp();
  }
});
