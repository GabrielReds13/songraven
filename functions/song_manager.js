// --- Imports ---
import { songProperties } from '~/functions/set_song';

// --- Player Manager ---
// -- Variables --
let play_pause = false;

// -- Function --
export function songManager() {
    // Pause
    if(play_pause === false) {
        songProperties.source.pause();
        return play_pause = true;
    }
    // Play
    else {
        songProperties.source.play();
        return play_pause = false;
    }
}