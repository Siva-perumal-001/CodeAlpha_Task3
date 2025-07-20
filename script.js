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
const shuffle = document.querySelector(".shuffle");
const playlistbtn = document.getElementById("playlistbtn");

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
    if (isShuffled) {
        currentIndex = (currentIndex + 1) % shuffledOrder.length;
        currentSong = shuffledOrder[currentIndex];
    } else {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        currentIndex = currentIndex;
    }
    loadSong(currentSong);
    playSong();

});

// Load next song
next.addEventListener("click", () => {
    if (isShuffled) {
        currentIndex = (currentIndex - 1 + shuffledOrder.length) % shuffledOrder.length;
        currentSong = shuffledOrder[currentIndex];
    } else {
        currentSong = (currentSong + 1) % songs.length;
        currentIndex = currentSong
    }
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

let shuffledOrder = [];
let isShuffled = false;
let currentIndex = 0;

shuffle.addEventListener("click", () => {
    isShuffled = !isShuffled;
    console.log("hi")

    if (isShuffled) {
        shuffledOrder = [...Array(songs.length).keys()];
        shuffledOrder = shuffledOrder.filter(i => i !== currentSong);
        shuffleArray(shuffledOrder);
        shuffledOrder.unshift(currentSong);
        currentIndex = 0;
        shuffle.classList.add("active");
    }
    else {
        currentIndex = currentSong;
        shuffle.classList.remove("active");
    }
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const volumeBar = document.querySelector(".volume-bar");
const volumeFill = document.querySelector(".volume-fill");

volumeBar.addEventListener("click", (e) => {
    const barWidth = volumeBar.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / barWidth;

    audio.volume = volume;

    const percent = volume * 100;
    volumeFill.style.width = `${percent}%`;
    document.querySelector(".volume-thumb").style.left = `${percent}%`;
});

// On page load
const initialVolume = audio.volume * 100;
volumeFill.style.width = `${initialVolume}%`;
document.querySelector(".volume-thumb").style.left = `${initialVolume}%`;

// Auto play next song when current ends
audio.addEventListener("ended", () => {
    if (isShuffled) {
        // Move to next shuffled index
        currentIndex = (currentIndex + 1) % shuffledOrder.length;
        currentSong = shuffledOrder[currentIndex];
    } else {
        // Normal order
        currentSong = (currentSong + 1) % songs.length;
        currentIndex = currentSong;
    }

    loadSong(currentSong);
    playSong();
});

//Song Mute Feature

const mute_btn = document.querySelector(".mute");
const muteIcon = document.querySelector(".mute i");

let isMute = false;

mute_btn.addEventListener("click", () => {
    mute_Toggle();
})

isMute = true;

function mute_Toggle() {
    audio.muted = isMute;

    if (isMute) {
        muteIcon.classList.remove("fa-volume-up");
        muteIcon.classList.add("fa-volume-mute");
        muteIcon.title = "Mute";
        isMute = false;
    }
    else {
        muteIcon.classList.remove("fa-volume-mute");
        muteIcon.classList.add("fa-volume-up");
        muteIcon.title = "Volume";
        isMute = true;
    }
}

const playlistElement = document.getElementById("playlist");
const playlist_container = document.querySelector(".playlist-container");
const details = document.querySelector(".details");
const float = document.querySelector(".float");
const close = document.querySelector(".ri-close-line");
let isPlayListShow = false;

playlistbtn.addEventListener("click", () => {
    if (!isPlayListShow) {
        playlist_container.style.display = "block";
        details.style.display = "none";
        float.style.display = "none";
        renderPlaylist();
        isPlayListShow = true;
    }
    else {
        playlist_container.style.display = "none";
        float.style.display = "block";
        details.style.display = "flex";
        isPlayListShow = false;
    }
})

close.addEventListener("click", () => {
    playlist_container.style.display = "none";
    float.style.display = "block";
    details.style.display = "flex";
    isPlayListShow = false;
})

function renderPlaylist() {
    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="song-info">
                <img src="${song.img}" alt="${song.name}" class="list-img">
                <div class="song-text data">
                    <span class="song-name">${song.name}</span>
                    <span class="artist-name">${song.artist}</span>
                </div>
            </div>
            <div class="like">
                <i class="ri-heart-line"></i>
                <i class="ri-heart-fill" style="display: none;"></i>
            </div>
        `;

        // Add click to play song
        li.addEventListener("click", () => {
            currentSong = index;
            loadSong(currentSong);
            playSong();
            playlist_container.style.display = "none";
            float.style.display = "block";
            details.style.display = "flex";
            isPlayListShow = false;
        });

        // Handle heart icon toggle
        const heartLine = li.querySelector(".ri-heart-line");
        const heartFill = li.querySelector(".ri-heart-fill");

        // Check localStorage for this song index's like state
        const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || {};
        if (likedSongs[index]) {
            heartLine.style.display = "none";
            heartFill.style.display = "inline";
        }

        heartLine.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering li click
            heartLine.style.display = "none";
            heartFill.style.display = "inline";
            likedSongs[index] = true;
            localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
        });

        heartFill.addEventListener("click", (e) => {
            e.stopPropagation();
            heartFill.style.display = "none";
            heartLine.style.display = "inline";
            likedSongs[index] = true;
            localStorage.removeItem("likedSongs", JSON.stringify(likedSongs));
        });

        playlistElement.appendChild(li);
    });
}
