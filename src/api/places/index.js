import axios from 'axios';

let IP = {
    "localhost": "http://localhost:5000",
}

export const getPlace = async(params) => {
    let sendValue;
    try {
        await axios
        .get(`${IP['localhost']}/search`, {params : params})
        .then(response => {
                sendValue = response.data;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const getPlaceNameAll = async() => {
    let sendValue;
    try {
        await axios
        .get(`${IP['localhost']}/place/name/all`)
        .then(response => {
                sendValue = response.data;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const getNaverPlaceId = async(params) => {
    let sendValue;
    try {
        await axios
            .post(`${IP['localhost']}/place/naver_id`, params)
            .then(response => {
                sendValue = response;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const getPlaceByTheme = async(params) => {
    let sendValue;
    try {
        await axios
        .get(`${IP['localhost']}/place/theme`, {params : params})
        .then(response => {
                sendValue = response.data;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}

export const getPlaceByName = async(params) => {
    let sendValue;
    try {
        await axios
        .get(`${IP['localhost']}/like/place/name`, {params : params})
        .then(response => {
                sendValue = response.data;
            })

    } catch (e) {
        console.error(`Axios request failed: ${e}`);
    }
    return sendValue;
}



// export const getPlDesc = async(name) => {
//     let sendValue;
//     try {
//         await axios
//             .get(`${IP['production']}/description?name=${name}`)
//             .then(response => {
//                 sendValue = response.data;
//             });

//     } catch (e) {
//         console.error(`Axios request failed: ${e}`);
//     }
//     return sendValue;
// }

// export const getComments = async(name, page, cntOfPage) => {
//     let sendValue;
//     try {
//         await axios
//             .get(`${IP['production']}/comments?name=${name}&page=${page}&cntOfPage=${cntOfPage}`)
//             .then(response => {
//                 sendValue = response.data;
//             });

//     } catch (e) {
//         console.error(`Axios request failed: ${e}`);
//     }
//     return sendValue;
// }


// export const basicFilteredPlace = async(params) => {
//     let sendValue;
//     try {
//         await axios
//             .post(`http://${IP['production']}/search/basic`, params)
//             .then(response => {
//                 sendValue = response.data;
//             })

//     } catch (e) {
//         console.error(`Axios request failed: ${e}`);
//     }
//     return sendValue;
// }

// export const getPlaceEntities = async(params) => {
//     let sendValue;
//     try {
//         await axios
//             .post(`${IP['production']}/place/entities`, params)
//             .then(response => {
//                 sendValue = response.data;
//             })

//     } catch (e) {
//         console.error(`Axios request failed: ${e}`);
//     }
//     return sendValue;
// }

// export const getNaverPlaceId = async(lat, lng, name) => {
//     let baseUrl = `/v5/api/instantSearch?lang=ko&caller=pcweb&types=place,address,bus&coords=${lat},${lng}&query=${name}`
   
//     try {
//         return await axios({
//             mode: 'no-cors',
//             method: 'get',
//             url: baseUrl,
//             // credentials: 'same-origin',
//             headers: {
//                 'Referer': baseUrl,
//                 'Accept': '*/*',
//                 'Content-Type': 'application/json',
//                 "Access-Control-Allow-Credentials" : true ,
//                 "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
//                 "Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,OPTIONS",
//             },
//             // withCredentials: false // 추가 
//         })

//     //    return  fetch(baseUrl, {
//     //             mode : "no-cors",
//     //             method: 'GET',
//     //             headers:{
//     //                 'Accept': 'application/json',
//     //                 'Content-Type': 'application/json',
//     //                 "Access-Control-Allow-Credentials" : true ,
//     //                 "Access-Control-Allow-Origin" : true,
//     //                 "Access-Control-Allow-Origin" : "*",
//     //                 "Access-Control-Allow-Headers": "*",
//     //                 "Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,OPTIONS",
//     //                 "Access-Control-Allow-Origin" : "http://localhost:3000",
//     //                 "X-Requested-With": "XMLHttpRequest"
//     //             }}).then(res => res.json()).then(response => console.log('Success:', response))

//     } catch (e) {
//         console.error(`Axios request failed: ${e}`);
//         return false
//     }
// }