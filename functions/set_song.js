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
    // Verify number
    function verifyNumber() {
        let isNumber = false;

        while(true) {
            if (typeof songProperties.source.duration !== 'number') isNumber = false;
            else {
                isNumber = true;
                break;
            }
        }

        return isNumber;
    }

    // Return duration
    if(process.client) {
        if (verifyNumber() === true) {
            const getDuration = songProperties.source.duration;
            const setDuration = {
                minutes: (getDuration / 60).toFixed(),
                seconds: (getDuration % 60).toFixed(),
                durationInSec: getDuration
            }
            return setDuration;
        } 
        else return NaN;
    }
}