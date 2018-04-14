import {observable, action} from 'mobx';
import {
    deleteUserAction, getBookAction, getUserAction, ip, logoutAction, postUserAction,
    prefix, searchBookAction
} from "../constVariable";
import {Control} from "react-keeper";
import {message} from "antd/lib/index";

class Managerstore {
    userCacheData = [];
    @observable
    userData = [];
    @observable
    userloading = false;
    @observable
    bookData = [{
        key: '1',
        bookName: 'black',
        bookWriter: 'tangji',
        bookClass: '青春',
        bookDate: '2016',
        bookPrice: 25,
        bookStock: 10,
    }];
    @observable
    bookCacheData = [{
        key: '1',
        bookName: 'black',
        bookWriter: 'tangji',
        bookClass: '青春',
        bookDate: '2016',
        bookPrice: 25,
        bookStock: 10,
    }];
    @observable
    bookloading = false;
    @action.bound
    getUser = async () => {
        const url = prefix + ip + getUserAction;
        try {
            const response = await fetch(url,
                {
                    method: "GET",
                    credentials: "include",
                    mode: 'cors',
                });
            const json = await response.json();
            if (json.code === 200) {
                this.userData = json.users;
                this.userCacheData = this.userData.toJS().map(item => ({ ...item }));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
        }
        catch (err) {
            message.info('网络异常');
        }
    };

    @action.bound
    postUser = async (user, newdata) => {
        const url = prefix + ip + postUserAction;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(user)
                });
            const json = await response.json();
            if (json.code === 200) {
                message.info("修改成功");
                this.userCacheData = this.userData.toJS().map(item => ({ ...item }));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                this.userData = this.userCacheData.map(item => ({ ...item }));
                message.info(json.message);
            }
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
    };

    @action.bound
    deleteUser = async (user) => {
        const url = prefix + ip + deleteUserAction;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(user)
                });
            const json = await response.json();
            if (json.code === 200) {
                message.info("修改成功");
                this.userCacheData = this.userData.toJS().map(item => ({ ...item }));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                this.userData = this.userCacheData.map(item => ({ ...item }));
                message.info(json.message);
            }
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
    };

    constructor(rootStore) {
        this.rootStore = rootStore
    }
}

export default Managerstore;
