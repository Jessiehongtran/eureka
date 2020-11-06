import React from 'react';
import './quiz.scss'

export default class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            answers: []
        }
        this.saveQuestion = this.saveQuestion.bind(this)
        this.saveAnswer = this.saveAnswer.bind(this)
    }

    saveQuestion(e){
        this.setState({question: e.target.value})
    }

    saveAnswer(e){
        this.setState(
            {
                answers: [
                    ...this.state.answers,
                    {
                        text: e.target.value,
                        isCorrect: false
                    }
                ]
            }
        )
    }

    render(){
        const { question } = this.state
        console.log('question', question)

        return (
            <div className="quiz">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        onBlur= {this.saveQuestion}
                    />
                    <div className="image">
                        <p>Image goes here</p>
                    </div>
                    <div className="answers">
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 1"
                                onBlur= {this.saveAnswer}
                            />
                            <input 
                                type="radio"
                                className="check-ans"
                            />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 2"
                                onBlur= {this.saveAnswer}
                            />
                            <input 
                                    type="radio"
                                    className="check-ans"
                                />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 3"
                                onBlur= {this.saveAnswer}
                            />
                            <input 
                                    type="radio"
                                    className="check-ans"
                                />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 4"
                                onBlur= {this.saveAnswer}
                            />
                             <input 
                                    type="radio"
                                    className="check-ans"
                                />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}