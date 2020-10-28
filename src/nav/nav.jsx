import React from 'react';
import Search from '../search/search.jsx';
import Menu from '../menu/menu.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './nav.scss'

export default class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="nav">
                <div className="top">
                    <h1 className="logo">Eureka!</h1>
                    <Search />
                    <FontAwesomeIcon
                        icon = {faUserCircle}
                        className="user"
                    />
                </div>
                <div className="below">
                    <Menu />
                </div>
            </div>
        )
    }
}