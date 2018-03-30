import {store as Bookstore} from './booktable'
import {store as Classstore} from './home'
import {store as Userstore} from './login'
import {store as Cartstore} from './shoppingcart'
class RootStore {
    constructor() {
        this.bookStore = new Bookstore(this);
        this.classStore = new Classstore(this);
        this.userStore = new Userstore(this);
        this.cartStore = new Cartstore(this);
    }
}

export default new RootStore();