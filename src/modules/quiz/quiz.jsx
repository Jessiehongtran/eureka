import React from 'react';
import './quiz.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { API_URL } from '../../apiConfig';

export default class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            choices: [
                {
                    id: 1,
                    choice_text: "Answer 1",
                    isCorrect: false
                },
                {
                    id: 2,
                    choice_text: "Answer 2",
                    isCorrect: false
                },
                {
                    id: 3,
                    choice_text: "Answer 3",
                    isCorrect: false
                },
                {
                    id: 4,
                    choice_text: "Answer 4",
                    isCorrect: false
                }
            ],
            imgUrl: "",
            showUploadFunc: true
        }
        this.saveQuestion = this.saveQuestion.bind(this)
        this.saveChoice = this.saveChoice.bind(this)
        this.updateCorrectAns = this.updateCorrectAns.bind(this)
        this.postQuestion = this.postQuestion.bind(this)
        this.postChoice = this.postChoice.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.toggleUploadImage = this.toggleUploadImage.bind(this)
        this.postQuestion = this.postQuestion.bind(this)
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
    }

    componentDidMount(){
        this.getQuestion(this.props.sessionID);
        this.getChoices(this.props.sessionID)
    }

    async postQuestion(question){
        try {
            const res= await axios.post(`${API_URL}/question`, {
                question_text: question,
                sessionID: this.props.sessionID
            })
            this.setState({questionID: res.data.id})

        } catch (err){
            console.error(err)
        }
    }

    async updateQuestion(questionID, change){
        try {
            const res= await axios.patch(`${API_URL}/question/${questionID}`, change)

        } catch (err){
            console.error(err)
        }
    }


    async postChoice(answer, ind){
        const { questionID, answerIDs } = this.state
        if (questionID !== 0){
            try {
                const res= await axios.post(`${API_URL}/choice`, {
                    choice_text: answer,
                    sessionID: this.props.sessionID,
                    isCorrect: false
                    
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

    async getQuestion(sessionID){
        try {
            const res = await axios.get(`${API_URL}/question/session/${sessionID}`)
            this.setState({question: res.data})
        } catch (err){
            console.error(err)
        }
    }

    async getChoices(sessionID){
        try {
            const res = await axios.get(`${API_URL}/choice/session/${sessionID}`)
            this.setState({choices: res.data})
        } catch (err){
            console.error(err)
        }
    }

    async updateChoice(answerID, change){
        try {
            const res = await axios.patch(`${API_URL}/choice/${answerID}`, change)
        } catch (err){
            console.error(err)
        }
    }

    async findAChoice(choiceID){
        let choice = null
        try {
            const res= await axios.get(`${API_URL}/choice/${choiceID}`)
            choice = res.data
        } catch (err){
            console.error(err)
        }
        return choice
    }

    saveQuestion(e){
        //pushe to backend
        const { question } = this.state
        if (question.id){
            this.updateQuestion(question.id, {question_text: e.target.value})
        }
        else {
            this.postQuestion(e.target.value)
        }
        
    }


    async saveChoice(e, ind){
        //push to backend 
        //find the answer if it exists on backend first, if yes, update, else post
        const choice = await this.findAChoice(ind)
        if (choice !== undefined){
            this.updateChoice(ind, {choice_text: e.target.value})
        }
        else {
            this.postAnswer(e.target.value, ind)
        }

    }



    toggleUploadImage(){
        this.setState({showUploadFunc : !this.state.showUploadFunc})
    }

    async updateCorrectAns(ansID){
        //update in backend this answer is correct
        //find if answer exists in backend first, if yes, update, else alert to create answer
        const choice = await this.findAChoice(ansID)
        if (choice !== undefined){
            this.updateChoice(parseInt(ansID), {isCorrect: true})
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

    handleChangeAnswer(e, ind){
        //should be updating answers regardless
        const { choices } = this.state;
        const theChoice = choices.filter(choice => choice.id === ind)[0]
        theChoice.choice_text = e.target.value;
        this.setState({
            choices: choices
        })
    }

    handleChangeQuestion(e){
        this.setState({
            question: {
                ...this.state.question,
                question_text: e.target.value
            }
        })
    }

    render(){
        const { question, choices } = this.state;

        return (
            <div className="quiz">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        value={question.question_text}
                        onChange={this.handleChangeQuestion}
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
                        {choices.map(choice => 
                            <div className="each" key={choice.id}>
                                <input
                                    type="text"
                                    className="ans-input"
                                    value={choice.choice_text}
                                    onChange={e=> this.handleChangeAnswer(e, choice.id)}
                                    onBlur= {e => this.saveChoice(e, choice.id)}
                                />
                                <input 
                                    type="radio"
                                    className="check-ans"
                                    onChange={() => this.updateCorrectAns(choice.id)}
                                />
                            </div>)}
                        
                    </div>
                </div>
            </div>
        )
    }
}