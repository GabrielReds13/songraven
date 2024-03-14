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
        <div class="-song-button -play-pause" v-on:click="Player_Manager()">
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
  import soundSfx from '~/assets/sounds/song.mp3';

  const audioPlay = () => {
    if (process.client) {
      const audio = new Audio(soundSfx);
      console.log(audio)
      audio.play();
    }
  }

  // --- Sound Source ---
  
  // --- Play and pause ---
  // -- Components --
  let play_pause = false;
  const p_play_icon = ref(null);
  const p_pause_icon = ref(null);

  function Player_Manager() {
    if(play_pause === false) {
      p_pause_icon.value.style.display = "none";
      p_play_icon.value.style.display = "flex";

      play_pause = true;
    }
    else {
      p_pause_icon.value.style.display = "flex";
      p_play_icon.value.style.display = "none";

      play_pause = false;
    }

    Timer();
  }

  // -- Song cronometer and progress --
  // -- Components --
  const progress_bar = ref(null);
  const timer_song_current = ref(null);
  const timer_song_duration = ref(null);

  // -- Variables --
  let minute_song = 0;
  let second_song = 46;
  let duration_in_sec = ((minute_song * 60) + second_song);

  let minute_current = 0, second_current = 0;
  let music_current_sec = 0, music_i = 100 / duration_in_sec;

  // -- Timer Func --
  function Timer() {
    setTimeout(() => {
      // Timer current
      if(play_pause === false) {
        // Timer
        if(second_current >= 59) {
          second_current = 0;
          minute_current ++;
        }
        else second_current++;
        
        // Progress bar
        if (music_current_sec >= (music_i * duration_in_sec)) {return;}
        else music_current_sec += music_i;
        
        progress_bar.value.style.width = `${music_current_sec}%`;
        
        // Cronometer text
        timer_song_current.value.innerHTML = `${(minute_current < 10 ? `0${minute_current}` : `${minute_current}`)}:${(second_current < 10 ? `0${second_current}` : `${second_current}`)}`;
        
        // Timer
        Timer();
      }
    }, 1000);
  }

  // Set song properties
  onMounted(() => {
    // Player manager
    Player_Manager();

    // Progress and cronometer
    timer_song_current.value.innerHTML = `${(minute_current < 10 ? `0${minute_current}` : `${minute_current}`)}:${(second_current < 10 ? `0${second_current}` : `${second_current}`)}`;
    timer_song_duration.value.innerHTML = `${(minute_song < 10 ? `0${minute_song}` : `${minute_song}`)}:${(second_song < 10 ? `0${second_song}` : `${second_song}`)}`;
  })

</script>

<style>
  /* -- Import -- */
  @import url("~/assets/styles/card/card.css");
</style>