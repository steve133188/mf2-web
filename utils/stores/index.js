import AuthStore from './AuthStore';
import MessageActionsStore from './APIs/MessageActionsStore';
import UsersActionsStore from './APIs/UsersActionsStore';
import ChatListStore from './ChatListStore';
import ContactsStore from './ContactsStore';
import ChatroomStore from './ChatroomStore';
import ORGActionsStore from "./APIs/OrgActionsStore";
import AdminActionsStore from "./APIs/AdminActionsStore";
import DashStore from "./DashStore";
import TagStore from "./TagStore";
import MediaActionsStore from "./APIs/MediaActionsStore";


class RootStore {

    constructor() {
        this.authStore =  new AuthStore(this);
        this.messageActionsStore =  new MessageActionsStore(this);
        this.chatListStore =  new ChatListStore(this);
        this.chatroomStore =  new ChatroomStore(this);
        this.contactsStore = new ContactsStore(this)
        this.usersActionsStore =  new UsersActionsStore(this);
        this.orgActionsStore =  new ORGActionsStore(this);
        this.adminActionsStore = new AdminActionsStore(this);
        this.dashStore = new DashStore(this)
        this.tagStore = new TagStore(this)
        this.mediaActionsStore = new MediaActionsStore(this)
    }

}

export default RootStore
