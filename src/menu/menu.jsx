import React from 'react';
import './menu.scss'

export default class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="menu">
                <ul>
                    <li><a href="">All</a></li>
                    <li><a href="">Education</a></li>
                    <li><a href="">Media</a></li>
                    <li><a href="">Business</a></li>
                    <li><a href="">Technology</a></li>
                </ul>
            </div>
        )
    }
}