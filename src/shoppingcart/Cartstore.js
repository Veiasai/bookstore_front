import {observable, action} from 'mobx';

class Cartstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    data = [];

    @action.bound
    addBook(book){
        let i = 0, len=this.data.length;
        for (i,len; i<len; i++)
        {
            if (this.data[i].bookID === book.bookID)
            {
                return 1;
            }
        }
        this.data.push(book);
        return 0;
    }

    @action.bound
    updateBook(bookID, newbook) {
        let i = 0, len=this.data.length;
        for (i,len; i<len; i++)
        {
            if (this.data[i].bookID === bookID)
            {
                this.data[i] = {...newbook};
            }
        }
    }

    @action.bound
    deleteBook(bookID) {
        let i = 0, len=this.data.length;
        console.log("delete2", bookID);
        for (i,len; i<len; i++)
        {
            if (this.data[i].bookID === bookID)
            {
                this.data.splice(i,1);
                console.log("delete3", bookID);
                break;
            }
        }
    }
}

export default Cartstore;