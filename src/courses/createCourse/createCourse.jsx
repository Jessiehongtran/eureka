import React from 'react';
import './createCourse.scss'

export default class CreateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModules: false,
            clickedX: 0,
            clickedY: 0
        }
        this.toggleDisplayModules = this.toggleDisplayModules.bind(this)
    }

    toggleDisplayModules(e){
        console.log(e.clientX, e.clientY)
        this.setState({
            clickedX: e.clientX,
            clickedY: e.clientY,
            showModules: !this.state.showModules
        })
    }

    render(){
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
                    
                </div>
                {this.state.showModules
                ? <div className="module-options" style={{top: this.state.clickedY/3 + 'px'}}>
                    <div className="module">
                        <p className="module-name">
                            Drag and drop
                        </p>
                    </div>
                    <div className="module">
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