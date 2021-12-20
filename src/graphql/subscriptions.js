/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToNewMessage = /* GraphQL */ `
  subscription SubscribeToNewMessage($receiver: String) {
    subscribeToNewMessage(receiver: $receiver) {
      room_id
      timestamp
      sender
      receiver
      body
      is_media
      media_url
      from_me
    }
  }
`;
