import {spotifyWebApi} from "../api/spotify-web-api";

export const convertToMMSS = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export async function getArrContainInMySavedTracks (listId: string[]) {

    function sliceListId(listId: string[]) {
        let promises = [];
        for (let i = 0, j = listId.length, block, chunk = 50; i < j; i += chunk) {
            block = listId.slice(i, i + chunk);
            promises.push(spotifyWebApi.containsMySavedTracks(block));
        }
        return Promise.all(promises);
    }

    let arr = await sliceListId(listId);

    let flatArr = arr.map(res => res.body).reduce((arr, val) => arr.concat(val), []);

    return flatArr;
}

export const prettifyNumber = (number: number) => {
    return String(number).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}
