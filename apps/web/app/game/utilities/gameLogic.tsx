/*
get a random index

*/

export const getAutoFlashIndex = () => {
    // because Math.floor is 0 inclusively to 1 exclusively
    return Math.floor(Math.random() * 9);
}

export const getAudio = (letter) => {
    const speech = new SpeechSynthesisUtterance(letter);
    speech.lang = 'en-US';
    console.log('alo')
    window.speechSynthesis.speak(speech);
}

export const alphabetLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const chooseRandomAlphabetIndx = () => {
    return Math.floor(Math.random() * 26);
}
