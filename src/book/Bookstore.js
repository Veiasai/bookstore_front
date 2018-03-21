import {observable, action} from 'mobx';

class Bookstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @observable
    data = [{
        key: '1',
        bookname: 'black',
        writer:'tangji',
        class:'青春',
        date:'2016',
        price: 25,
        description: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        bookname: 'wtf',
        writer:'tangji',
        class:'校园',
        date:'2018',
        price: 19,
        description: 'New York No. 1 Lake Park',
    }, {
        key: '3',
        bookname: 'overflow',
        writer:'tangji',
        class:'青春',
        date:'2017',
        price: 32,
        description: 'New York No. 1 Lake Park',
    }, {
        key: '4',
        bookname: 'Segmentationfault',
        writer:'huli',
        class:'青春',
        date:'2018',
        price: 20,
        description: 'New York No. 1 Lake Park',
    }, {
        key: '5',
        bookname: 'Segmentationfault',
        writer:'huli',
        class:'青春',
        date:'2018',
        price: 20,
        description: 'New York No. 1 Lake Park',
    }, {
        key: '6',
        bookname: 'Segmentationfault',
        writer:'huli',
        class:'青春',
        date:'2018',
        price: 20,
        description: 'New York No. 1 Lake Park',
    }];

    @action changeTodoTitle({index,title}){
        this.data[index].class = title
    }
}

export default Bookstore;
