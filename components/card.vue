<template>
  <div class="-card -border-custom">
    <!-- Data -->
    <img @click="audioPlay" ref="song_source" alt="" class="-song-image -border-custom">

    <div class="-song-info">
      <ul class="-data-song -column-list">
        <li class="-data-song-name">
          <h1>Song</h1>
        </li>
        <li class="-data-song-artist">
          <p>Artist</p>
        </li>
      </ul>

      <img src="@/assets/icons/like/Icon-Like-Off.svg" alt="Curtir" class="-data-like">
    </div>

    <!-- Player -->
    <ul class="-player-menu -row-list">
      <li>
        <div class="-song-button -previous-song">
          <img src="~/assets/icons/player-song/Icon-Skip.svg" alt="Anterior">
        </div>
      </li>

      <li>
        <div class="-song-button -play-pause" v-on:click="playerClick()">
          <img ref="p_pause_icon" src="~/assets/icons/player-song/Icon-Pause.svg" alt="Pause">
          <img ref="p_play_icon" src="~/assets/icons/player-song/Icon-Player.svg" alt="Player">
        </div>
      </li>

      <li>
        <div class="-song-button -later-song">
          <img src="~/assets/icons/player-song/Icon-Skip.svg" alt="Anterior">
          
        </div>
      </li>
    </ul>

    <!-- Song duration -->
    <ul class="-info-song-duration -column-list">
      <!-- Bar -->
      <li class="-song-progress-bar">
        <div id="song-bar-duration">
          <div id="song-bar-current" ref="progress_bar"></div>
        </div>
      </li>

      <!-- Cronometer -->
      <li class="-song-cronometer">
        <ul class="-cronometer -row-list">
          <!-- Current moment -->
          <li class="-crono-time-current">
            <p ref="timer_song_current">00:00</p>
          </li>

          <!-- Duration -->
          <li class="-crono-time-duration">
            <p ref="timer_song_duration">00:00</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="js" setup>
  // -- Import -- 
  import { ref } from 'vue';
  import { songManager } from '~/functions/song_manager';
  import { songProperties } from '~/functions/set_song';
  import { getSongDuration } from '~/functions/set_song';

  // --- Play and pause ---
  // -- Components --
  const p_play_icon = ref(null);
  const p_pause_icon = ref(null);

  let isPaused;
  function playerClick() {
    // - Player state -
    // Variables
    const playerState = songManager();
    
    //  - Player style -
    // Paused
    if(playerState === true) {
      p_pause_icon.value.style.display = "none";
      p_play_icon.value.style.display = "flex";
      
      isPaused = "paused";
    }
    // Playing
    else {
      p_pause_icon.value.style.display = "flex";
      p_play_icon.value.style.display = "none";
      
      isPaused = "playing";
    }
    
    // Timer
    Timer();

    return isPaused;
  }

  // -- Song cronometer and progress --
  // -- Components --
  const timer_song_current = ref(null);
  const timer_song_duration = ref(null);
  
  // -- Variables --
  var songDuration = getSongDuration();
  let minute_song;
  let second_song;

  let minute_current = 0, second_current = 0;
  let music_current_sec = 0, music_interval = 0;

  if (process.client) {
    // Set duration
    minute_song = songDuration.minutes;
    second_song = songDuration.seconds;
    
    // Set progress
    music_interval = 100 / songDuration.durationInSec;
  }

  // -- Timer Func --
  function progressS() {
    // Paused
    if (isPaused === "paused") {} 
    // Playing
    else if (isPaused === "playing") { 
      setTimeout(() => {
        second_current > 59 ? second_current = 0 : second_current += 1;
        second_current > 59 ? minute_current += 1 : minute_current = minute_current;
        
        timer_song_current.value.innerHTML = `${(minute_current < 10 ? `0${minute_current}` : `${minute_current}`)}:${(second_current < 10 ? `0${second_current}` : `${second_current}`)}`;
        
        // Timer
        // Test
        Timer();
      }, 1000);
    }  
  }

  // -- Progress Bar -- 
  const progress_bar = ref(null);

  // Set song properties
  onMounted(() => {
    // Player manager
    playerClick();

    // Progress and cronometer
    timer_song_current.value.innerHTML = `${(minute_current < 10 ? `0${minute_current}` : `${minute_current}`)}:${(second_current < 10 ? `0${second_current}` : `${second_current}`)}`;
    timer_song_duration.value.innerHTML = `${(minute_song < 10 ? `0${minute_song}` : `${minute_song}`)}:${(second_song < 10 ? `0${second_song}` : `${second_song}`)}`;
  })

</script>

<style>
  /* -- Import -- */
  @import url("~/assets/styles/card/card.css");
</style>