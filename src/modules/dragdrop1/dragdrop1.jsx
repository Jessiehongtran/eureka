import React from 'react';
import './dragdrop1.scss'
import { Link } from 'react-router-dom'

export default class DragDrop1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            after_changes: [],
            before_changes: [],
            change: "",
            countChange : 0,
            
        }

        this.updateChange = this.updateChange.bind(this)
        this.addChange = this.addChange.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    updateChange(e){
        this.setState({change: e.target.value})
    }

    addChange(e){
        e.preventDefault()
        this.setState({
                    before_changes: 
                        [
                            ...this.state.before_changes, {
                                id: this.state.countChange +1,
                                name : this.state.change,
                                category: ""
                            },
                    
                        ],
                    countChange: this.state.countChange + 1
                })
    }

    onDragOver = (e) => {
        e.preventDefault();
        console.log('over')
    }

    onDragStart(e, name){
        console.log('start')
        e.dataTransfer.setData('name', name)
        
    }

    onDrop = (e, cat) => {
        console.log('drop')
        let name = e.dataTransfer.getData('name');

        let new_after_change = this.state.before_changes.filter((change) => {
            if (change.name == name){
                change.category = cat;
            }
            return change
        })

        console.log('after_changes', this.state.after_changes)

        if (new_after_change.length === 0){
            const after_changes = this.state.after_changes
            for (let i = 0; i< after_changes.length ; i++){
                if (after_changes[i].name === name) {
                    after_changes[i].category = cat
                }
            }

            this.setState({
                ...this.state,
                after_changes: after_changes,   
            })

        } 
         
        else {

            let before_changes = this.state.before_changes.filter(change => change.name !== name)

            this.setState({
                ...this.state,
                after_changes: this.state.after_changes.concat(new_after_change),   
                before_changes: before_changes
            })

        }
    }



    render(){

        var new_changes = {
            bias: [],
            non_bias: [],
            not_sure: []
        }

        for (let i = 0 ; i < this.state.after_changes.length; i++){
                if (this.state.after_changes[i].category.length > 0){
                    new_changes[this.state.after_changes[i].category].push(
                        <div 
                            draggable
                            onDragStart = {(e) => this.onDragStart(e,this.state.after_changes[i].name)}
                            key={this.state.after_changes[i].id}
                            className="draggable"
                        >
                            {this.state.after_changes[i].name}
                        </div>
                    )
                }
            }

        return (
            <div className="container">
                <div className="user-input">
                    <p className="ques">List all the changes you are navigating to then drag it to different categories</p>
                    <div className="ans">
                        <input
                            type="text" 
                            onChange={this.updateChange}
                        />
                        <button onClick={this.addChange}>Add</button>
                    </div>
                </div>
                <div className="ans-display">
                {
                    this.state.before_changes.length > 0
                    ? this.state.before_changes.map(change=> <p 
                                key={change.id}
                                draggable 
                                className="each-change"
                                onDragStart = {(e) => this.onDragStart(e,change.name)}
                            >{change.name}</p>)
                    : null
                }
                </div>
                <div className="classify">
                    <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "bias")}
                    >
                        <h3 className="title">Bias</h3>
                        {new_changes.bias}
                    </div>
                    <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "non_bias")}
                    >
                        <h3 className="title">Non-bias</h3>
                        {new_changes.non_bias}
                    </div>
                    <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "not_sure")}
                    >
                        <h3 className="title">Not sure</h3>
                        {new_changes.not_sure}
                    </div>
                </div>
            </div>
        )
    }
}