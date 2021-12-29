/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMF2TCOMESSAGGE = /* GraphQL */ `
  mutation CreateMF2TCOMESSAGGE($input: CreateMF2TCOMESSAGGEInput!) {
    createMF2TCOMESSAGGE(input: $input) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
      link
      media_url
      from_me
      message_type
      message_id
      hasQuotedMsg
      quote
      is_forwarded
      v_card
      read
    }
  }
`;
export const updateMF2TCOMESSAGGE = /* GraphQL */ `
  mutation UpdateMF2TCOMESSAGGE($input: UpdateMF2TCOMESSAGGEInput!) {
    updateMF2TCOMESSAGGE(input: $input) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
      link
      media_url
      from_me
      message_type
      message_id
      hasQuotedMsg
      quote
      is_forwarded
      v_card
      read
    }
  }
`;
export const deleteMF2TCOMESSAGGE = /* GraphQL */ `
  mutation DeleteMF2TCOMESSAGGE($input: DeleteMF2TCOMESSAGGEInput!) {
    deleteMF2TCOMESSAGGE(input: $input) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
      link
      media_url
      from_me
      message_type
      message_id
      hasQuotedMsg
      quote
      is_forwarded
      v_card
      read
    }
  }
`;
export const createMF2TCOCHATROOM = /* GraphQL */ `
  mutation CreateMF2TCOCHATROOM($input: CreateMF2TCOCHATROOMInput!) {
    createMF2TCOCHATROOM(input: $input) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const updateMF2TCOCHATROOM = /* GraphQL */ `
  mutation UpdateMF2TCOCHATROOM($input: UpdateMF2TCOCHATROOMInput!) {
    updateMF2TCOCHATROOM(input: $input) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const deleteMF2TCOCHATROOM = /* GraphQL */ `
  mutation DeleteMF2TCOCHATROOM($input: DeleteMF2TCOCHATROOMInput!) {
    deleteMF2TCOCHATROOM(input: $input) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const createMF2ChannelInfo = /* GraphQL */ `
  mutation CreateMF2ChannelInfo($input: CreateMF2ChannelInfoInput!) {
    createMF2ChannelInfo(input: $input) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
export const updateMF2ChannelInfo = /* GraphQL */ `
  mutation UpdateMF2ChannelInfo($input: UpdateMF2ChannelInfoInput!) {
    updateMF2ChannelInfo(input: $input) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
export const deleteMF2ChannelInfo = /* GraphQL */ `
  mutation DeleteMF2ChannelInfo($input: DeleteMF2ChannelInfoInput!) {
    deleteMF2ChannelInfo(input: $input) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
