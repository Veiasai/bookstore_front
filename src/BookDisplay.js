import React,{Component} from 'react';
import { Carousel} from 'antd';

const test = [
    'biyao.jpeg',
    'mxd.jpg',
    'yunzhong.jpg',
];

class BookDisplay extends Component {
    render() {
        return (
            <Carousel autoplay effect="fade">
                {
                    test.map((item,i)=> {
                        return (
                            <div key={i}>
                                <img style={{width:1500 ,height:600}} src={item} alt="loading" />
                            </div>
                        )
                    })
                }
            </Carousel>
        )
    }
}

export default BookDisplay;