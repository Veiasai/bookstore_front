import {observable, action} from 'mobx';
import {Control} from "react-keeper";
import {ip, prefix, searchBookAction} from "../constVariable";
import {message} from "antd/lib/index";

class Bookstore {
    @observable
    data = [];
    @observable
    uploadBookImg = "";
    @observable
    loading = false;
    @observable
    pagination = 50;

    @action.bound
    searchbook = async (conditions) => {
        const url = prefix + ip + searchBookAction;
        this.loading = true;
        console.log(conditions);
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
            console.log(json);
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
        if (this.data.length === 0) {
            this.searchbook({});
        }
    }


}

export default Bookstore;
