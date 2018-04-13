import {observable, action, computed} from 'mobx';
import {
    getBookAction, getCartAction, getOrderAction, ip, postCartAction, postOrderAction,
    prefix, searchOrderAction
} from "../constVariable";
import {Control} from 'react-keeper'
import {message} from "antd/lib/index";
import moment from 'moment'

class Orderstore {
    @observable
    orders = [];
    @observable
    loading = false;
    @observable
    dateRange = null;

    @action.bound
    orderSearch = async (conditions) => {
        this.loading = true;
        const url = prefix + ip + searchOrderAction;
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
            if (json.code === 403) {
                message.info('登录失效');
                this.rootStore.userStore.user.hasLogin = false;

                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 200) {
                if (json.orders) {
                    this.orders = json.orders;
                }
            }
        }
        catch (err) {
            message.info('网络异常,订单加载失败');
        }
        finally {
            this.loading = false;
        }
    };

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

export default Orderstore;