import {observable} from 'mobx';

class Bookstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @observable
    data = [{
        key: '1',
        bookName: 'Segmentationfault',
        bookWriter:'huli',
        bookClass:'青春',
        bookDate:'2018',
        bookPrice: 20,
    }];

    @observable
    uploadBookImg = "";

}

export default Bookstore;
