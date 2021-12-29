/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allMessage = /* GraphQL */ `
  query AllMessage($room_id: Int!) {
    allMessage(room_id: $room_id) {
      items {
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
      nextToken
    }
  }
`;
export const getMF2TCOMESSAGGE = /* GraphQL */ `
  query GetMF2TCOMESSAGGE($room_id: Int!, $timestamp: String!) {
    getMF2TCOMESSAGGE(room_id: $room_id, timestamp: $timestamp) {
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
export const listMF2TCOMESSAGGES = /* GraphQL */ `
  query ListMF2TCOMESSAGGES(
    $filter: TableMF2TCOMESSAGGEFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOMESSAGGES(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMF2TCOCHATROOM = /* GraphQL */ `
  query GetMF2TCOCHATROOM($room_id: Int!, $user_id: Int!) {
    getMF2TCOCHATROOM(room_id: $room_id, user_id: $user_id) {
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
export const listMF2TCOCHATROOMS = /* GraphQL */ `
  query ListMF2TCOCHATROOMS(
    $filter: TableMF2TCOCHATROOMFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOCHATROOMS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMF2ChannelInfo = /* GraphQL */ `
  query GetMF2ChannelInfo($channel_id: ID!, $user_id: Int!) {
    getMF2ChannelInfo(channel_id: $channel_id, user_id: $user_id) {
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
export const listMF2ChannelInfos = /* GraphQL */ `
  query ListMF2ChannelInfos(
    $filter: TableMF2ChannelInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2ChannelInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        channel_id
        user_id
        status
        qr_data
        channel_name
        url
        token
      }
      nextToken
    }
  }
`;
export const queryMF2ChannelInfosByIdUserIndex = /* GraphQL */ `
  query QueryMF2ChannelInfosByIdUserIndex(
    $channel_id: ID!
    $first: Int
    $after: String
  ) {
    queryMF2ChannelInfosByIdUserIndex(
      channel_id: $channel_id
      first: $first
      after: $after
    ) {
      items {
        channel_id
        user_id
        status
        qr_data
        channel_name
        url
        token
      }
      nextToken
    }
  }
`;
