import {observable, action, computed} from 'mobx';
import {getBookAction, getCartAction, ip, postCartAction, postOrderAction, prefix} from "../constVariable";
import {Control} from 'react-keeper'
import {message} from "antd/lib/index";
import moment from 'moment'

class Orderstore {
    @observable
    data = [];
    @observable
    loading = false;

    @action.bound
    cartGet = async () => {
        const url = prefix + ip + getCartAction;
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
            if (json.code === 403) {
                message.info('登录失效');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 200) {
                if (json.books) {
                    let books = json.books;
                    let i = 0, len = books.length;
                    for (i,len; i<len;i++)
                        books[i].bookCount = 1;
                    this.data = books;
                }
            }
        }
        catch (err) {
            message.info('网络异常,购物车加载失败');
        }
    };

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

export default Orderstore;