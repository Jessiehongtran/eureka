import React from 'react';
import '../dragdrop1.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class InputDragDrop1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            after_changes: [],
            before_changes: [],
            change: "",
            countChange : 0,
            header: "",
            questionID: 0,
            curCategoryName: "",
            category_list:[{id: 1, category_name: "category name"}]
        }

        this.updateChange = this.updateChange.bind(this)
        this.addChange = this.addChange.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.handleChangeHeader = this.handleChangeHeader.bind(this)
        this.handleBlurHeader = this.handleBlurHeader.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleBlurCategory = this.handleBlurCategory.bind(this)
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
        console.log('start', name)
        e.dataTransfer.setData('name', name)
        
    } 

    onDrop = (e, cat) => {
        let name = e.dataTransfer.getData('name');
        console.log('drop', 'cat', cat, 'name', name)

        let new_after_change = this.state.before_changes.filter((change) => {
            if (change.name == name){
                change.category = cat;
            }
            return change
        })
        console.log('new_after_change', new_after_change)
        console.log('after_changes before', this.state.after_changes)

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

    handleChangeHeader(e){
        console.log('change')
        this.setState({header: e.target.value})
    }

    

    postHeader(header){
        //post header as text
    }

    postCategory(category){
        //post category
    }

    async handleBlurHeader(e){
        //post header
        this.postHeader(this.state.header)
    }

    handleChangeCategory(e){
        this.setState({curCategoryName: e.target.value})
    }

    handleBlurCategory(e, categoryInd){
        const { category_list } = this.state;
        let categoryToUpdate = category_list.filter(cate => cate.id === categoryInd)[0];
        categoryToUpdate.category_name = e.target.value;
        this.setState({category_list: category_list})
    }


    render(){

        //now we don't know category name in advance, how can we classify
        const { category_list } = this.state;
        let new_changes = {}
        console.log('after_changes after', this.state.after_changes)
        for (let i = 0; i < category_list.length; i++){
            new_changes[category_list[i].category_name] = []
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

        console.log('category_list', category_list)
        console.log('new_changes', new_changes)

        return (
            <div className="container">
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Type a header..." 
                        className="header"
                        value={this.state.header}
                        onChange={this.handleChangeHeader}
                        onBlur={this.handleBlurHeader}
                        onKeyPress={this.handleKeyPress}
                    />
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
                    {category_list.length > 0
                    ? category_list.map(cate => 
                        <div 
                            className="session" 
                            key={cate.id}
                            onDragOver={(e) => this.onDragOver(e)}
                            onDrop={(e) => this.onDrop(e, cate.category_name)}
                        >
                            <input
                                type="text"
                                className="category" 
                                placeholder="Category name"
                                onBlur={e => this.handleBlurCategory(e, cate.id)}
                            />
                            {new_changes[cate.category_name]}
                        </div>
                        )
                    : null
                    }

                    {/* <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "bias")}
                    >
                        <input
                            type="text"
                            className="category" 
                            placeholder="Category 1"
                            value={this.state.category_1}
                            onChange={this.handleChangeCategory1}
                            onBlur={this.handleBlurCategory1}
                        />
                        {new_changes.bias}
                    </div>
                    <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "non_bias")}
                    >
                        <input
                            type="text"
                            className="category" 
                            placeholder="Category 2"
                            value={this.state.category_2}
                            onChange={this.handleChangeCategory2}
                            onBlur={this.handleBlurCategory2}
                        />
                        {new_changes.non_bias}
                    </div>
                    <div 
                        className="session" 
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "not_sure")}
                    >
                        <input
                            type="text"
                            className="category"
                            placeholder="Category 3"  
                            value={this.state.category_3}
                            onChange={this.handleChangeCategory3}
                            onBlur={this.handleBlurCategory3}
                        />
                        {new_changes.not_sure}
                    </div> */}
                </div>
            </div>
        )
    }
}