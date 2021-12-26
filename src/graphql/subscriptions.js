/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToNewMessage = /* GraphQL */ `
  subscription SubscribeToNewMessage($room_id: Int!) {
    subscribeToNewMessage(room_id: $room_id) {
      room_id
      timestamp
      sender
      receiver
      body
      is_media
      media_url
      from_me
      message_type
    }
  }
`;
