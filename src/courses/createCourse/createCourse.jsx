import React from 'react';
import './createCourse.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../apiConfig';
import DragDrop1 from '../../modules/dragdrop1/forInput/dragdrop1.input';
import DragDrop2 from '../../modules/dragdrop2/dragdrop2';
import Quiz from '../../modules/quiz/quiz.redux';
import Type from '../../modules/type/type';
import Video from '../../modules/video/video';
import Slider from '../../modules/slider/slider';
import WordRain from '../../modules/wordRain/wordRain';
import QuizMini from '../../modules/quiz/mini/quiz.mini';
import DragDropMini from '../../modules/dragdrop1/mini/dragdrop1.mini';
import VideoMini from '../../modules/video/mini/video.mini';
import { publishCourse } from '../../duck/actions/courseActions';
import { getQuestion, getChoices } from '../../duck/actions/quizActions';
import { getHeader, getCategory } from '../../duck/actions/dragdropActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';

class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modules: [],
            sessions: [],
            showModuleMenu: false,
            activeSessionInd: 0,
            clickedModuleID: 0,
            componentToDisplay: <></>,
            clickedY: 0,
            selectedSession: {},
            displayDragDrop: false,
            displayQuiz: false,
            curSessionID: 0,
            isDragging: false,
            origin: { x: 0, y: 0},
            translation: { x: 0, y: 0}
        }

        this.getSessions = this.getSessions.bind(this);
        this.getModules = this.getModules.bind(this);
        this.addSession = this.addSession.bind(this);
        this.displayModuleMenu = this.displayModuleMenu.bind(this);
        this.updateClickedModule = this.updateClickedModule.bind(this);
        this.displaySession = this.displaySession.bind(this);
        this.getASpecificSession = this.getASpecificSession.bind(this);
        this.arrangeSessionsByOrder = this.arrangeSessionsByOrder.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    componentDidMount(){
        //get sessions 
        this.getSessions()
        //get modules 
        this.getModules()
        //display the first module if any
        setTimeout( function(){
            if (this.state.sessions.length > 0){
                    const firstSession = this.state.sessions[0]
                    const firstSessionID = firstSession.sessionID
                    this.displaySession(firstSessionID, firstSession.moduleID)
                }
        }.bind(this), 1000)
        
    }


    async addSession(moduleID){
        //post session without moduleId
        const session = {
            courseID: this.props.match.params.courseID,
            moduleID: moduleID,
            order_number: this.state.sessions.length + 1
        }
        let newSessionID
        try {
            const res = await axios.post(`${API_URL}/session`, session)
            console.log('respond from posting a session', res.data)
            newSessionID = parseInt(res.data.id);
            console.log('newSessionID', newSessionID)

            //get session
            this.getSessions()

            //display session
            this.displaySession(newSessionID, moduleID)

            
        } catch (err){
            console.error(err)
        }

        return newSessionID 
    }

    async getASpecificSession(sessionID){
        let session = null
        try {
            const res = await axios.get(`${API_URL}/session/${parseInt(sessionID)}`)
            session = res.data
            console.log('got a session')
        } catch (err) {
            console.error(err)
        }
        return session
    }

    arrangeSessionsByOrder(sessions, draggedSessionID){
        let tempArr = new Array()
        //be careful if an element is empty
        for (let i = 0; i<sessions.length; i++)
            tempArr.push({})
        sessions.forEach(session => tempArr[session.order_number - 1] = session )

        //added mini component
        for (let i =0; i < tempArr.length; i++){
            if (tempArr[i].moduleID === 1){
                tempArr[i].miniComponent = <DragDropMini/>
            }
            else if (tempArr[i].moduleID === 3){
                tempArr[i].miniComponent = <QuizMini/>
            } 
            else if (tempArr[i].moduleID === 6){
                tempArr[i].miniComponent = <VideoMini/>
            } 
            else {
                tempArr[i].miniComponent = <></>
            }

            //change color back to white
            if (tempArr[i].sessionID === draggedSessionID){
                tempArr[i].bgcolor = 'white'
            }

        }

        console.log('tempArr', tempArr)

        this.setState({sessions: tempArr})
    }

    async getSessions(){
        const courseID = this.props.match.params.courseID
            try {
            const res = await axios.get(`${API_URL}/session/course/${courseID}`)
            console.log('getting sessions', res.data)
            //arrange sessions according to order_number
            if (res.data.length > 0){
                this.arrangeSessionsByOrder(res.data)
            }

        } catch (err){
            console.error(err)
        }
    }

    async updateSession(change, sessionID){
        try {
            const res = await axios.patch(`${API_URL}/session/${sessionID}`, change)
            console.log('res in updating session', res.data)
        } catch (err){
            console.error(err)
        }
    }

    getPreSession(sessionID){
        const { sessions } = this.state;
        for (let i = 0; i < sessions.length-1; i++){
            if (sessions[i+1].sessionID === sessionID){
                return sessions[i]
            }
        }
        return null
    }

    async deleteSession(sessionID, curOrderNumber){
        const { sessions } = this.state;
        const preSession = this.getPreSession(sessionID)
        console.log('preSession', preSession)
        try {
            const res = await axios.delete(`${API_URL}/session/${sessionID}`)
            console.log('res in deleting session', res.data)

            //reorder the sessions
            this.reOrderSessions(sessions, curOrderNumber, -1)

            //get sessions
            this.getSessions()

            //display the previous session
            this.displaySession(preSession.sessionID, preSession.moduleID)

        } catch (err){
            console.error(err)
        }
    }

    async getModules(){
        try {
            const res = await axios.get(`${API_URL}/module`)
            this.setState({modules: res.data})
        } catch (err){
            console.error(err)
        }
    }


    displayModuleMenu(e){
        //display or hide module menu
        this.setState({ 
            clickedY: e.clientY,
            showModuleMenu: true,
        })

    }

    updateClickedModule(moduleID){
        //update clickedModuleID state
        this.setState({ 
            clickedModuleID: moduleID,
            showModuleMenu: false //close module menu
        })
        //add session
        this.addSession(moduleID)
    }

    reOrderSessions(sessions, curOrderNumber, change){
        const nextSessions = sessions.filter(session => session.order_number > curOrderNumber)
        if (nextSessions.length > 0){
            nextSessions.forEach((session,i) => {this.updateSession({order_number: session.order_number + change}, session.sessionID)}
            )
        }
    }

    async duplicateModule(moduleID, curOrderNumber){
        const { sessions } = this.state
        const session = {
            courseID: this.props.match.params.courseID,
            moduleID: moduleID,
            order_number: curOrderNumber + 1
        }
        try {
            const res = await axios.post(`${API_URL}/session`, session)
            console.log('respond from posting a session in duplicate', res.data)
            let newSessionID = parseInt(res.data.id);
            //update order_number of the following sessions
            this.reOrderSessions(sessions, curOrderNumber, 1)

            //get session
            this.getSessions()

            //display session
            this.displaySession(newSessionID, moduleID)

            
        } catch (err){
            console.error(err)
        }


    }

    async displaySession(sessionID, moduleID){
        //get the component of the module and update the state componentToDisplay
        if (moduleID === 1){
            this.setState({ componentToDisplay: <DragDrop1 sessionID={sessionID} />})
            this.props.getHeader(sessionID)
            this.props.getCategory(sessionID)
        } 
        else if (moduleID === 2){
            this.setState({ componentToDisplay: <DragDrop2 sessionID={sessionID} />})
        } 
        else if (moduleID === 3){
            this.setState({ 
                componentToDisplay: <Quiz sessionID={sessionID} />,
            })
            this.props.getQuestion(sessionID)
            this.props.getChoices(sessionID)
        } 
        else if (moduleID === 4){
            this.setState({ componentToDisplay: <Slider sessionID={sessionID} />})
        } 
        else if (moduleID === 5){
            this.setState({ componentToDisplay: <Type sessionID={sessionID} />})
        } 
        else if (moduleID === 6){
            this.setState({ componentToDisplay: <Video sessionID={sessionID} />})
        } 
        else if (moduleID === 7){
            this.setState({ componentToDisplay: <WordRain sessionID={sessionID} />})
        } 

       
    }

    handleDragStart(e, sessionID){
        e.dataTransfer.setData('id', sessionID)
        //change color
        let { sessions } = this.state;
        const draggedSession = sessions.filter(session => session.sessionID === sessionID)[0]
        draggedSession.bgcolor = "#ECECEC"
        this.setState({sessions: sessions})
    }

    handleDragOver(e, sessionID){
        e.preventDefault()
        const { origin } = this.state;
        this.setState({translation: {x: e.clientX - origin.x, y: e.clientY - origin.y}})
    }

    handleMouseDown({clientX, clientY}){
        this.setState({
            isDragging: true,
            origin: {x: clientX, y: clientY}
        })
    }

    swapSessionOrder(arriveSessionID, departSessionID, sessions){
        let deSession, deSessionInd, arrSession, arrSessionInd
        for (let i = 0; i < sessions.length; i++){
            if (sessions[i]){
                if (sessions[i].sessionID === departSessionID){
                    deSession = sessions[i]
                    deSessionInd = i
                }
                if (sessions[i].sessionID === arriveSessionID){
                    arrSession = sessions[i]
                    arrSessionInd = i
                }    
            }  
        }

        let origin = sessions[deSessionInd].order_number 
        sessions[deSessionInd].order_number = arrSession.order_number; 
        //update this to backend
        this.updateSession({ order_number: arrSession.order_number }, departSessionID)
        sessions[arrSessionInd].order_number = origin; 
        //update this to backend
        this.updateSession({ order_number: origin }, arriveSessionID)
        
        return sessions
    }

    handleDrop(e, sessionID){
        const departInd = parseInt(e.dataTransfer.getData('id'))
        const arriveInd = sessionID
        const newSessions = this.swapSessionOrder(arriveInd, departInd, this.state.sessions)
        this.arrangeSessionsByOrder(newSessions, departInd )
    }

    render(){

        const { sessions, showModuleMenu, modules, componentToDisplay, isDragging, translation } = this.state;

        return (
            <div className="create-container">
                <div className="content-list">
                    {sessions.length > 0
                    ? sessions.map((session, ind) => 
                                                <div className="session-wrapper">
                                                    <div className="icons">
                                                        <FontAwesomeIcon
                                                            icon = {faClone}
                                                            className="duplicate-icon"
                                                            onClick={() => this.duplicateModule(session.moduleID, session.order_number)}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon = {faTrashAlt}
                                                            className="delete-icon"
                                                            onClick={() => this.deleteSession(session.sessionID, session.order_number)}
                                                        />
                                                    </div>
                                                    <div 
                                                        key={session.sessionID}
                                                        className="each-session"
                                                        onClick={() => this.displaySession(session.sessionID, session.moduleID)}
                                                        draggable
                                                        onDragStart={e => this.handleDragStart(e, session.sessionID)}
                                                        onDragOver ={e => this.handleDragOver(e, session.sessionID)}
                                                        onDrop={e => this.handleDrop(e, session.sessionID)}
                                                        onMouseDown={this.handleMouseDown}
                                                        style={{
                                                            cursor: isDragging ? '-webkit-grabbing': '-webkit-grab',
                                                            zIndex: isDragging ? 2: 1,
                                                            transition: isDragging ? 'none' : 'transform 500ms',
                                                            transform: `translate(${translation.x})px, ${translation.y}px)`,
                                                            backgroundColor: isDragging && session.bgcolor ? session.bgcolor : 'white'
                                                        }}
                                                    >   
                                                        {session.module_name}
                                                        {session.miniComponent}
                                                    </div>
                                                </div>)
                    : null}
                    <button 
                        className="add-btn"
                        onClick={(e) => this.displayModuleMenu(e)}
                    >
                        Add content
                    </button>
                    <button 
                        className="publish-btn"
                        onClick={() => this.props.publishCourse(true)}
                    >
                        Publish course
                    </button>
                </div>
                <div className="content-editor">
                    {componentToDisplay}
                </div>
                {showModuleMenu
                ? <div className="module-menu" style={{top: this.state.clickedY - 40 + 'px'}}>
                    {modules 
                    ? modules.map((module, moduleInd) =>  <div key={moduleInd} className="option" onClick={() => this.updateClickedModule(module.id)}>
                                                            <p className="module-name">
                                                                {module.module_name}
                                                            </p>
                                                         </div>)
                    : null}
                  </div>
                : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       sessions: state.courseReducer.sessions
    }
}

export default connect(mapStateToProps, { publishCourse, getQuestion, getChoices, getHeader, getCategory })(CreateCourse);