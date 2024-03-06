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
            <p><span>00</span>:<span>00</span></p>
          </li>

          <!-- Duration -->
          <li class="-crono-time-duration">
            <p><span>00</span>:<span>00</span></p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="js" setup>
  import { ref } from 'vue';

  const progress_bar = ref(null);
  onMounted(() => {
    progress_bar.value.style.width = "75%";
  })

  let i = 0;
  function timer() {
    setTimeout(() => {
      i++;
      console.log(i)
      timer();
    }, 1000);
  }

</script>

<style>
  /* -- Import -- */
  @import url("~/assets/styles/card.css");
</style>