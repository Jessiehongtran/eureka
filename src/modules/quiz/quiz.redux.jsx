import React from 'react';
import './quiz.scss';
import { connect } from 'react-redux';
import { changeQuestion, updateQuestion, changeChoiceCorrect, postQuestion, updateChoice, postChoice, changeChoice } from '../../duck/actions/quizActions';

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
            question_text: e.target.value,
            sessionID: this.props.sessionID
        }
        this.props.changeQuestion(newQuestion);
    }

    handleBlurQuestion(e, questionID){
        console.log('questionID', questionID)
        if (questionID !== 0){
            const newQuestion = {
                id: questionID,
                question_text: e.target.value,
                sessionID: this.props.sessionID
            }
            this.props.updateQuestion(newQuestion);
        } else {
            const newQuestion = {
                question_text: e.target.value,
                sessionID: this.props.sessionID
            }
            this.props.postQuestion(newQuestion);
        }
    }

    handleBlurAnswer(e, choiceID, sessionID){
        if (sessionID !== 0){
            const newChoice = {
                id: choiceID,
                choice_text: e.target.value,
                sessionID: sessionID
            }
            this.props.updateChoice(newChoice)
        } else {
            if (e.target.value.length > 0){
                const newChoice = {
                    choice_text: e.target.value,
                    sessionID: this.props.sessionID
                }
                this.props.postChoice(newChoice)
            } else {
                alert('Please type your answer first')
            }
        }
    }

    handleChangeAnswer(e, choiceID){
        this.props.changeChoice({
            id: choiceID,
            choice_text: e.target.value
        });
    }

    updateCorrectAns(choiceID, curCorrectStatus, choiceText){
        if (choiceText.length !== 0){
            this.props.changeChoiceCorrect({
                id: choiceID,
                isCorrect: !curCorrectStatus
            });
        } else {
            alert("Please type your answer first")
        }
    }

    render(){
        const { question, choices } = this.props;

        return (
            <div className="quiz">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        value={question.question_text}
                        onChange={e => this.handleChangeQuestion(e, question.id)}
                        onBlur= {e => this.handleBlurQuestion(e, question.id)}
                        // disabled={isPublished ? true : false}
                    />
                    <div className="answers">
                        {choices.map(choice => 
                            <div className="each" key={choice.id}>
                                <input
                                    type="text"
                                    className="ans-input"
                                    placeholder="Type answer"
                                    value={choice.choice_text}
                                    onChange={e=> this.handleChangeAnswer(e, choice.id)}
                                    onBlur= {e => this.handleBlurAnswer(e, choice.id, choice.sessionID)}
                                    // disabled={isPublished ? true : false}
                                />
                                <input 
                                    type="radio"
                                    className="check-ans"
                                    checked={choice.isCorrect ? true : false}
                                    // checked={choice.isCorrect ? true : false}
                                    onChange={() => this.updateCorrectAns(choice.id, choice.isCorrect, choice.choice_text)}
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


export default connect(mapStateToProps, {updateQuestion, changeChoiceCorrect, changeChoice, postQuestion, changeQuestion, updateChoice, postChoice })(Quiz);