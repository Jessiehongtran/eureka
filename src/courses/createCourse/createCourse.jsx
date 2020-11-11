import React from 'react';
import './createCourse.scss';
import DragDrop1 from '../../modules/dragdrop1/forInput/dragdrop1.input';
import DragDrop2 from '../../modules/dragdrop2/dragdrop2';
import Quiz from '../../modules/quiz/quiz';
import Type from '../../modules/type/type';
import Video from '../../modules/video/video';
import Slider from '../../modules/slider/slider';
import WordRain from '../../modules/wordRain/wordRain';

export default class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModules: false,
            showDragDrop1: false,
            showDragDrop2: false,
            showSlider: false,
            showQuiz: false,
            showVideo: false,
            showType: false,
            showWordRain: false,
            clickedX: 0,
            clickedY: 0,
            content_boxes: [1]

        }
        this.toggleDisplayModules = this.toggleDisplayModules.bind(this)
        this.showDragDrop1 = this.showDragDrop1.bind(this)
        this.addContentBox = this.addContentBox.bind(this)
        this.showDragDrop2 = this.showDragDrop2.bind(this)
        this.showSlider = this.showSlider.bind(this)
        this.showType = this.showType.bind(this)
        this.showVideo = this.showVideo.bind(this)
        this.showWordRain = this.showWordRain.bind(this)
    }

    toggleDisplayModules(e){
        console.log(e.clientX, e.clientY)
        this.setState({
            clickedX: e.clientX,
            clickedY: e.clientY,
            showModules: !this.state.showModules
        })
    }

    showDragDrop1(){
        this.setState({showDragDrop1: true})
    }

    showDragDrop2(){
        this.setState({showDragDrop2: true})
    }

    showQuiz(){
        this.setState({showQuiz: true})
    }

    showSlider(){
        this.setState({showSlider: true})
    }

    showType(){
        this.setState({showType: true})
    }

    showVideo(){
        this.setState({showVideo: true})
    }

    showWordRain(){
        this.setState({showWordRain: true})
    }

    addContentBox(){
        this.setState({
            content_boxes: [
                ...this.state.content_boxes,
                1
            ]
        })
    }

    render(){
        console.log('showDragDrop', this.state.showDragDrop)

        return (
            <div className="create-container">
                <div className="content-list">
                    {this.state.content_boxes.map(content => <div 
                                                                className="content-shrink"
                                                                onClick={(e) => this.toggleDisplayModules(e)}
                                                             >   
                                                             </div>
                    )}
                    <button 
                        className="add-btn"
                        onClick={() => this.addContentBox()}
                    >Add content</button>
                </div>
                <div className="content-editor">
                    {this.state.showDragDrop1
                    ? <DragDrop1 />
                    : null}
                    {this.state.showQuiz
                    ? <Quiz />
                    : null}
                    {this.state.showDragDrop2
                    ? <DragDrop2 />
                    : null}
                    {this.state.showType
                    ? <Type />
                    : null}
                    {this.state.showVideo
                    ? <Video />
                    : null}
                    {this.state.showSlider
                    ? <Slider />
                    : null}
                    {this.state.showWordRain
                    ? <WordRain />
                    : null}
                </div>
                {this.state.showModules
                ? <div className="module-options" style={{top: this.state.clickedY - 40 + 'px'}}>
                    <div className="option" onClick={() => this.showDragDrop1()}>
                        <p className="module-name">
                            Drag and drop 1
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showDragDrop2()}>
                        <p className="module-name">
                            Drag and drop 2
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showQuiz()}>
                        <p className="module-name">
                            Quiz
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showSlider()}>
                        <p className="module-name">
                            Slider
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showType()}>
                        <p className="module-name">
                            Type
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showVideo()}>
                        <p className="module-name">
                            Video
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showWordRain()}>
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