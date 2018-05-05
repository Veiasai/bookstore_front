import {action, computed, observable} from 'mobx';
import {
    deleteBookActionM, deleteUserActionM, getSaleRecordActionM, getUserActionM, ip, postBookActionM,
    postUserActionM, prefix
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
    saleRecord = [];
    @observable
    saleRecordLoading = false;
    @observable
    saleRecordSearch = {
        bookWriter: null,
        dateRange: null,
        bookClass: null,
        userID: null,
        bookID: null,
    };

    @computed
    get getTotalCount() {
        let TotalCount = 0;
        for (let i = 0, len = this.saleRecord.length; i< len; i++)
        {
            TotalCount += this.saleRecord[i].bookCount;
        }
        return TotalCount;
    }

    @computed
    get getTotalPrice() {
        let TotalPrice = 0;
        for (let i = 0, len = this.saleRecord.length; i< len; i++)
        {
            TotalPrice += this.saleRecord[i].bookCount * this.saleRecord[i].bookPrice;
        }
        return TotalPrice;
    }

    @action.bound
    getUser = async () => {
        const url = prefix + ip + getUserActionM;
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
                this.userCacheData = this.userData.toJS().map(item => ({...item}));
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
    postUser = async (user) => {
        const url = prefix + ip + postUserActionM;
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
                this.userCacheData = this.userData.toJS().map(item => ({...item}));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                this.userData = this.userCacheData.map(item => ({...item}));
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
        const url = prefix + ip + deleteUserActionM;
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
                this.userCacheData = this.userData.toJS().map(item => ({...item}));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                this.userData = this.userCacheData.map(item => ({...item}));
                message.info(json.message);
            }
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
    };

    @action.bound
    getSaleRecord = async (values) => {
        this.saleRecordLoading = true;
        const url = prefix + ip + getSaleRecordActionM;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(values)
                });
            const json = await response.json();
            if (json.code === 200) {
                this.saleRecord = json.records;
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                message.info(json.message);
            }
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
        finally {
            this.saleRecordLoading = false;
        }
    };
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @action.bound
    postBook = async (book, del) => {
        let urlaction = postBookActionM;
        if (del)
        {
            urlaction = deleteBookActionM;
        }
        const url = prefix + ip + urlaction;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(book)
                });
            const json = await response.json();
            if (json.code === 200) {
                message.info("修改成功");
                this.rootStore.bookStore.cacheData = this.rootStore.bookStore.data.toJS().map(item => ({...item}));
            }
            else if (json.code === 403) {
                message.info("没有登录或没有管理员权限");
                Control.go('/', {name: 'React-Keeper'});
            }
            else if (json.code === 400) {
                this.rootStore.bookStore.data = this.rootStore.bookStore.cacheData.map(item => ({...item}));
                message.info(json.message);
            }
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
    };
}

export default Managerstore;
