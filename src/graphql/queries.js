/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMF2TCOCHATMESSAGE = /* GraphQL */ `
  query GetMF2TCOCHATMESSAGE($message_id: Int!) {
    getMF2TCOCHATMESSAGE(message_id: $message_id) {
      message_id
      room_id
      sender_id
      receiver_id
      channel
      message_type
      body
      quote
      is_media
      media_url
      v_cards
      is_broadcast
      is_chatbot
      chatbot_id
      broadcast_id
    }
  }
`;
export const listMF2TCOCHATMESSAGES = /* GraphQL */ `
  query ListMF2TCOCHATMESSAGES(
    $filter: TableMF2TCOCHATMESSAGEFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOCHATMESSAGES(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        message_id
        room_id
        sender_id
        receiver_id
        channel
        message_type
        body
        quote
        is_media
        media_url
        v_cards
        is_broadcast
        is_chatbot
        chatbot_id
        broadcast_id
      }
      nextToken
    }
  }
`;
export const getMF2TCOCHATROOMS = /* GraphQL */ `
  query GetMF2TCOCHATROOMS($room_id: Int!, $user_id: Int!) {
    getMF2TCOCHATROOMS(room_id: $room_id, user_id: $user_id) {
      room_id
      user_id
    }
  }
`;
export const listMF2TCOCHATROOMS = /* GraphQL */ `
  query ListMF2TCOCHATROOMS(
    $filter: TableMF2TCOCHATROOMSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOCHATROOMS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        room_id
        user_id
      }
      nextToken
    }
  }
`;
