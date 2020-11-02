import React from 'react';
import './transition.scss'

export default class Scroll extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div className="expand">
                    
                </div>
                <div className="magic">
                    <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1603838415/What-is-perspective-taking-basics-and-benefits-980x653_welev3.jpg"/>
                    <div className="appear">
                        {/* <p>Scroll over here, something'll come up!</p> */}
                        <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1603819869/Cover_ManageUB-Training-Deck-1_yaamsg.png"/>
                    </div>
                </div>
            </div>
        )
    }
}