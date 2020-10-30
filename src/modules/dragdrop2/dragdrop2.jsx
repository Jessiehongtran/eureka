import React from 'react';
import './dragdrop2.scss'

export default class DragDrop2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: [
                {
                    id: 1,
                    name: "Japan",
                    bgColor: "red",
                    x: 10,
                    y: 20,
                },
                {
                    id: 2,
                    name: "Korea",
                    bgColor: "orange",
                    x: 11,
                    y: 21,
                },
                {
                    id: 3,
                    name: "America",
                    bgColor: "blue",
                    x: 12,
                    y: 22,
                },
                {
                    id: 4,
                    name: "Philippines",
                    bgColor: "green",
                    x: 13,
                    y: 23,
                },
            ]
        }

        this.onDragStart = this.onDragStart.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDrop = this.onDrop.bind(this)
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


    render(){

        const { answers } = this.state;

        return (
            <div className="container">
                <p className="ques"> Which country is most likely to host Sea game 2023? <span className="explain">(Drag and drop answers)</span></p>
                <p className="limit">Most likely</p>
                <div className="answers">
                    {answers.length > 0
                    ? answers.map(ans => 
                        <p 
                            key={ans.id} 
                            className="each_ans" 
                            style={{
                                backgroundColor: ans.bgColor,
                                top: `${115 + parseInt(ans.id)*50}px`,
                                left: `46%`
                            }}
                            draggable
                            onDragStart={(e) => this.onDragStart(e, ans.id)}
                            onDragOver={(e) => this.onDragOver(e)}
                            onDrop={(e) => this.onDrop(e, ans.id)}
                        >{ans.name}</p>)
                    : null}
                </div>
                <p className="limit">Least likely</p>
            </div>
        )
    }
}

