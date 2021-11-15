import {
    apiCustomerHost, 
    apiUserHost
} from "../common/Config";

/* append all the API links here and call it by GetAPIAction */

/* User service */
export const GET_USER_BY_EMAIL = apiUserHost + "email/";
export const GET_USERS_BY_TEAM = apiUserHost + "team/";
export const GET_USER_BY_PHONE = apiUserHost + "phone/";
export const GET_USER_LIST = apiUserHost + "userlist";
export const GET_TEAM_LIST = apiUserHost + "teamlist";
export const GET_ROLE_LIST = apiUserHost + "roles/list";
export const GET_ROLE_BY_NAME = apiUserHost + "roles/name/";

/* Cusrtomers service */
export const GET_CUSTOMERS = apiCustomerHost;
export const GET_CUSTOMER_BY_ID = apiCustomerHost + "id/";
export const GET_CUSTOMER_BY_NAME = apiCustomerHost + "name/";
export const GET_CUSTOMERS_BY_TEAM_ID = apiCustomerHost + "team/"


