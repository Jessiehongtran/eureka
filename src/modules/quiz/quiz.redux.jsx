import React from 'react';
import './quiz.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { changeQuestion, updateQuestion, changeChoiceCorrect, postQuestion, updateChoice, postChoice, changeChoice, updateUploadStatus, postImage, removeImage } from '../../duck/actions/quizActions';

class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showUploadFunc: true
        }
        this.handleChangeImage = this.handleChangeImage.bind(this)
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

    handleChangeImage(e){
        const img = e.target.files[0]
        this.props.updateUploadStatus({
            showUploadFunc: false,
            image_uploading: true
        })

        const formData = new FormData()
        formData.append(0, img)
        this.props.postImage(formData, this.props.sessionID)
    }

    render(){

        const { question, choices, image, showUploadFunc, image_uploading } = this.props;

        console.log('props in quiz', this.props)

        return (
            <div className="quiz">
                 {this.props.order_number 
                 ? <h1 style={{color: 'silver', textAlign: 'left', width: '100%', left: '25%', top: '10px', position: 'absolute'}}>#{this.props.order_number}</h1>
                 : null}
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
                    {!showUploadFunc 
                    ? !image_uploading
                      ? <div className="image-container">
                            <div className="delete-icon">
                                <FontAwesomeIcon
                                    icon = {faTimesCircle}
                                    onClick={() => this.props.removeImage(image.id)}
                                />
                            </div>
                            <img 
                                src={image.image_url} 
                            className="image-frame" />
                        </div>
                      : <p>loading the image...</p>
                    : <div className="image">
                        <p>Image goes here</p>
                        <label className="upload">
                            <input 
                                type="file"
                                className="upload-input"
                                onChange={this.handleChangeImage}
                            />
                            Upload image
                        </label>
                    </div>
                    }
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
    console.log('state in quiz', state)
    return {
        sessionID: state.quizReducer.sessionID,
        question: state.quizReducer.question,
        choices: state.quizReducer.choices,
        image: state.quizReducer.image,
        showUploadFunc: state.quizReducer.showUploadFunc,
        image_uploading: state.quizReducer.image_uploading
    }
}


export default connect(mapStateToProps, {updateQuestion, changeChoiceCorrect, changeChoice, postQuestion, changeQuestion, updateChoice, postChoice, updateUploadStatus, postImage, removeImage })(Quiz);