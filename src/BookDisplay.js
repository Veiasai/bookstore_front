import React,{Component} from 'react';
import { Carousel} from 'antd';

const test = [
    'https://raw.githubusercontent.com/Veiasai/pictures/master/%E7%A2%A7%E7%91%B6.jpeg',
    'https://raw.githubusercontent.com/Veiasai/pictures/master/mxd.jpg',
    'https://raw.githubusercontent.com/Veiasai/pictures/master/%E5%80%92%E5%BD%B1.jpg',
    'https://raw.githubusercontent.com/Veiasai/pictures/master/%E4%BA%91%E9%92%9F.jpg',
];

class BookDisplay extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <Carousel autoplay effect="fade">
                {
                    test.map((item,i)=> {
                        return (
                            <div >
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