/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMF2TCOCHATMESSAGE = /* GraphQL */ `
  subscription OnCreateMF2TCOCHATMESSAGE(
    $message_id: Int
    $room_id: Int
    $sender_id: Int
    $receiver_id: Int
    $channel: String
  ) {
    onCreateMF2TCOCHATMESSAGE(
      message_id: $message_id
      room_id: $room_id
      sender_id: $sender_id
      receiver_id: $receiver_id
      channel: $channel
    ) {
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
export const onUpdateMF2TCOCHATMESSAGE = /* GraphQL */ `
  subscription OnUpdateMF2TCOCHATMESSAGE(
    $message_id: Int
    $room_id: Int
    $sender_id: Int
    $receiver_id: Int
    $channel: String
  ) {
    onUpdateMF2TCOCHATMESSAGE(
      message_id: $message_id
      room_id: $room_id
      sender_id: $sender_id
      receiver_id: $receiver_id
      channel: $channel
    ) {
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
export const onDeleteMF2TCOCHATMESSAGE = /* GraphQL */ `
  subscription OnDeleteMF2TCOCHATMESSAGE(
    $message_id: Int
    $room_id: Int
    $sender_id: Int
    $receiver_id: Int
    $channel: String
  ) {
    onDeleteMF2TCOCHATMESSAGE(
      message_id: $message_id
      room_id: $room_id
      sender_id: $sender_id
      receiver_id: $receiver_id
      channel: $channel
    ) {
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
export const onCreateMF2TCOCHATROOMS = /* GraphQL */ `
  subscription OnCreateMF2TCOCHATROOMS($room_id: Int, $user_id: Int) {
    onCreateMF2TCOCHATROOMS(room_id: $room_id, user_id: $user_id) {
      room_id
      user_id
    }
  }
`;
export const onUpdateMF2TCOCHATROOMS = /* GraphQL */ `
  subscription OnUpdateMF2TCOCHATROOMS($room_id: Int, $user_id: Int) {
    onUpdateMF2TCOCHATROOMS(room_id: $room_id, user_id: $user_id) {
      room_id
      user_id
    }
  }
`;
export const onDeleteMF2TCOCHATROOMS = /* GraphQL */ `
  subscription OnDeleteMF2TCOCHATROOMS($room_id: Int, $user_id: Int) {
    onDeleteMF2TCOCHATROOMS(room_id: $room_id, user_id: $user_id) {
      room_id
      user_id
    }
  }
`;
