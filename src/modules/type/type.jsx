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
            reduced_count: 1,
            question: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
        this.handleBlurQuestion = this.handleBlurQuestion.bind(this)
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

    handleChangeQuestion(e){
        this.setState({question: e.target.value})
    }

    handleBlurQuestion(){
        console.log(this.state.question)
        //post question to backend
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
                        <div className="type-wrapper">
                            <div className="ques">
                                <input
                                    placeholder="Type a question"
                                    type="text"
                                    className="ques-input"
                                    value={this.state.question}
                                    onChange={this.handleChangeQuestion}
                                    onBlur={this.handleBlurQuestion}
                                />
                            </div>
                            <div className="ans">
                                <input 
                                    onChange={this.handleChange}
                                    type="text"
                                    value={this.state.text}
                                    className="ans-input"
                                />
                                <button onClick={(e) => this.handleSubmit(e)}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}