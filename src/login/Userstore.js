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
        username:"",
        email:"",
        password:"",
        hasLogin:false,
        level:0,
    };


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
            this.user.hasLogin = false;
            Control.go('/', {name: 'React-Keeper'});
        }
        catch (err) {
            message.info('网络异常');
        }
    }

}

export default Userstore;