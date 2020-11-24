import React from 'react';
// import axios from 'axios';
// import { API_URL } from '../../../apiConfig';
import { connect } from 'react-redux';
import './course.medium.scss';
import { createCourse } from '../../../duck/actions/courseActions';


class courseMedium extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async createPage(){
        const { name, description } = this.state;
        const course = {
            course_name: name,
            description: description,
            userID: 1
        };
        this.props.createCourse(course, this.props.history)
    }

    render(){
        console.log('medium component')
        return (
            <div className="medium">
                <div className="wrapper">
                    <input
                        type="text"
                        placeholder="Course name"
                        name="name"
                        className="course-name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Course description"
                        name="decription"
                        className="course-description"
                        onChange={this.handleChange}
                    />
                    <button 
                        onClick={() => this.createPage()}
                    >Next</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       state
    }
}

export default connect(mapStateToProps, { createCourse })(courseMedium);