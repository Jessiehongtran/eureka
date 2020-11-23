import React from 'react';
import '../dragdrop1.scss';
import axios from 'axios';
import { API_URL } from '../../../apiConfig';
import { connect } from 'react-redux';
import { getHeader, getCategory, addHeader, addCategory, changeHeader, changeCategory, updateHeader, updateCategory } from '../../../duck/actions/dragdropActions';

class InputDragDrop1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            after_changes: [],
            before_changes: [],
            change: "",
            countChange : 0,
            header: {},
            questionID: 0,
            curCategoryName: "",
            category_list:[]
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
        this.addCategory = this.addCategory.bind(this)
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
       
        let new_after_change = this.state.before_changes.filter((change) => {
            if (change.name == name){
                change.category = cat;
            }
            return change
        })
       

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
        this.props.changeHeader(e.target.value)
    }


    async handleBlurHeader(e){
        const { header } = this.props;
        //post header if id is not there
        if (header && header.id){
            this.props.updateHeader({text: e.target.value}, header.id)
        } else {
            const newHeader = {
                text: e.target.valu,
                sessionID: this.props.sessionID
            }
            this.props.addHeader(newHeader)
        }
    }

    handleChangeCategory(e, categoryInd){
        const toChangeCategory = {
            id: categoryInd,
            category_name: e.target.value,
            sessionID: this.props.sessionID
        }
        this.props.changeCategory(toChangeCategory)
    }


    async handleBlurCategory(e, categoryInd){
        this.props.updateCategory({category_name: e.target.value}, categoryInd);
       
    }

    addCategory(){
        //post category to backend here
        const newCate = {
            category_name: "",
            sessionID: this.props.sessionID
        }
        this.props.addCategory(newCate)
    }


    render(){

        const { isPublished, header, category_list } = this.props;

        //now we don't know category name in advance, how can we classify
        let new_changes = {}
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
       
        return (
            <div className="container">
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Type a header..." 
                        className="header"
                        value={header && header.text ? header.text : ""}
                        onChange={this.handleChangeHeader}
                        onBlur={this.handleBlurHeader}
                        disabled={isPublished ? true : false}
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
                                value={cate.category_name ? cate.category_name : ""}
                                onChange={e => this.handleChangeCategory(e, cate.id)}
                                onBlur={e => this.handleBlurCategory(e, cate.id)}
                                disabled={isPublished ? true : false}
                            />
                            {new_changes[cate.category_name]}
                        </div>
                        )
                    : null
                    }
                    {!isPublished
                    ? <button 
                        className="add-cate-btn"
                        onClick={() => this.addCategory()}
                      >Add category</button>
                    : null}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state in dragdrop', state)
    return {
        isPublished: state.courseReducer.isPublished,
        header: state.dragdropReducer.header,
        category_list: state.dragdropReducer.category_list
    }
}

export default connect(mapStateToProps, { getHeader, getCategory, addHeader, addCategory, changeHeader, changeCategory, updateHeader, updateCategory })(InputDragDrop1);