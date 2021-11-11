import axios from "axios";

export function initialGetAPIState() {
    return {
        status: "",
        errMsg: ""
    };
}

export function initialPostAPIState() {
    return {
        type: "",
        status: "",
        errMsg: ""
    };
}

export async function getDataFromAPI(url) {
    let token = window.localStorage.getItem("token")
    console.log('getDataFromAPI url ', url);
    const param = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    const response = await fetch(url, param);

    return response;
}

export async function postDataToAPI(url, postType, requestBody) {
    
    let token = window.localStorage.getItem("token")

    console.log('RequestBody ', requestBody, url);
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    let response;
    switch (postType) {
        case "POST":
            response = await axios.post(url, JSON.stringify(requestBody), config);
            break;
        case "PUT":
            response = await axios.put(url, JSON.stringify(requestBody), config);
            break;
        case "DELETE":
            response = await axios.delete(url, JSON.stringify(requestBody), config);
            break;
    }

    // const response = {}  
    return response;
}
