console.log("Welcome to Spotify");

//Initializing the Variables

let songIndex = 0;
let audioElement = new Audio('1.mp3');
// audioElement.play();//plays the song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));//Taking the HTML Collection

let songs = [
    { id: "audio_1", songName: "Warriyo - Mortals [NCS Release]", filePath: "1.mp3", coverPath: "covers/1.jpg" },
    { id: "audio_2", songName: "Cielo - Huma-Huma", filePath: "2.mp3", coverPath: "covers/2.jpg" },
    { id: "audio_3", songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "3.mp3", coverPath: "covers/3.jpg" },
    { id: "audio_4", songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "4.mp3", coverPath: "covers/4.jpg" },
    { id: "audio_5", songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "5.mp3", coverPath: "covers/5.jpg" },
    { id: "audio_6", songName: "Rabba - Salam-e-Ishq", filePath: "2.mp3", coverPath: "covers/6.jpg" },
    { id: "audio_7", songName: "Sakhiyaan - Salam-e-Ishq", filePath: "2.mp3", coverPath: "covers/7.jpg" },
    { id: "audio_8", songName: "Bhula Dena - Salam-e-Ishq", filePath: "2.mp3", coverPath: "covers/8.jpg" },
    { id: "audio_9", songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "2.mp3", coverPath: "covers/9.jpg" },
    { id: "audio_10", songName: "Na Jaana - Salam-e-Ishq", filePath: "4.mp3", coverPath: "covers/10.jpg" },
] //Array of objects

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; //("img")[0] ye [0] hai,shayad HTML collection ko target kr rhe hai isiliye
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // yha bhi
})

//Event_Listeners

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTimes <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    //Progress bar pe click karne se current time ka audio bajega
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


//69th Line wale ke execute hone pr hi ye function call hoga
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

let storeCurrentTime = 0
let prevIndex = -1

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    // let flag = 0;
    element.addEventListener('click', (e) => {

        // console.log(element);

        if (audioElement.paused && audioElement.currentTime == 0) {

            console.log("1");

            makeAllPlays();//make all the icons as play
            songIndex = parseInt(e.target.id);
            prevIndex = songIndex
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `${songIndex + 1}.mp3`;//Plays the songIndex+1 th song
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;//because a new song start playing
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

        }

        else if (!(audioElement.paused) && audioElement.currentTime > 0) {
            // 1. Wahi element ko fir se play kiya gaya hai
            // 2. Doosre element ko play kar diya
            console.log("2");
            audioElement.pause();
            songIndex = parseInt(e.target.id);

            if (prevIndex == songIndex) {
                audioElement.currentTime = storeCurrentTime
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
            }
            else {
                prevIndex = songIndex
                audioElement.src = `${songIndex + 1}.mp3`;//Plays the songIndex+1 th song
                audioElement.currentTime = 0
                audioElement.play();

                masterSongName.innerText = songs[songIndex].songName;
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }

            // makeAllPlays();
            // e.target.classList.remove('fa-play-circle');
            // e.target.classList.add('fa-pause-circle');
            // audioElement.src = `${songIndex + 1}.mp3`;//Plays the songIndex+1 th song
            // masterSongName.innerText = songs[songIndex].songName;
            // audioElement.currentTime = 0;//because a new song start playing
            // // audioElement.play();
            // gif.style.opacity = 1;
            // masterPlay.classList.remove('fa-play-circle');
            // masterPlay.classList.add('fa-pause-circle');

        }

        else if (audioElement.paused && audioElement.currentTime > 0) {
            console.log("3");
            // audioElement.play();
            makeAllPlays();
            prevIndex = parseInt(e.target.id);
            storeCurrentTime = audioElement.currentTime
            // e.target.classList.remove('fa-play-circle');
            // e.target.classList.add('fa-pause-circle');
        }

    })
})

// function play(audioElement) {
//     if (audioElement.paused && audioElement.currentTime == 0) {
//         console.log("11. Play when Pause");

//         makeAllPlays();//make all the icons as play
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-play-circle');
//         e.target.classList.add('fa-pause-circle');
//         audioElement.src = `${songIndex + 1}.mp3`;//Plays the songIndex+1 th song
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime = 0;//because a new song start playing
//         audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove('fa-play-circle');
//         masterPlay.classList.add('fa-pause-circle');
//     }
//     else if (!(audioElement.paused) && audioElement.currentTime > 0) {
//         console.log("2");
//         let storeCurrTime = audioElement.currentTime;
//         audioElement.pause();

//         makeAllPlays();
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-play-circle');
//         e.target.classList.add('fa-pause-circle');
//         audioElement.src = `${songIndex + 1}.mp3`;//Plays the songIndex+1 th song
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime = 0;//because a new song start playing
//         // audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove('fa-play-circle');
//         masterPlay.classList.add('fa-pause-circle');
//     }
// }

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;//rakhne na rakhne ka koi matlab nhi h

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;//rakhne na rakhne ka koi matlab nhi h
})

