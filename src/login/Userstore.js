import {observable, action} from 'mobx';

class Userstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    user = {
        username:[],
        email:[],
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