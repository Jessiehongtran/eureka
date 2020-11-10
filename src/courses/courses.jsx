import React from 'react';
import './courses.scss';
import Course from './course/course.jsx';
import { courseData } from '../data/courseData';


export default class Courses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        return (
            <div className="container">
                <div className="courses-wrapper">
                    <div className="courses">
                        {courseData.length > 0
                        ? courseData.map(course => 
                            <Course 
                                key={course.id} 
                                course={course} 
                                history={this.props.history}
                                setOpenedCourse={this.props.setOpenedCourse}
                            />)
                        : null} 
                    </div>
                </div>
            </div>
        )
    }
}