class People { 

    constructor(name = "", profileURL = "", company = "", profileData = "", messageList = [], ID = 2720) {
        this.name = name;
        this.profileURL = profileURL;
        this.company = company;
        this.profileData = profileData;
        this.messageList = messageList;
        this.ID = ID;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getProfileURL() {
        return this.profileURL;
    }

    setProfileURL(profileURL) {
        this.profileURL = profileURL;
    }

    getCompany() {
        return this.company;
    }

    setCompany(company) {
        this.company = company;
    }

    getProfileData() {
        return this.profileData;
    }

    setProfileData(profileData) {
        this.profileData = profileData;
    }

    getMessageList() {
        return this.messageList;
    }

    setMessageList(messageList) {
        this.messageList = messageList;
    }

    addMessage(message) {
        this.messageList.push(message);
    }

    removeMessage(message) {
        const index = this.messageList.indexOf(message);
        if (index > -1) {
            this.messageList.splice(index, 1);
        }
    }

    getID() {
        return this.ID;
    }

    setID(ID) {
        this.ID = ID;
    }
}
