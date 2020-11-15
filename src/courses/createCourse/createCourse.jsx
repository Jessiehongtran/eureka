import React from 'react';
import './createCourse.scss';
import DragDrop1 from '../../modules/dragdrop1/forInput/dragdrop1.input';
import DragDrop2 from '../../modules/dragdrop2/dragdrop2';
import Quiz from '../../modules/quiz/quiz';
import Type from '../../modules/type/type';
import Video from '../../modules/video/video';
import Slider from '../../modules/slider/slider';
import WordRain from '../../modules/wordRain/wordRain';
import Editor from '../createCourse/editor/editor';
import axios from 'axios';
import { API_URL } from '../../apiConfig';

export default class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clickedX: 0,
            clickedY: 0,
            content_boxes: [],
            courseID: this.props.match.params.courseID,
            total_modules: 0,
            curSessionID: 0,
            course_content: [],
            componentToPass: <></>,
            currentContentBox: 0
        }
        this.toggleDisplayModules = this.toggleDisplayModules.bind(this)
        this.displayComponent = this.displayComponent.bind(this)
    }

    toggleDisplayModules(e, i){
        console.log(e.clientX, e.clientY)
        this.setState({
            clickedX: e.clientX,
            clickedY: e.clientY,
            showModules: !this.state.showModules,
            currentContentBox: i
        })
    }

    async componentDidMount(){
        try {
            const res = await axios.get(`${API_URL}/course/content/${this.state.courseID}`)
            console.log('course content', res.data)
            this.setState({course_content: res.data})
        } catch (err){
            console.error(err)
        }
    }

    async createSession(moduleID){
        const session = {
            courseID: this.state.courseID,
            moduleID: moduleID,
            order_number: this.state.total_modules + 1
        }
        try {
            const res = await axios.post(`${API_URL}/session`, session)
            const sessionID = res.data.id
            this.setState({curSessionID: sessionID})
        } catch (err){
            console.error(err)
        }
    }

    addContentBox(){
        this.setState({
            content_boxes: [
                ...this.state.content_boxes,
                {module: ""}
            ]
        })
    }

    getContentByModule(moduleId){
        const { course_content } = this.state
        for (let i = 0; i < course_content.length; i++){
            if (moduleId === course_content[i].moduleID){
                return course_content[i] //but what if there are more than one for a module?
            }
        }
    }

    displayComponent(component, module){
        const { content_boxes, currentContentBox } = this.state;
        content_boxes[currentContentBox].module = module
        this.setState({
            componentToPass: component,
            content_boxes: content_boxes
        })
    }

    render(){

        console.log('courseID', this.props.match.params.courseID)

        return (
            <div className="create-container">
                <div className="content-list">
                    {this.state.content_boxes.map((content,i) => <div 
                                                                className="content-shrink"
                                                                onClick={(e) => this.toggleDisplayModules(e, i)}
                                                             >   
                                                             {content.module.length > 0 ? content.module : null}
                                                             </div>
                    )}
                    <button 
                        className="add-btn"
                        onClick={() => this.addContentBox()}
                    >Add content</button>
                </div>
                <div className="content-editor">
                    <Editor component={this.state.componentToPass}/>
                </div>
                {this.state.showModules
                ? <div className="module-options" style={{top: this.state.clickedY - 40 + 'px'}}>
                    <div className="option" onClick={() => this.displayComponent(<DragDrop1 />, "Drag and drop 1")}>
                        <p className="module-name">
                            Drag and drop 1
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<DragDrop2 />, "Drag and drop 2")}>
                        <p className="module-name">
                            Drag and drop 2
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<Quiz />, "Quiz")}>
                        <p className="module-name">
                            Quiz
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<Slider />, "Slider")}>
                        <p className="module-name">
                            Slider
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<Type />, "Type")}>
                        <p className="module-name">
                            Type
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<Video />, "Video")}>
                        <p className="module-name">
                            Video
                        </p>
                    </div>
                    <div className="option" onClick={() => this.displayComponent(<WordRain />, "Word Rain")}>
                        <p className="module-name">
                            Word Rain
                        </p>
                    </div>
                  </div>
                : null}
            </div>
        )
    }
}