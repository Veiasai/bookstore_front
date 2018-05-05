import {action, observable} from 'mobx';
import {ip, loginAction, logoutAction, prefix} from "../constVariable";
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

    @observable
    loading = false;


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
            if (json.code === 200)
            {
                this.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'});
            }
        }
        catch (err) {
            message.info('网络异常');
        }
    };

    @action.bound
    login = async (values) => {
        const url = prefix + ip + loginAction;
        if (values !== null)
            this.loading = true;
        let user = {
            email: {},
            password: {}
        };
        user = {...values};

        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(user),
                });

            const json = await response.json();
            if (json.code === 200) {
                json.user.hasLogin = true;
                this.record(json.user);
                message.info('登录成功');
                Control.go('/', {name: 'React-Keeper'})
            }
            else {
                if (values !== null)
                    message.info(json.message);
            }
        }
        catch (err) {
            if (values !== null)
                message.info('网络异常');
        }
        this.loading = false;
    };

}

export default Userstore;