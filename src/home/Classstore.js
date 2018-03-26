import {observable} from 'mobx';

class Classstore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable
    catalogue = {
        '青春': [
            '校园',
            '爱情',
            '叛逆',
            '悬疑',
            '惊悚',
            '网络',
            '爆笑',
        ],
        '小说': [
            '世界名著',
            '外国小说',
            '中国古典小说',
            '中国现代小说',
            '中国当代小说',
            '历史小说',
            '都市小说',
            '悬疑推理',
            '恐怖惊悚',
            '武侠小说',
            '言情',
        ],
    }
}
export default Classstore;