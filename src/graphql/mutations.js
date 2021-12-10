/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMF2TCOCHATMESSAGE = /* GraphQL */ `
  mutation CreateMF2TCOCHATMESSAGE($input: CreateMF2TCOCHATMESSAGEInput!) {
    createMF2TCOCHATMESSAGE(input: $input) {
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
export const updateMF2TCOCHATMESSAGE = /* GraphQL */ `
  mutation UpdateMF2TCOCHATMESSAGE($input: UpdateMF2TCOCHATMESSAGEInput!) {
    updateMF2TCOCHATMESSAGE(input: $input) {
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
export const deleteMF2TCOCHATMESSAGE = /* GraphQL */ `
  mutation DeleteMF2TCOCHATMESSAGE($input: DeleteMF2TCOCHATMESSAGEInput!) {
    deleteMF2TCOCHATMESSAGE(input: $input) {
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
export const createMF2TCOCHATROOMS = /* GraphQL */ `
  mutation CreateMF2TCOCHATROOMS($input: CreateMF2TCOCHATROOMSInput!) {
    createMF2TCOCHATROOMS(input: $input) {
      room_id
      user_id
    }
  }
`;
export const updateMF2TCOCHATROOMS = /* GraphQL */ `
  mutation UpdateMF2TCOCHATROOMS($input: UpdateMF2TCOCHATROOMSInput!) {
    updateMF2TCOCHATROOMS(input: $input) {
      room_id
      user_id
    }
  }
`;
export const deleteMF2TCOCHATROOMS = /* GraphQL */ `
  mutation DeleteMF2TCOCHATROOMS($input: DeleteMF2TCOCHATROOMSInput!) {
    deleteMF2TCOCHATROOMS(input: $input) {
      room_id
      user_id
    }
  }
`;
