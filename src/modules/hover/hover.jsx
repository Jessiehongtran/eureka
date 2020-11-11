import React from 'react';
import './hover.scss';
import { Link } from 'react-router-dom'

export default class Hover extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div class="box">
                    <div class="box__right">Right → Left</div>
                    <div class="box__left">Left → Right</div>
                    <div class="box__top">Top → Bottom</div>
                    <div class="box__bottom">Bottom → Top</div>
                    <div class="box__center">
                    Hover from any side  
                    </div>
                </div>
            </div>
        )
    }
}