import axios from 'axios';

let IP = {
    "localhost": "http://localhost:5000",
}


const getIp = async() =>{
    let value;
    try {
    await axios
    .get('https://api.ipify.org/?format=json' , {'headers': { 'Accept' :'application/json' } })
    .then(response => {
        value = response.data.ip
    })   
    } catch (e) {
        console.error(`Axios request failed: ${e}`);
        value = "";

    }
    return value; 
}



export const saveUserId = async(user_id) => {
    let user_ip  = await getIp();
    let params = [user_id];
    params.push(user_ip);
    let sendValue;
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    try {
        await axios
            .post(`${IP['localhost']}/save/user/id` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const saveUserCards = async(user_id, relName, value) => {
    let params = [user_id, relName, value];
    let sendValue;
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    try {
        await axios
            .post(`${IP['localhost']}/save/user/add/card` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const delUserCards = async(user_id, relName, value) => {
    let params = [user_id, relName, value];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/del/card` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const saveUserPlaceResult = async(user_id, resPlList ) => {
    let params = [user_id, resPlList];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/place_result` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const addUserFavPlace = async(user_id, favPlace ) => {
    let params = [user_id, favPlace];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/add/favorite_place` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const delUserFavPlace = async(user_id, favPlace ) => {
    let params = [user_id, favPlace];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/del/favorite_place` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const searchByPlaceName = async(user_id, placeName ) => {
    let params = [user_id, placeName];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/search_place_name` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}


export const clickShareButton = async(user_id, current_url ) => {
    let params = [user_id, current_url];
    let headers =  { 'Access-Control-Allow-Origin' : "*"}
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/save/user/click/share_button` ,params, headers)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}
