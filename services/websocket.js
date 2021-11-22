import { w3cwebsocket as W3CWebSocket } from "websocket";

const url = process.env.WS_URL

export const client = new W3CWebSocket('ws://mf-api-chat-6m4o7.ondigitalocean.app/websocket');


