/*
get a random index

*/

export const getAutoFlashIndex = () => {
    // because Math.floor is 0 inclusively to 1 exclusively
    return Math.floor(Math.random() * 9);
}