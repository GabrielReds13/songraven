<template>
  <div class="-card -border-custom">
    <!-- Data -->
    <img src="" alt="" class="-song-image -border-custom">

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
          <img src="@/assets/icons/player-song/Icon-Skip.svg" alt="Anterior">
        </div>
      </li>

      <li>
        <div class="-song-button -play-pause">
          <img src="@/assets/icons/player-song/Icon-Player.svg" alt="Player">
        </div>
      </li>

      <li>
        <div class="-song-button -later-song">
          <img src="@/assets/icons/player-song/Icon-Skip.svg" alt="Anterior">
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

  // -- Progress Bar --
  const progress_bar = ref(null);
  const timer_song_current = ref(null);
  const timer_song_duration = ref(null);

  let minute_song = 4, second_song = 24;
  let minute_current = 0, second_current = 0;

  let music_duration_sec = ((minute_song * 60) + second_song), music_current_sec = 0, music_i = 100 / music_duration_sec;

  console.log(music_duration_sec)

  function timer() {
    setTimeout(() => {
      
      // Format time
      if(second_current >= 59) {
        second_current = 0;
        minute_current ++;
      }
      else second_current++;

      // Format progress
      if (music_current_sec >= (music_i * music_duration_sec)) {return;}
      else music_current_sec += music_i;

      progress_bar.value.style.width = `${music_current_sec}%`;
      
      // sfsdfsf
      timer_song_current.value.innerHTML = `${minute_current}:${second_current}`;
      timer_song_duration.value.innerHTML = `${minute_song}:${second_song}`;

      // Timer
      timer();
    }, 1000);
  }

  timer();
</script>

<style>
  /* -- Import -- */
  @import url("~/assets/styles/card.css");
</style>