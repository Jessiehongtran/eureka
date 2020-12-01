import React from 'react';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import { connect } from 'react-redux';
import DragDrop1 from '../../modules/dragdrop1/forInput/dragdrop1.input';
import DragDrop2 from '../../modules/dragdrop2/dragdrop2';
import Quiz from '../../modules/quiz/quiz.redux';
import Slider from '../../modules/slider/slider';
import Type from '../../modules/type/type';
import Video from '../../modules/video/video';
import WordRain from '../../modules/wordRain/wordRain';
import { getQuestion, getChoices, getImage } from '../../duck/actions/quizActions';
import { getHeader, getCategory } from '../../duck/actions/dragdropActions';
import './courseDisplay.scss'


class CourseDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sessions: []
        }
    }

    componentDidMount(){
        this.getSessions()
    }

    arrangeSessionsByOrder(sessions){
        let tempArr = new Array()
        //be careful if an element is empty
        for (let i = 0; i<sessions.length; i++){
            tempArr.push({})
        }
        sessions.forEach(session => tempArr[session.order_number - 1] = session)
        
        for (let i = 0; i<tempArr.length; i++){
            let { moduleID, sessionID, order_number } = tempArr[i]
            if (moduleID === 1){
                // this.props.getHeader(sessionID)
                // this.props.getCategory(sessionID)
                console.log('herrrrrrrr', <DragDrop1 sessionID={sessionID}/>)
                tempArr[i].componentToDisplay = <DragDrop1 sessionID={sessionID} />
            } 
            else if (moduleID === 2){
                tempArr[i].componentToDisplay = <DragDrop2 sessionID={sessionID} />
            } 
            else if (moduleID === 3){
                tempArr[i].componentToDisplay = <Quiz sessionID={sessionID} />
                this.props.getQuestion(sessionID)
                this.props.getChoices(sessionID)
                this.props.getImage(sessionID)
            } 
            else if (moduleID === 4){
                tempArr[i].componentToDisplay = <Slider sessionID={sessionID} />
            } 
            else if (moduleID === 5){
                tempArr[i].componentToDisplay = <Type sessionID={sessionID} />
            } 
            else if (moduleID === 6){
                tempArr[i].componentToDisplay = <Video sessionID={sessionID} />
            } 
            else if (moduleID === 7){
                tempArr[i].componentToDisplay = <WordRain sessionID={sessionID} />
            } 
        }

        this.setState({sessions: tempArr})
    }

    async getSessions(){
        const courseID = this.props.match.params.courseID
            try {
                const res = await axios.get(`${API_URL}/session/course/${courseID}`)
                //arrange sessions according to order_number
                if (res.data.length > 0){
                    this.arrangeSessionsByOrder(res.data)
                }

        } catch (err){
            console.error(err)
        }
    }

    render(){
        console.log('sessions in course display', this.state.sessions)
        const { sessions } = this.state;

        return (
            <div className="course-display">
                {sessions.length > 0
                ? sessions.map(session => <div className="each-session">{session.componentToDisplay}</div>)
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       state
    }
}

export default connect(mapStateToProps, { getQuestion, getChoices, getHeader, getCategory, getImage })(CourseDisplay);