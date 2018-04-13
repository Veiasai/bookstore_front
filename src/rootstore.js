import {store as Bookstore} from './booktable'
import {store as Userstore} from './login'
import {store as Cartstore} from './shoppingcart'
import {store as Managerstore} from './managerPage'
import {store as Orderstore} from './orders'
class RootStore {
    constructor() {
        this.bookStore = new Bookstore(this);
        this.userStore = new Userstore(this);
        this.cartStore = new Cartstore(this);
        this.managerStore = new Managerstore(this);
        this.orderStore = new Orderstore(this);
    }
}

export default new RootStore();