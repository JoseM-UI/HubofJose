

const icons = document.querySelectorAll(".icon");

icons.forEach(icon => {

  icon.addEventListener("click", () => {

    const link = icon.dataset.link;

    icons.forEach(other => {
      if(other !== icon){
        other.classList.add("fade-out");
      }
    });

    icon.classList.add("move");

    setTimeout(()=>{
      window.location.href = link;
    },800);

  });

});



const audio = document.getElementById("audioPlayer");
const muteBtn = document.getElementById("muteBtn");


const playlist = [
    
  "/audio/sea of science.mp3",
  "/audio/Portal button.mp3",
  "/audio/soundjunkv2.mp3",
  "/audio/Half life_ Health Charger sound.mp3",
  "/audio/Smiling Friends Credits Song.mp3"

];

let trackIndex = 0;


/* load  track */

function loadTrack(){

  audio.src = playlist[trackIndex];

}


/* next track  */

audio.addEventListener("ended", () => {

  trackIndex++;

  if(trackIndex >= playlist.length){
    trackIndex = 0;
  }

  loadTrack();
  audio.play();

});



muteBtn.addEventListener("click", () => {

  audio.muted = !audio.muted;

  muteBtn.textContent = audio.muted ? "Unmute" : "Mute";

});



const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let audioContext;
let analyser;
let dataArray;
let bufferLength;


function setupAudio(){

  audioContext = new AudioContext();

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;

  const source = audioContext.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  bufferLength = analyser.fftSize;
  dataArray = new Uint8Array(bufferLength);

  drawWave();

}


function drawWave(){

  requestAnimationFrame(drawWave);

  analyser.getByteTimeDomainData(dataArray);

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ec9c40";

  ctx.beginPath();

  let sliceWidth = canvas.width / bufferLength;
  let x = 0;

  for(let i=0;i<bufferLength;i++){

    let v = dataArray[i] / 128.0;
    let y = v * canvas.height/2;

    if(i === 0){
      ctx.moveTo(x,y);
    } else {
      ctx.lineTo(x,y);
    }

    x += sliceWidth;

  }

  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

}



document.addEventListener("click", async () => {

  if(!audioContext){

    setupAudio();

    loadTrack();

    await audioContext.resume();

    audio.play();

  }

},{once:true});