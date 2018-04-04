import {observable, action, computed} from 'mobx';

class Cartstore {
    @observable
    data = [];
    @observable
    loading = false;

    @observable
    selectedRowKeys = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed get getSelectAccount() {
        let Account = 0;
        let i = 0, len = this.selectedRowKeys.length;
        for (i, len; i < len; i++) {
            Account += this.data[this.selectedRowKeys[i]].bookPrice * this.data[this.selectedRowKeys[i]].bookCount;
        }
        return Account;
    }

    @computed get getAccount() {
        let Account = 0;
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            Account += this.data[i].bookPrice * this.data[i].bookCount;
        }
        return Account;
    }

    @action.bound
    addBook(book) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === book.bookID) {
                return 1;
            }
        }
        this.data.push(book);
        return 0;
    }

    @action.bound
    updateBook(bookID, newbook) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === bookID) {
                this.data[i] = {...this.data[i], ...newbook};
            }
        }
    }

    @action.bound
    deleteBook(bookID) {
        let i = 0, len = this.data.length;
        for (i, len; i < len; i++) {
            if (this.data[i].bookID === bookID) {
                this.data.splice(i, 1);
                break;
            }
        }
    }

    @action.bound
    changeSelection(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
    }

    @action.bound
    deleteSelection() {
        let i = this.selectedRowKeys.length - 1;
        for (i; i >= 0; i--) {
            this.data.splice(this.selectedRowKeys[i],1);
        }
        this.selectedRowKeys = [];
    }
}

export default Cartstore;