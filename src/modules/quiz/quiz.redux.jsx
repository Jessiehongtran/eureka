import React from 'react';
import './quiz.scss';
import { connect } from 'react-redux';
import { updateQuestion, updateChoice } from '../../duck/actions/quizActions';

class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showUploadFunc: true
        }
    }

    handleChangeQuestion(e, questionID){
        const newQuestion = {
            id: questionID,
            question_text: e.target.value
        }
        this.props.updateQuestion(newQuestion);
    }

    handleChangeAnswer(e, choiceID){
        console.log('here', e.target.value)
        this.props.updateChoice({
            id: choiceID,
            choice_text: e.target.value
        });
    }

    render(){
        const { question, choices } = this.props;

        console.log('question in quiz', question);
        console.log('choices in quiz', choices)

        return (
            <div className="quiz">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        value={question.question_text}
                        onChange={e => this.handleChangeQuestion(e, question.id)}
                        // onBlur= {this.saveQuestion}
                        // disabled={isPublished ? true : false}
                    />
                    <div className="answers">
                        {choices.map(choice => 
                            <div className="each" key={choice.id}>
                                <input
                                    type="text"
                                    className="ans-input"
                                    value={choice.choice_text}
                                    onChange={e=> this.handleChangeAnswer(e, choice.id)}
                                    // onBlur= {e => this.saveChoice(e, choice.id)}
                                    // disabled={isPublished ? true : false}
                                />
                                <input 
                                    type="radio"
                                    className="check-ans"
                                    // onChange={() => this.updateCorrectAns(choice.id)}
                                />
                            </div>)}
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    return {
        sessionID: state.quizReducer.sessionID,
        question: state.quizReducer.question,
        choices: state.quizReducer.choices
    }
}


export default connect(mapStateToProps, {updateQuestion, updateChoice})(Quiz);