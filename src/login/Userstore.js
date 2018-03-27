import {observable, action} from 'mobx';

class Userstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    user = {
        nickname:[],
        Email:[],
        password:[],
        remember:false,
        hasLogin:false,
        level:0,
    };

    @action.bound
    record(value) {
        this.user = {...value};
    }

}

export default Userstore;