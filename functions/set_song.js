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
    async function Timer() {
        await setTimeout(() => {
            if(songProperties.source.duration == NaN) Timer();
        }, 1)
        return songProperties.source.duration;
    }

    const getDuration = Timer();
    return getDuration[2].[0];
}