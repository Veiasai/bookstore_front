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
    };

    @action.bound
    record(value) {
        this.user = {...value};
    }


    @action.bound
    async submit(values) {
        const smtvalues = values;
        if (this.user.remember === true)
        {
            smtvalues.Email = this.user.Email;
            smtvalues.passive = this.user.password;
        }
        let response = await this.post(smtvalues);

    }

    post(values) {
        let url = `https://api.douban.com/v2/movie/search?q=`;

        return new Promise(function (resolve, reject) {

        });
    }
}

export default Userstore;