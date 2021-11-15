import {postDataToAPI, getDataFromAPI, initialPostAPIState} from "./ApiHelper";
import * as actions from "../actions/CommonActions";

export async function PostAPIAction(apiLink, postType, requestBody) {
    console.log('requestBody ', requestBody);

    if (["POST", "PUT", "DELETE"].indexOf(postType.toUpperCase()) < 0) {
        return {
            type: actions["API_POST_TYPE_ERROR"],
            status: ""
        }
    }
    try {
        const res = await postDataToAPI(apiLink, postType, requestBody);
        console.log(res);
        let body;
        let errMsg;
        const msg = "An unexpected error. Stay Calm and [id] us for support.";

        if (!res.ok) {
            errMsg = msg;
        }

        try {
            body = await res.body();
        } catch (e) {
            if (res.ok) {
                try {
                    body = await res.text();
                    
                    if (
                        body.indexOf("<!") === 0 && 
                        (
                            body.indexOf("html") !== -1 || 
                            body.indexOf("HTML") !== -1
                        )
                    ) {
                        throw Error();
                    }
                } catch (e) {
                    errMsg = msg;
                }
            }
        }

        const status = res.status;
        switch (status) {
            case 200:
                return {
                    postType: postType,
                    type: actions["API_" + postType + "_SUCCESS"],
                    payload: body,
                    status: status,
                };

            case 401:
                //change context token
                localStorage.setItem("token", "")
                localStorage.setItem("user", "")
                //reset token and data stored in states
                window.location.href = "/";
                return {};

            default:
                if (status < 400) {
                    break;
                }

                if (typeof body === "object" && body !== null && body.error_msg) {
                    // This is specific message to display to user in ui
                    // We use this to migrate from body.errMsg
                    errMsg = body.error_msg;
                }

                if (errMsg === undefined) {
                    switch (typeof body) {
                        case "string":
                            if (body.length) {
                                console.error("[" + postType + "_ERROR]:\n", body);
                            }
                            break;
                        case "object":
                            if (body !== null) {
                                errMsg = 
                                    body.non_field_errors || 
                                    body.email || 
                                    body.password;

                                if (errMsg === undefined) {
                                    if (typeof body.errMsg === "object" && body.errMsg !== null) {
                                        console.error("[" + postType + "_ERROR]:\n", body.errMsg);
                                    }
                                }
                            }
                    }
                }

                if (errMsg === undefined) {
                    errMsg = msg;
                }
        }

        return {
            postType: postType,
            type: actions["API_" + postType + "_ERROR"],
            errMsg: errMsg || "",
            status: status
        };
    } catch (error) {
        return {
            postType: postType,
            type: actions["API_" + postType + "_CONNECTION_ERROR"],
            errMsg: error.message,
            status: 500
        };
    }
}

export async function GetAPIAction(apiLink, param) {

    try {
        const apiResult = await getDataFromAPI(apiLink + (param == undefined ? "" : param));
        if (apiResult.status == 200) {
            const apiData = await apiResult.json();
            console.log('GetAPIAction apiData ', apiData);
            const errMsg = apiData.length > 0 ? "" : "No data retrieved.";
            return {
                payload: apiData,
                errMsg: errMsg,
                status: apiResult.status
            };
        } else {
            if (apiResult.status == 401) {
                localStorage.setItem("token", "")
                localStorage.setItem("user", "")
                window.location.href = "/login";
            }

            return {
                errMsg: apiResult.statusText,
                status: apiResult.status
            };
        }
    } catch (error) {
        return {
            errMsg: error.message,
            status: 500
        };
    }
}