import {action, computed, observable} from 'mobx';
import {getCartAction, ip, postCartAction, postOrderAction, prefix} from "../constVariable";
import {Control} from 'react-keeper'
import {message} from "antd/lib/index";
import moment from 'moment'

class Cartstore {
    @observable
    data = [];
    @observable
    loading = false;

    @observable
    selectedRowKeys = [];
    @action.bound
    cartPost = async () => {
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
            if (json.code === 403) {
                message.info('登录失效,购物车未能上传');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
        }
        catch (err) {
            message.info('网络异常,购物车未能上传');
        }

    };
    @action.bound
    orderPost = async (books) => {
        const url = prefix + ip + postOrderAction;
        try {
            let order = {};
            order.books = books;
            order.date = moment().format("YYYY-MM-DD");
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(order),
                });
            const json = await response.json();
            if (json.code === 403) {
                message.info('登录失效,订单结算失败');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 400) {
                message.info('订单信息错误');
                this.cartGet();
            }
        }
        catch (err) {
            message.info('网络异常,订单结算失败');
        }
    };
    @action.bound
    cartGet = async () => {
        this.loading = true;
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
        finally {
            this.loading = false;
        }
    };

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
    balanceSelection() {
        let books = [];
        let i = this.selectedRowKeys.length - 1;
        if (i === -1) {
            message.info('空订单');
            return 0;
        }
        for (i; i >= 0; i--) {
            books.push(this.data[this.selectedRowKeys[i]]);
        }
        this.orderPost(books);
        this.deleteSelection();
    }

    @action.bound
    deleteSelection() {
        let i = this.selectedRowKeys.length - 1;
        if (i === -1) {
            return 0;
        }
        for (i; i >= 0; i--) {
            this.data.splice(this.selectedRowKeys[i], 1);
        }
        this.selectedRowKeys = [];
        this.cartPost();
    }
}

export default Cartstore;