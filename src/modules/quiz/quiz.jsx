import React from 'react';
import './quiz.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

export default class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            answers: [],
            questionID : 0,
            answerIDs: [0,0,0,0],
            imgUrl: "",
            showUploadFunc: true
        }
        this.saveQuestion = this.saveQuestion.bind(this)
        this.saveAnswer = this.saveAnswer.bind(this)
        this.updateCorrectAns = this.updateCorrectAns.bind(this)
        this.postQuestion = this.postQuestion.bind(this)
        this.postAnswer = this.postAnswer.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.toggleUploadImage = this.toggleUploadImage.bind(this)
        this.postQuestion = this.postQuestion.bind(this)
    }

    async postQuestion(question){
        try {
            const res= await axios.post('http://localhost:5001/question', {
                question_text: question,
                sessionID: this.props.curSessionID
            })
            console.log('res in creating question', res)
            this.setState({questionID: res.data.id})

        } catch (err){
            console.error(err)
        }
    }

    async updateQuestion(questionID, change){
        try {
            const res= await axios.patch(`http://localhost:5001/question/${questionID}`, change)
            console.log(res)

        } catch (err){
            console.error(err)
        }
    }


    async postAnswer(answer, ind){
        const { questionID, answerIDs } = this.state
        if (questionID !== 0){
            try {
                const res= await axios.post(`http://localhost:5004/questions/${questionID}/answers`, {
                    answer_text: answer,
                    questionID: questionID,
                    isAnswer: false
                    
                })
                answerIDs[parseInt(ind)] = res.data.id 
                this.setState({answerIDs: answerIDs})

            } catch (err){
                console.error(err)
            }
        } else {
            alert("You have not created a question yet")
        }

    }

    async updateAnswer(answerID, change){
        try {
            const res= await axios.patch(`http://localhost:5004/questions/answers/${answerID}`, change)
            console.log(res)

        } catch (err){
            console.error(err)
        }
    }




    saveQuestion(e){
        // this.setState({question: e.target.value})
        //pushe to backend
        const { questionID } = this.state
        if (questionID !== 0){
            this.updateQuestion(questionID, {question_text: e.target.value})
        }
        else {
            this.postQuestion(e.target.value)
        }
        
    }

    saveAnswer(e, ind){
        // this.setState(
        //     {
        //         answers: [
        //             ...this.state.answers,
        //             {
        //                 id: this.state.answers.length + 1,
        //                 text: e.target.value,
        //                 isCorrect: false
        //             }
        //         ],

        //     }
        // )

        // if (ind == 0){
        //     this.setState({answer1ID: this.state.answers.length + 1})
        // }
        // else if (ind == 1){
        //     this.setState({answer2ID: this.state.answers.length + 1})
        // }
        // else if (ind == 2){
        //     this.setState({answer3ID: this.state.answers.length + 1})
        // }
        // else if (ind == 3){
        //     this.setState({answer4ID: this.state.answers.length + 1})
        // }

        //push to backend 
        const { answerIDs } = this.state
        if (answerIDs[parseInt(ind)] !== 0){
            this.updateAnswer(answerIDs[parseInt(ind)], {answer_text: e.target.value})
        }
        else {
            this.postAnswer(e.target.value, ind)
        }

    }

    toggleUploadImage(){
        this.setState({showUploadFunc : !this.state.showUploadFunc})
    }

    updateCorrectAns(e){
        const ansID = parseInt(e.target.value)
        //update in backend this answer is correct
        if (parseInt(ansID) !== 0 ){
            this.updateAnswer(parseInt(ansID), {isAnswer: true})
        } else {
            alert("Please create an answer first")
        }
    }

    handleChangeImage(e){
        console.log('files', e.target.files)
        const img = e.target.files[0]
        var reader = new FileReader();
        reader.readAsDataURL(img)
        reader.onloadend = () => {
            this.setState({imgUrl: reader.result})
        }
        this.toggleUploadImage()


    }

    render(){
        const { question, answerIDs } = this.state
        console.log('question', question)
        console.log('url', this.state.imgUrl)

        return (
            <div className="quiz">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        onBlur= {this.saveQuestion}
                        
                    />
                    {!this.state.showUploadFunc 
                    ? <div className="image-container">
                        <div className="delete-icon">
                            <FontAwesomeIcon
                                icon = {faTimesCircle}
                                onClick={() => this.toggleUploadImage()}
                            />
                        </div>
                        <img src={this.state.imgUrl} className="image-frame" />
                      </div>
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
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 1"
                                onBlur= {e => this.saveAnswer(e,0)}
                            />
                            <input 
                                type="radio"
                                className="check-ans"
                                value={answerIDs[0]}
                                onChange={this.updateCorrectAns}
                            />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 2"
                                onBlur= {e => this.saveAnswer(e,1)}
                                
                            />
                            <input 
                                type="radio"
                                className="check-ans"
                                value={answerIDs[1]}
                                onChange={this.updateCorrectAns}
                            />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 3"
                                onBlur= {e => this.saveAnswer(e,2)}
                            />
                            <input 
                                type="radio"
                                className="check-ans"
                                value={answerIDs[2]}
                                onChange={this.updateCorrectAns}
                            />
                        </div>
                        <div className="each">
                            <input
                                type="text"
                                className="ans-input"
                                placeholder="Answer 4"
                                onBlur= {e => this.saveAnswer(e,3)}
                            />
                             <input 
                                type="radio"
                                className="check-ans"
                                value={answerIDs[3]}
                                onChange={this.updateCorrectAns}
                            />
                        </div>
                    </div>
                    <button className="create-btn">Create</button>
                </div>
            </div>
        )
    }
}