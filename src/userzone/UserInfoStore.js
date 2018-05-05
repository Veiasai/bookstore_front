import {action, observable} from 'mobx';
import {getUserInfoAction, ip, postUserInfoAction, prefix} from "../constVariable";
import {Control} from "react-keeper";
import {message} from "antd/lib/index";

class UserInfoStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @observable
    avatar = "";
    @observable
    favoriteBook = "";
    @observable
    loading = false;

    @action.bound
    getData = async ()=> {
        this.loading = true;
        const url = prefix + ip + getUserInfoAction;
        try {
            const response = await fetch(url,
                {
                    method: "GET",
                    credentials: "include",
                    mode: 'cors',
                });
            const json = await response.json();
            if (json.code === 403) {
                message.info('登录失效');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 200) {
                this.avatar = json.avatar;
                this.favoriteBook = json.favoriteBook;
            }
        }
        catch (err) {
            message.info('网络异常');
        }
        finally {
            this.loading = false;
        }
    };

    @action.bound
    postData = async (imageUrl, type)=> {
        const url = prefix + ip + postUserInfoAction;
        let body = {
            imageUrl: imageUrl,
            type: type
        };
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(body)
                });
            const json = await response.json();
            if (json.code === 403) {
                message.info('登录失效');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 200) {
                if (json.avatar)
                    this.avatar = json.avatar;
                if (json.favoriteBook)
                    this.favoriteBook = json.favoriteBook;
                message.info("上传成功");
            }
        }
        catch (err) {
            message.info('网络异常');
        }
    }


}

export default UserInfoStore;