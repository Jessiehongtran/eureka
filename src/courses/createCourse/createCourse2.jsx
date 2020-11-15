import React from 'react';
import './createCourse.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import DragDrop1 from '../../modules/dragdrop1/forInput/dragdrop1.input';
import DragDrop2 from '../../modules/dragdrop2/dragdrop2';
import Quiz from '../../modules/quiz/quiz';
import Type from '../../modules/type/type';
import Video from '../../modules/video/video';
import Slider from '../../modules/slider/slider';
import WordRain from '../../modules/wordRain/wordRain';
import Editor from '../createCourse/editor/editor';

export default class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modules: [],
            sessions: [],
            showModuleMenu: false,
            activeSessionInd: 0,
            clickedModuleID: 0,
            componentToDisplay: <></>,
            clickedY: 0
        }

        this.getSessions = this.getSessions.bind(this);
        this.getModules = this.getModules.bind(this);
        this.addSession = this.addSession.bind(this);
        this.displayModuleMenu = this.displayModuleMenu.bind(this);
        this.updateClickedModule = this.updateClickedModule.bind(this);
        this.displaySession = this.displaySession.bind(this);
        
    }

    componentDidMount(){
        //get sessions of this course
        this.getSessions()
        //get modules 
        this.getModules()
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

            //rerender get session 
            this.getSessions()
        } catch (err){
            console.error(err)
        }
    }

    async getSessions(){
        try {
            const res = await axios.get(`${API_URL}/session`)
            console.log('sessions', res.data)
            this.setState({sessions: res.data})
        } catch (err){
            console.error(err)
        }
    }

    async getModules(){
        try {
            const res = await axios.get(`${API_URL}/module`)
            console.log('modules', res.data)
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

    displaySession(sessionID){
        console.log('displaySession')
        //get the session and the module
        const { sessions } = this.state;
        const selectedSession = sessions.filter(session => session.sessionID === sessionID)[0];
        console.log('selected session', selectedSession)

        //get the component of the module and update the state componentToDisplay
        const selectedModuleID = selectedSession.moduleID
        if (selectedModuleID === 1){
            this.setState({ componentToDisplay: <DragDrop1 />})
        } 
        else if (selectedModuleID === 2){
            this.setState({ componentToDisplay: <DragDrop2 />})
        } 
        else if (selectedModuleID === 3){
            this.setState({ componentToDisplay: <Quiz />})
        } 
        else if (selectedModuleID === 4){
            this.setState({ componentToDisplay: <Slider />})
        } 
        else if (selectedModuleID === 5){
            this.setState({ componentToDisplay: <Type />})
        } 
        else if (selectedModuleID === 6){
            this.setState({ componentToDisplay: <Video />})
        } 
        else if (selectedModuleID === 7){
            this.setState({ componentToDisplay: <WordRain />})
        } 
    }

    // getSpecificModule(moduleID){
    //     const { modules } = this.state;
    //     const thisModule = modules.filter(module => module.id === moduleID)
    //     return thisModule
    // }

    render(){
        const { sessions, showModuleMenu, modules, componentToDisplay } = this.state;
        console.log('componentToDisplay', componentToDisplay)

        return (
            <div className="create-container">
                <div className="content-list">
                    {sessions.length > 0
                    ? sessions.map((session) => <div 
                                                                key={session.sessionID}
                                                                className="each-session"
                                                                onClick={() => this.displaySession(session.sessionID)}
                                                            >   
                                                                {session.module_name}
                                                            </div>)
                    : null}
                    <button 
                            className="add-btn"
                            onClick={(e) => this.displayModuleMenu(e)}
                    >
                        Add content
                    </button>
                </div>
                <div className="content-editor">
                    <Editor component={this.state.componentToDisplay}/>
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