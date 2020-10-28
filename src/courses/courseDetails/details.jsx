import React from 'react';
import './details.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';


export default class Details extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){

        return (
                <div className="details">
                    <div className="top">
                        <p className="date">Friday, November 6, 2020</p>
                        <h2 className="title">Online: Book Club Meeting</h2>
                    </div>
                    <div className="main">
                        <div className="details">
                            <h3 className="header">Details</h3>
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor amet fermentum. Nullam venenatis erat id vehicula ultrices sed ultricies condimentum. Magna sed etiam consequat, et lorem adipiscing sed nulla. Volutpat nisl et tempus et dolor libero, feugiat magna tempus, sed et lorem adipiscing.
                                <br/>Vehicula ultrices dolor amet ultricies et condimentum. Magna sed etiam consequat, et lorem adipiscing sed dolor sit amet, consectetur amet do eiusmod tempor incididunt ipsum suspendisse ultrices gravida.
                                <br/>Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam sed facilisis ante interdum congue. Integer mollis, nisl amet convallis, porttitor magna ullamcorper, amet mauris. Ut magna finibus nisi nec lacinia ipsum maximus.
                            </div>
                        </div>
                        <div className="time-venue">
                            <div className="top">
                                <div className="host">
                                    <div className="logo">
                                        <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1603918916/amp-creative-squarelogo-1531353023574_h4fl7l.png"/>
                                    </div>
                                    <div className="name">
                                        AMP Creative
                                    </div>
                                </div>
                            </div>
                            <div className="down">
                                <div className="time">
                                    <div className="icon">
                                        <FontAwesomeIcon
                                            icon = {faClock}
                                            className="awe-icon"
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="date">
                                            Friday, November 6, 2020
                                        </div>
                                        <div className="hour">
                                            10:00PM to 11:00PM PST
                                        </div>
                                    </div>
                                </div>
                                <div className="venue">
                                    <div className="icon">
                                        <FontAwesomeIcon
                                            icon = {faLocationArrow}
                                            className="awe-icon"
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="name">
                                            Online training
                                        </div>
                                        <div className="link">
                                            Link visible for attendees
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}