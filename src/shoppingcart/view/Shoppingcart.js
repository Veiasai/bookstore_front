import React, {Component} from 'react';
import Cartbody from './Cartbody'
import Cartsubmit from './Cartsubmit'

class Shoppingcart extends Component {
    render() {
        return (
            <div>
            <Cartbody/>
            <Cartsubmit/>
            </div>
        )

    }
}

export default Shoppingcart;