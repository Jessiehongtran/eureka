import React from 'react';
import { Link } from 'react-router-dom';
import './type.scss'

export default class Type extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            total_cha: 160,
            current_font: 14,
            reduced_count: 1

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({text: e.target.value})

        if (e.target.value.length >= this.state.total_cha){
            this.setState({
                current_font: this.state.current_font - 2,
                total_cha: this.state.total_cha + 30*1.5*this.state.reduced_count,
                reduced_count: this.state.reduced_count + 1
            })
        }
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.history.push('/modules')
    }

    render(){
        const { text } = this.state

        return (
            <>
                <div className="container">
                    <div className="display-site">
                        <div className="text">
                            <p style={{fontSize: this.state.current_font+ 'px'}}>{text}</p>
                        </div>
                    </div>
                    <div className="input-site">
                        <p className="ques">What's your voice as a leader?</p>
                        <input 
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.text}
                        />
                        <button onClick={(e) => this.handleSubmit(e)}>Send</button>
                    </div>
                </div>
                <p><Link to="/modules">Home</Link></p> 
            </>
        )
    }
}