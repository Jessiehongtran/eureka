import React from 'react';
import './createCourse.scss';
import DragDrop1 from '../../modules/dragdrop1/dragdrop1';
import Quiz from '../../modules/quiz/quiz';

export default class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModules: false,
            showDragDrop: false,
            showQuiz: false,
            clickedX: 0,
            clickedY: 0,

        }
        this.toggleDisplayModules = this.toggleDisplayModules.bind(this)
        this.showDragDrop = this.showDragDrop.bind(this)
    }

    toggleDisplayModules(e){
        console.log(e.clientX, e.clientY)
        this.setState({
            clickedX: e.clientX,
            clickedY: e.clientY,
            showModules: !this.state.showModules
        })
    }

    showDragDrop(){
        this.setState({showDragDrop: true})
    }

    showQuiz(){
        this.setState({showQuiz: true})
    }

    render(){
        console.log('showDragDrop', this.state.showDragDrop)

        return (
            <div className="create-container">
                <div className="content-list">
                    <div 
                        className="content-shrink"
                        onClick={(e) => this.toggleDisplayModules(e)}
                    >
                        
                    </div>
                </div>
                <div className="content-editor">
                    {this.state.showDragDrop
                    ? <DragDrop1 />
                    : null}
                    {this.state.showQuiz
                    ? <Quiz />
                    : null}
                </div>
                {this.state.showModules
                ? <div className="module-options" style={{top: this.state.clickedY/3 + 'px'}}>
                    <div className="option" onClick={() => this.showDragDrop()}>
                        <p className="module-name">
                            Drag and drop
                        </p>
                    </div>
                    <div className="option" onClick={() => this.showQuiz()}>
                        <p className="module-name">
                            Quiz
                        </p>
                    </div>
                  </div>
                : null}
            </div>
        )
    }
}