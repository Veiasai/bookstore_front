import {observable, action} from 'mobx';

class Userstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    user = {
        Email:[],
        password:[],
        remember:false,
        hasLogin:false,
    };

    @action.bound
    record(value) {
        this.user = {...value};
    }

}

export default Userstore;