const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];

  
// check if playing
let isPlaying=false;


// play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    music.play();
}
// pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    music.pause();
}

//Update Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`
}
//current song
let songIndex = 0;

//next song
function nextSong(){
    songIndex++;
    if (songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//prev song
function prevSong(){
    songIndex--;
    if (songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


//on Load-select first song
loadSong(songs[songIndex]);





// update progress bar-time

function updateProgressBar(e){
  if (isPlaying) {
    const {duration,currentTime} = e.srcElement;
  //update progress bar width 
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`; 
  
// calculat display for duration 
   const durationMinute = Math.floor(duration/60);
   let durationSecond = Math.floor(duration%60);
   if (durationSecond<10) {
    durationSecond = `0${durationSecond}`;
   }
     // Delay
   if(durationSecond){
    durationEl.textContent = `${durationMinute}:${durationSecond}`;
 }
 const currentMinute = Math.floor(currentTime/60);
    let currentSecond = Math.floor(currentTime%60);
    if (currentSecond<10) {
     currentSecond = `0${currentSecond}`;
    } 
    currentTimeEl.textContent = `${currentMinute}:${currentSecond}`;
   } 
  }

//set progress bar 
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX=e.offsetX;
  const {duration} = music;
  music.currentTime=(clickX/width)*duration;
}

//event play or pause 
playBtn.addEventListener('click', () => ( isPlaying? pauseSong() : playSong()));
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
