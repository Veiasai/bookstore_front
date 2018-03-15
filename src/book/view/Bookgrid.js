import { Layout, Menu, Breadcrumb, Icon, Row } from 'antd';
import React,{Component} from 'react';

import Singlebook from './Singlebook'
const temp = [
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道',
    },
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道*2',
    },
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道*3',
    },
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道*4',
    },
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道*5',
    },
    {
        imgsrc:'https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg',
        bookname:'wtf',
        description:'我也不知道*6',
    },
];

class Bookgrid extends Component {
    render() {
        return (
            <Row type="flex" justify="space-around" align="left">
                {
            temp.map((item,i)=> {
                return (
                    <Singlebook key={i} width={300} height={220} description={item['description']}
                                bookname={item['bookname']} imgsrc={item['imgsrc']}/>
                )
            })
                }
            </Row>
        )
    }
}
export default Bookgrid;