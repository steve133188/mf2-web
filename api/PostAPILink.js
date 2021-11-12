import {apiUserHost} from "../common/Config";

/* append all the API links here and call it by PostAPIAction */

/* User links */
export const CREATE_USER = apiUserHost;
export const FORGOT_PASSWORD = apiUserHost + "forgot-password";
export const UPDATE_DIV_TEAM = apiUserHost + "update-div-team";
export const REMOVE_USER_FROM_TEAM = apiUserHost + "remove-user-from-team";
export const CHANGE_USER_STATUS = apiUserHost + "status";
export const CHANGE_USER_ROLE = apiUserHost + "role";
export const UPDATE_USER = apiUserHost + "name";
export const DELETE_USER = apiUserHost + "name";