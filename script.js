const menuOpen = document.getElementById('menu-open');
const sidebar = document.querySelector('.container .sidebar');

menuOpen.addEventListener('click', () => sidebar.style.left = '0');

const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.play-button');
const progressBar = document.querySelector('.active-line');
const songInfoTitle = document.querySelector('.description h3');
const songInfoArtist = document.querySelector('.description h5');
const currentTimeDisplay = document.querySelector('.song-info .progress p:first-child');
const totalTimeDisplay = document.querySelector('.song-info .progress p:last-child');
const songLogo = document.getElementById('song-logo');

const songs = [
    {
        title: 'From',
        artist: 'Sai Sharmila @BITIRI',
        src: 'assets/Audio/song-1.mp3',
        logo: 'assets/Images/sai.jpg'
    },
    {
        title: 'From',
        artist: 'Sathwik @ANNAYYA',
        src: 'assets/Audio/song-2.mp3',
        logo: 'assets/Images/sathwik.jpg'
    },
    {
        title: 'From',
        artist: 'Anjali @MACHA',
        src: 'assets/Audio/song-3.mp3',
        logo: 'assets/Images/anjalli.jpg'
    }
];

let currentSongIndex = 0;

function loadSong(song) {
    audioPlayer.src = song.src;
    songInfoTitle.textContent = song.title;
    songInfoArtist.textContent = song.artist;
    songLogo.src = song.logo;
}

loadSong(songs[currentSongIndex]);

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.classList.remove('bx-right-arrow');
        playButton.classList.add('bx-pause');
    } else {
        audioPlayer.pause();
        playButton.classList.remove('bx-pause');
        playButton.classList.add('bx-right-arrow');
    }
}

function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (!isNaN(duration)) {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audioPlayer.play();
    playButton.classList.remove('bx-right-arrow');
    playButton.classList.add('bx-pause');
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audioPlayer.play();
    playButton.classList.remove('bx-right-arrow');
    playButton.classList.add('bx-pause');
}

playButton.addEventListener('click', togglePlayPause);
audioPlayer.addEventListener('timeupdate', updateProgressBar);

document.querySelector('.bx-first-page').addEventListener('click', prevSong);
document.querySelector('.bx-last-page').addEventListener('click', nextSong);

document.querySelectorAll('.play-song-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const songIndex = event.target.closest('.item').getAttribute('data-index');
        currentSongIndex = parseInt(songIndex, 10);
        loadSong(songs[currentSongIndex]);
        audioPlayer.play();
        playButton.classList.remove('bx-right-arrow');
        playButton.classList.add('bx-pause');
    });
});

audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
});
