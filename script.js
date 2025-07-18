const background = document.querySelector(".bg-img");
const Song_Name = document.querySelector(".music-name");
const artist = document.querySelector(".artist");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const start = document.querySelector(".start");
const end = document.querySelector(".end");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const playPauseBtn = document.querySelector(".play-pause");
const float_img = document.querySelector(".flt-img");
const audio = document.querySelector(".audio");

const songs = [
    {
        name: "yamma yamma",
        artist: "S. P. Balasubrahmanyam",
        src: "songs/2.mp3",
        img: "images/1.jfif"
    },
    {
        name: "Agilam Nee",
        artist: "Ananya Bhat",
        src: "songs/3.mp3",
        img: "images/2.jfif"
    },
    {
        name: "Annana Thaalaatum",
        artist: "Anurag Kulakarni",
        src: "songs/4.mp3",
        img: "images/3.jfif"
    },
    {
        name: "Azhage Bhraminidam",
        artist: "Harish Raghavendra",
        src: "songs/5.mp3",
        img: "images/4.jfif"
    },
    {
        name: "Naa Autokaran",
        artist: "S.P.Balasubrahmanyam",
        src: "songs/6.mp3",
        img: "images/5.jfif"
    },
    {
        name: "Thani vazhi",
        artist: "Anirudh Ravichander",
        src: "songs/7.mp3",
        img: "images/6.jfif"
    },
    {
        name: "Devaralan Aattam",
        artist: "Yogisekar",
        src: "songs/8.mp3",
        img: "images/7.jfif"
    },
    {
        name: "Hey Sita Hey Rama",
        artist: "S.P. Charan",
        src: "songs/10.mp3",
        img: "images/8.jfif"
    },
    {
        name: "Komba Un Kaada",
        artist: "Prakruthi Reddy",
        src: "songs/11.mp3",
        img: "images/9.jfif"
    },
    {
        name: "Kutti Story",
        artist: "Vijay",
        src: "songs/12.mp3",
        img: "images/10.jfif"
    },
    {
        name: "Meesaya Muruku",
        artist: "Hiphop Tamizha",
        src: "songs/13.mp3",
        img: "images/11.jfif"
    },
];

let currentSong = 0;
let isPlaying = false;

// Load initial song
loadSong(currentSong);

// Start with play icon
playPauseBtn.src = "images/play.png";
playPauseBtn.title = "Play";

function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "images/pause.png";
    playPauseBtn.title = "Pause";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.src = "images/play.png";
    playPauseBtn.title = "Play";
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

// Load previous song
prev.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

// Load next song
next.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

// Load song by index
function loadSong(index) {
    const song = songs[index];
    background.src = song.img;
    float_img.src = song.img;
    Song_Name.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = song.src;

    progress.style.width = "0%";
    start.textContent = "00:00";
    end.textContent = "00:00";
}

// Update progress and time
audio.addEventListener("timeupdate", () => {
    const current = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration) || 0;

    if (!isNaN(duration)) {
        const percent = (current / duration) * 100;
        progress.style.width = `${percent}%`;

        start.textContent = formatTime(current);
        end.textContent = formatTime(duration);
    }
});

// Seek audio
progressBar.addEventListener("click", (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Format MM:SS
function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
