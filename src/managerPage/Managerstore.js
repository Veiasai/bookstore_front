import {observable} from 'mobx';

class Managerstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    userData= [
        {
            key: '1',
            userName: 'black',
            userEmail:'tangji@qq.com',
            userValid:1,
            userAccount:2000,
        }, {
            key: '2',
            userName: 'bk',
            userEmail:'ji@qq.com',
            userValid:0,
            userAccount:2000,
        }, {
            key: '3',
            userName: 'white',
            userEmail:'tqq@qq.com',
            userValid:1,
            userAccount:1000,
        }
    ];

    @observable
    userloading = false;
    
    @observable
    bookData = [{
        key: '1',
        bookName: 'black',
        bookWriter:'tangji',
        bookClass:'青春',
        bookDate:'2016',
        bookPrice: 25,
        bookStock: 10,
    }, {
        key: '2',
        bookName: 'wtf',
        bookWriter:'tangji',
        bookClass:'校园',
        bookDate:'2018',
        bookPrice: 19,
        bookStock: 10,
    }, {
        key: '3',
        bookName: 'overflow',
        bookWriter:'tangji',
        bookClass:'青春',
        bookDate:'2017',
        bookPrice: 32,
        bookStock: 10,
    }, {
        key: '4',
        bookName: 'Segmentationfault',
        bookWriter:'huli',
        bookClass:'青春',
        bookDate:'2018',
        bookPrice: 20,
        bookStock: 10,
    }, {
        key: '5',
        bookName: 'Segmentationfault',
        bookWriter:'huli',
        bookClass:'青春',
        bookDate:'2018',
        bookPrice: 20,
        bookStock: 10,
    }, {
        key: '6',
        bookName: 'Segmentationfault',
        bookWriter:'huli',
        bookClass:'青春',
        bookDate:'2018',
        bookPrice: 20,
        bookStock: 10,
    }];
    
    @observable
    bookloading = false;
}

export default Managerstore;
