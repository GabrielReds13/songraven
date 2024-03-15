import soundSource from '~/assets/sounds/song.mp3';

let src;
if (process.client) {
    const audio = new Audio(soundSource);
    src = audio;
};


export const songProperties = {
    name: "",
    author: "",
    source: src
};

// Song duration
export function getSongDuration() {
    function Timer() {
        setTimeout(() => {
            if(songProperties.source.duration == NaN) Timer();
        }, 1)
        console.log(songProperties)
        return songProperties.source.duration;
    }

    // Return duration
    if (process.client) {
        const getDuration = Timer();
        const setDuration = {
            minutes: (getDuration / 60).toFixed(),
            seconds: (getDuration % 60).toFixed(),
            durationInSec: getDuration
        }

        return setDuration;
    } else return NaN;

}