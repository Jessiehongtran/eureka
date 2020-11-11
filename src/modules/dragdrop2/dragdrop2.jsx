import React from 'react';
import './dragdrop2.scss';
import { Link } from 'react-router-dom'

export default class DragDrop2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "Which country is most likely to host Sea game 2023?",
            answers: [
                {
                    id: 1,
                    name: "",
                    bgColor: "red",
                },
                {
                    id: 2,
                    name: "",
                    bgColor: "orange",
                },
                {
                    id: 3,
                    name: "",
                    bgColor: "blue",
                },
                {
                    id: 4,
                    name: "",
                    bgColor: "green",
                },
            ],
            answer: ""
        }

        this.onDragStart = this.onDragStart.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
        this.handleBlurQuestion = this.handleBlurQuestion.bind(this)
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this)
    }

    onDragStart(e, id){
        console.log('start', id)
        e.dataTransfer.setData('id', id)

    }

    onDragOver(e){
        console.log('over')
        e.preventDefault()
    }

    onDrop(e, newId){
        console.log('drop', newId)
        let id = e.dataTransfer.getData('id')
        let curAns = this.state.answers
        let draggedInd, droppedInd
        for (let i = 0; i < curAns.length; i++){
            if (curAns[i].id == id){
               draggedInd = i
            }
            if (curAns[i].id == newId){
                droppedInd = i
            }
        }

        console.log('draggedInd', draggedInd, 'droppedInd', droppedInd)

        curAns[draggedInd].id = newId
        curAns[droppedInd].id = id

        this.setState({
            ...this.state,
            answers: curAns
        })
    }

    handleChangeQuestion(e){
        this.setState({question: e.target.value})
    }

    handleBlurQuestion(){
        console.log(this.state.question)
        //post question to backend
    }

    handleChangeAnswer(e){
        this.setState({answer: e.target.value})
    }

    handleBlurAnswer(i){
        let newanswers = [...this.state.answers]
        newanswers[i] = {
            id: newanswers[i].id,
            name:this.state.answer,
            bgColor: newanswers[i].bgColor
        }
        this.setState({answers: newanswers})
    }


    render(){

        const { answers } = this.state;

        return (
            <div className="container">
                <input
                    type="text"
                    placeholder="Type a question..."
                    className="drag-drop-2-ques-input"
                    onChange={this.handleChangeQuestion}
                    onBlur={this.handleBlurQuestion}
                /> 
                <span className="explain">(Drag and drop answers)</span>
                <p className="limit">Most likely</p>
                <div className="answers">
                    {answers.length > 0
                    ? answers.map((ans,i) => 
                        <input 
                            // value={ans.name}
                            key={ans.id} 
                            className="each_ans" 
                            style={{
                                backgroundColor: ans.bgColor,
                                top: `${140 + parseInt(ans.id)*50}px`,
                                left: `46%`
                            }}
                            draggable
                            onDragStart={(e) => this.onDragStart(e, ans.id)}
                            onDragOver={(e) => this.onDragOver(e)}
                            onDrop={(e) => this.onDrop(e, ans.id)}
                            onChange={this.handleChangeAnswer}
                            onBlur={() => this.handleBlurAnswer(i)}
                        />)
                    : null}
                    
                </div>
                <p className="limit">Least likely</p>
            </div>
        )
    }
}

