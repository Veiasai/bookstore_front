import {observable, action} from 'mobx';
import {deleteBookActionM, ip, postBookActionM, prefix, searchBookAction, searchBookActionM} from "../constVariable";
import {message} from "antd/lib/index";

class Bookstore {
    cacheData = [];
    @observable
    data = [];
    @observable
    uploadBookImg = "";
    @observable
    loading = false;
    @observable
    pagination = 50;
    @observable
    priceRange = [1, 999];
    @observable
    dateRange = null;
    @observable
    bookClass = null;
    @observable
    classCatalogue = [
        '全部',
        '文学',
        '哲学',
        '军事',
        '经济',
        '生物科学',
        '工业技术'
    ];
    notinit = true;

    @action.bound
    searchbook = async (conditions, manager) => {
        let urlaction = searchBookAction;
        if (manager)
        {
            urlaction = searchBookActionM;
        }
        const url = prefix + ip + urlaction;
        this.loading = true;
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(conditions),
                });

            const json = await response.json();
            if (json.code === 200) {
                this.data = json.books;
            }
        }
        catch (err) {
            message.info('网络异常');
        }
        this.loading = false;
    };

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action.bound
    getbookbyid(bookid) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID = bookid)
                return this.data[i];
        }
    }

    @action.bound
    init() {
        if (this.notinit) {
            this.searchbook({});
            this.notinit = false;
        }
    }


}

export default Bookstore;
