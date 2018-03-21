import {store as Bookstore} from './book'
import {store as Classstore} from './home'

class RootStore {
    constructor() {
        this.bookStore = new Bookstore(this)
        this.classStore = new Classstore(this)
    }
}

export default new RootStore();