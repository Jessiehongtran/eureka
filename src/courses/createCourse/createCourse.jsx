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
import { publishCourse } from '../../duck/actions/courseActions';

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
            curSessionID: 0
        }

        this.getSessions = this.getSessions.bind(this);
        this.getModules = this.getModules.bind(this);
        this.addSession = this.addSession.bind(this);
        this.displayModuleMenu = this.displayModuleMenu.bind(this);
        this.updateClickedModule = this.updateClickedModule.bind(this);
        this.displaySession = this.displaySession.bind(this);
        this.getASpecificSession = this.getASpecificSession.bind(this);
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

    async getSessions(){
        const courseID = this.props.match.params.courseID
        try {
            const res = await axios.get(`${API_URL}/session/course/${courseID}`)
            this.setState({sessions: res.data})
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
            this.setState({ componentToDisplay: <Quiz sessionID={sessionID} />})
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

    render(){
        const { sessions, showModuleMenu, modules, componentToDisplay } = this.state;

        console.log('sessions', sessions)

        return (
            <div className="create-container">
                <div className="content-list">
                    {sessions.length > 0
                    ? sessions.map((session) => <div 
                                                    key={session.sessionID}
                                                    className="each-session"
                                                    onClick={() => this.displaySession(session.sessionID, session.moduleID)}
                                                >   
                                                    {session.module_name}
                                                    {session.moduleID}
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

export default connect(mapStateToProps, { publishCourse })(CreateCourse);