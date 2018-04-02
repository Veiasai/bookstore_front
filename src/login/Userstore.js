import {observable, action} from 'mobx';

class Userstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    user = {
        username:"Veia",
        email:[],
        password:[],
        remember:false,
        hasLogin:true,
        level:1,
    };

    @observable
    userInfo ={
        userIcon:[{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://raw.githubusercontent.com/Veiasai/pictures/master/%E7%A2%A7%E7%91%B6.jpeg',
        }]
    };

    @action.bound
    setUserIcon(userIcon) {
        this.userInfo.userIcon = userIcon;
    }

    @action.bound
    record(value) {
        this.user = {...value};
    }

}

export default Userstore;