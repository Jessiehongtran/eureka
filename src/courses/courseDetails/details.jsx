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
        const { openedCourse } = this.props;
        console.log('props in details', this.props)

        return (
                <div className="details">
                    <div className="top">
                        <p className="date">
                            {openedCourse.date}
                        </p>
                        <h2 className="title">
                            {openedCourse.name}
                        </h2>
                    </div>
                    <div className="main">
                        <div className="details">
                            <h3 className="header">
                                Details
                            </h3>
                            <div className="text">
                                {openedCourse.description}
                            </div>
                        </div>
                        <div className="time-venue">
                            <div className="top">
                                <div className="host">
                                    <div className="logo">
                                        <img src={openedCourse.host_logo}/>
                                    </div>
                                    <div className="name">
                                        {openedCourse.host}
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
                                            {openedCourse.date}
                                        </div>
                                        <div className="hour">
                                            {openedCourse.start_time} to {openedCourse.end_time}
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
                                            {/* Link visible for attendees */}
                                            <a 
                                                className="launch-btn"
                                                href={openedCourse.link}
                                            >
                                                Launch
                                            </a>
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