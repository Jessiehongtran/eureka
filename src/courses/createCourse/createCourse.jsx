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
import QuizMini from '../../modules/quiz/quiz.mini';
import { publishCourse } from '../../duck/actions/courseActions';
import { getQuestion, getChoices } from '../../duck/actions/quizActions';
import DragDropMini from '../../modules/dragdrop1/mini/dragdrop1.mini';

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
            miniComponent: <></>,
            clickedY: 0,
            selectedSession: {},
            displayDragDrop: false,
            displayQuiz: false,
            curSessionID: 0
        }

        this.getSessions = this.getSessions.bind(this);
        this.getModules = this.getModules.bind(this);
        this.addSession = this.addSession.bind(this);
        this.displayModuleMenu = this.displayModuleMenu.bind(this);
        this.updateClickedModule = this.updateClickedModule.bind(this);
        this.displaySession = this.displaySession.bind(this);
        this.getASpecificSession = this.getASpecificSession.bind(this);
        this.arrangeSessionsByOrder = this.arrangeSessionsByOrder.bind(this);
    }

    componentDidMount(){
        console.log('createCourse is mounted')
        //get sessions of this course
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
        try {
            const res = await axios.post(`${API_URL}/session`, session)
            console.log('respond from posting a session', res.data)
            const newSessionID = parseInt(res.data.id);
            console.log('newSessionID', newSessionID)

            //display session
            this.displaySession(newSessionID, res.data.moduleID)

            //get session
            this.getSessions()
        } catch (err){
            console.error(err)
        }
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

    arrangeSessionsByOrder(sessions){
        let tempArr = new Array(sessions.length)
        sessions.forEach(session => tempArr[session.order_number - 1] = session)

        for (let i =0; i < tempArr.length; i++){
            if (tempArr[i].moduleID === 1){
                tempArr[i].miniComponent = <DragDropMini/>
            }
            else if (tempArr[i].moduleID === 3){
                tempArr[i].miniComponent = <QuizMini/>
            } 
            else {
                tempArr[i].miniComponent = <></>
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

    async updateSession(change, sessionID){
        try {
            const res = await axios.patch(`${API_URL}/session/${sessionID}`, change)
            console.log('res in updating session', res.data)
            // this.getSessions()
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

    async displaySession(sessionID, moduleID){
        //get the component of the module and update the state componentToDisplay
        if (moduleID === 1){
            this.setState({ componentToDisplay: <DragDrop1 sessionID={sessionID} />})
            
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
        console.log('drag start', sessionID)
        e.dataTransfer.setData('id', sessionID)
    }

    handleDragOver(e, sessionID){
        e.preventDefault()
        console.log('drag over', sessionID)
    }

    handleDragEnter(e, ind){
        //to add a session there 
        // let { sessions } = this.state;
        // sessions.splice(ind + 1, 0, {sessionID: 0})
        // this.setState({sessions: sessions})
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
        console.log('drop',arriveInd, departInd)
        const newSessions = this.swapSessionOrder(arriveInd, departInd, this.state.sessions)
        console.log('newSessions', newSessions)
        this.arrangeSessionsByOrder(newSessions)
        
    }

    render(){
        const { sessions, showModuleMenu, modules, componentToDisplay, miniComponent } = this.state;

        console.log('sessions', sessions)

        return (
            <div className="create-container">
                <div className="content-list">
                    {sessions.length > 0
                    ? sessions.map((session, ind) => <div 
                                                    key={session.sessionID}
                                                    className="each-session"
                                                    onClick={() => this.displaySession(session.sessionID, session.moduleID)}
                                                    draggable
                                                    onDragStart={e => this.handleDragStart(e, session.sessionID)}
                                                    onDragOver ={e => this.handleDragOver(e, session.sessionID)}
                                                    onDragEnter={e => this.handleDragEnter(e, ind)}
                                                    onDrop={e => this.handleDrop(e, session.sessionID)}
                                                >   
                                                    {session.module_name}
                                                    {session.miniComponent}
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
       state
    }
}

export default connect(mapStateToProps, { publishCourse, getQuestion, getChoices })(CreateCourse);