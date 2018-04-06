import {observable, action, computed} from 'mobx';
import {getBookAction, ip, postCartAction, prefix} from "../constVariable";
import {Control} from 'react-keeper'
import {message} from "antd/lib/index";

class Cartstore {
    @observable
    data = [];
    @observable
    loading = false;

    @observable
    selectedRowKeys = [];


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed get getSelectAccount() {
        let Account = 0;
        let i = 0, len = this.selectedRowKeys.length;
        for (i, len; i < len; i++) {
            Account += this.data[this.selectedRowKeys[i]].bookPrice * this.data[this.selectedRowKeys[i]].bookCount;
        }
        return Account;
    }

    @computed get getAccount() {
        let Account = 0;
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            Account += this.data[i].bookPrice * this.data[i].bookCount;
        }
        return Account;
    }

    @computed get getCart() {
        let bookIDs = [];
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            bookIDs.push(this.data[i].bookID);
        }
        return bookIDs;
    }

    @action.bound
    addBook(book) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === book.bookID) {
                return 1;
            }
        }
        this.data.push(book);
        this.cartPost();
        return 0;
    }

    @action.bound
    updateBook(bookID, newbook) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === bookID) {
                this.data[i] = {...this.data[i], ...newbook};
            }
        }
    }

    @action.bound
    deleteBook(bookID) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === bookID) {
                this.data.splice(i, 1);
                break;
            }
        }
        this.cartPost();
    }

    @action.bound
    changeSelection(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
    }

    @action.bound
    deleteSelection() {
        let i = this.selectedRowKeys.length - 1;
        for (i; i >= 0; i--) {
            this.data.splice(this.selectedRowKeys[i],1);
        }
        this.selectedRowKeys = [];
        this.cartPost();
    }

    @action.bound
    cartPost = async ()=> {
        const url = prefix + ip + postCartAction;
        try {
            let body = {};
            body.bookIDs = this.getCart;
            console.log(body);
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(body),
                });
            const json = await response.json();
            console.log(json);
            if (json.code === 403)
            {
                message.info('登录失效,购物车未能上传');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
        }
        catch (err) {
            message.info('网络异常,购物车未能上传');
        }

    }
}

export default Cartstore;