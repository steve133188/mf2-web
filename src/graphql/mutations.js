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
export const updateMF2TCOMESSAGGE = /* GraphQL */ `
  mutation UpdateMF2TCOMESSAGGE($input: UpdateMF2TCOMESSAGGEInput!) {
    updateMF2TCOMESSAGGE(input: $input) {
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
export const deleteMF2TCOMESSAGGE = /* GraphQL */ `
  mutation DeleteMF2TCOMESSAGGE($input: DeleteMF2TCOMESSAGGEInput!) {
    deleteMF2TCOMESSAGGE(input: $input) {
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
export const createWhatsapp_node = /* GraphQL */ `
  mutation CreateWhatsapp_node($input: CreateWhatsapp_nodeInput!) {
    createWhatsapp_node(input: $input) {
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
export const updateWhatsapp_node = /* GraphQL */ `
  mutation UpdateWhatsapp_node($input: UpdateWhatsapp_nodeInput!) {
    updateWhatsapp_node(input: $input) {
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
export const deleteWhatsapp_node = /* GraphQL */ `
  mutation DeleteWhatsapp_node($input: DeleteWhatsapp_nodeInput!) {
    deleteWhatsapp_node(input: $input) {
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
export const createMF2TCOUSER = /* GraphQL */ `
  mutation CreateMF2TCOUSER($input: CreateMF2TCOUSERInput!) {
    createMF2TCOUSER(input: $input) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const updateMF2TCOUSER = /* GraphQL */ `
  mutation UpdateMF2TCOUSER($input: UpdateMF2TCOUSERInput!) {
    updateMF2TCOUSER(input: $input) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const deleteMF2TCOUSER = /* GraphQL */ `
  mutation DeleteMF2TCOUSER($input: DeleteMF2TCOUSERInput!) {
    deleteMF2TCOUSER(input: $input) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const createMF2TCOCUSTOMER = /* GraphQL */ `
  mutation CreateMF2TCOCUSTOMER($input: CreateMF2TCOCUSTOMERInput!) {
    createMF2TCOCUSTOMER(input: $input) {
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
export const updateMF2TCOCUSTOMER = /* GraphQL */ `
  mutation UpdateMF2TCOCUSTOMER($input: UpdateMF2TCOCUSTOMERInput!) {
    updateMF2TCOCUSTOMER(input: $input) {
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
export const deleteMF2TCOCUSTOMER = /* GraphQL */ `
  mutation DeleteMF2TCOCUSTOMER($input: DeleteMF2TCOCUSTOMERInput!) {
    deleteMF2TCOCUSTOMER(input: $input) {
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
export const createMF2TCOMESSAGEBYLAMBDA = /* GraphQL */ `
  mutation CreateMF2TCOMESSAGEBYLAMBDA($input: CreateMF2TCOMESSAGGEInput!) {
    createMF2TCOMESSAGEBYLAMBDA(input: $input) {
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
export const createNotesTable = /* GraphQL */ `
  mutation CreateNotesTable($input: CreateNotesTableInput!) {
    createNotesTable(input: $input) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const updateNotesTable = /* GraphQL */ `
  mutation UpdateNotesTable($input: UpdateNotesTableInput!) {
    updateNotesTable(input: $input) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const deleteNotesTable = /* GraphQL */ `
  mutation DeleteNotesTable($input: DeleteNotesTableInput!) {
    deleteNotesTable(input: $input) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const createMF2TCOTAG = /* GraphQL */ `
  mutation CreateMF2TCOTAG($input: CreateMF2TCOTAGInput!) {
    createMF2TCOTAG(input: $input) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
export const updateMF2TCOTAG = /* GraphQL */ `
  mutation UpdateMF2TCOTAG($input: UpdateMF2TCOTAGInput!) {
    updateMF2TCOTAG(input: $input) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
export const deleteMF2TCOTAG = /* GraphQL */ `
  mutation DeleteMF2TCOTAG($input: DeleteMF2TCOTAGInput!) {
    deleteMF2TCOTAG(input: $input) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
