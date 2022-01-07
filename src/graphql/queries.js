/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($room_id: Int!) {
    getMessage(room_id: $room_id) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
      channel
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
      sign_name
    }
  }
`;
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
        channel
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
        sign_name
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
      channel
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
      sign_name
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
        channel
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
        sign_name
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
export const getWhatsapp_node = /* GraphQL */ `
  query GetWhatsapp_node($node_index: Int!) {
    getWhatsapp_node(node_index: $node_index) {
      node_index
      user_id
      whatsapp_id
      node_name
      status
      init
      channel_id
    }
  }
`;
export const listWhatsapp_nodes = /* GraphQL */ `
  query ListWhatsapp_nodes(
    $filter: TableWhatsapp_nodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWhatsapp_nodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        node_index
        user_id
        whatsapp_id
        node_name
        status
        init
        channel_id
      }
      nextToken
    }
  }
`;
export const getMF2TCOUSER = /* GraphQL */ `
  query GetMF2TCOUSER($user_id: Int!) {
    getMF2TCOUSER(user_id: $user_id) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const listMF2TCOUSERS = /* GraphQL */ `
  query ListMF2TCOUSERS(
    $filter: TableMF2TCOUSERFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOUSERS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user_id
        email
        username
        password
        phone
      }
      nextToken
    }
  }
`;
export const queryMF2TCOUSERSByEmailIndex = /* GraphQL */ `
  query QueryMF2TCOUSERSByEmailIndex(
    $email: String!
    $first: Int
    $after: String
  ) {
    queryMF2TCOUSERSByEmailIndex(email: $email, first: $first, after: $after) {
      items {
        user_id
        email
        username
        password
        phone
      }
      nextToken
    }
  }
`;
export const getMF2TCOCUSTOMER = /* GraphQL */ `
  query GetMF2TCOCUSTOMER($customer_id: Int!) {
    getMF2TCOCUSTOMER(customer_id: $customer_id) {
      customer_id
      address
      agents_id
      birthday
      channels
      country
      country_code
      created_at
      customer_name
      email
      first_name
      gender
      last_name
      phone
      tags_id
      team_id
    }
  }
`;
export const listMF2TCOCUSTOMERS = /* GraphQL */ `
  query ListMF2TCOCUSTOMERS(
    $filter: TableMF2TCOCUSTOMERFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOCUSTOMERS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        customer_id
        address
        agents_id
        birthday
        channels
        country
        country_code
        created_at
        customer_name
        email
        first_name
        gender
        last_name
        phone
        tags_id
        team_id
      }
      nextToken
    }
  }
`;
export const getNotesTable = /* GraphQL */ `
  query GetNotesTable($customer_id: Int!, $timestamp: String!) {
    getNotesTable(customer_id: $customer_id, timestamp: $timestamp) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const listNotesTables = /* GraphQL */ `
  query ListNotesTables(
    $filter: TableNotesTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotesTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        customer_id
        timestamp
        message
        user_id
        signed_name
      }
      nextToken
    }
  }
`;
export const getMF2TCOTAG = /* GraphQL */ `
  query GetMF2TCOTAG($tag_id: Int!) {
    getMF2TCOTAG(tag_id: $tag_id) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
export const listMF2TCOTAGS = /* GraphQL */ `
  query ListMF2TCOTAGS(
    $filter: TableMF2TCOTAGFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOTAGS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        tag_id
        tag_name
        create_at
        update_at
      }
      nextToken
    }
  }
`;
