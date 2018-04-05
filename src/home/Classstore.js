import {observable} from 'mobx';

class Classstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    catalogue = [
            '文学',
            '哲学',
            '军事',
            '经济',
            '生物科学',
            '工业技术'
        ]
}
export default Classstore;