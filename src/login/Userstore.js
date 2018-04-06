import {observable, action} from 'mobx';
import {ip, logoutAction, postCartAction, prefix} from "../constVariable";
import {Control} from "react-keeper";
import {message} from "antd/lib/index";

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
        hasLogin:false,
        level:0,
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

    @action.bound
    logout = async ()=> {
        const url = prefix + ip + logoutAction;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: "{}",
                });
            const json = await response.json();
            console.log(json);
            this.user.hasLogin = false;
            Control.go('/', {name: 'React-Keeper'})
        }
        catch (err) {
            message.info('网络异常');
        }
    }

}

export default Userstore;