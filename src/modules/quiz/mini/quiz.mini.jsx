import React from 'react';
import './quiz.mini.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

class QuizMini extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        const { question, choices } = this.props;

        console.log('choices in QuizMini', choices)

        return (
            <div className="mini-container">
                <div className="wrapper">
                    <input
                        type="text"
                        className="ques-input"
                        placeholder="Click to type a question"
                        disabled
                    />
                    <div className="image">
                        <FontAwesomeIcon
                            icon={ faImage }
                            className="image-icon"
                        />
                    </div>
                    <div className="answers">
                        {choices.map(choice => 
                            <div className="each" key={choice.id}>
                                <input
                                    type="text"
                                    className="ans-input"
                                    disabled
                                />    
                                {choice.isCorrect
                                ? <div  className="check-ans">
                                  </div>
                                : null}
                            </div>)}
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sessionID: state.quizReducer.sessionID,
        question: state.quizReducer.question,
        choices: state.quizReducer.choices
    }
}


export default connect(mapStateToProps, {})(QuizMini);