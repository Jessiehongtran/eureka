import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../apiConfig';

export default class courseMedium extends React.Component {
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
        try {
            const res = await axios.post(`${API_URL}/course`, course)
            console.log('res in creating page', res.data)
            const courseID = res.data.id
            this.props.history.push(`/course/${courseID}`)
        } catch (err){
            console.error(err)
        }
    }

    render(){
        console.log('medium component')
        return (
            <div>
                <input
                    type="text"
                    placeholder="Course name"
                    name="name"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Course description"
                    name="decription"
                    onChange={this.handleChange}
                />
                <button 
                    onClick={() => this.createPage()}
                >Next</button>
            </div>
        )
    }
}