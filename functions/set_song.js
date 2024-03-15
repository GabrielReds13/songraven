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
        return songProperties.source.duration;
    }

    if (process.client) {
        const getDuration = Timer();
        return getDuration;
    } else return NaN;

}