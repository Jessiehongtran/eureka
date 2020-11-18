import React from 'react';
import '../dragdrop1.scss';
import axios from 'axios';
import { API_URL } from '../../../apiConfig';
import { connect } from 'react-redux'

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
        console.log('change')
        this.setState({header: e.target.value})
    }

    componentDidMount(){
        if (this.props.sessionID){
            this.getHeader(this.props.sessionID);
            this.getCategory(this.props.sessionID);
        }
    }

    async getHeader(sessionID){
        //get header of this session
        try {
            const res = await axios.get(`${API_URL}/text/session/${sessionID}`)
            console.log('res in getting header', res.data)
            this.setState({header: res.data[0]})
        } catch (err){
            console.error(err)
        }
    }

    async getCategory(sessionID){
        //get category of this session
        try {
            const res = await axios.get(`${API_URL}/category/session/${sessionID}`)
            console.log('res in getting category', res.data)
            this.setState({category_list: res.data})
        } catch (err){
            console.error(err)
        }
    }

    async postHeader(header){
        //post header as text
        const textToPost = {
            text: header,
            sessionID: this.props.sessionID
        }
        try {
            const res = await axios.post(`${API_URL}/text`, textToPost)
            console.log('res in posting header', res.data)
        } catch (err){
            console.error(err)
        }
    }

    async updateHeader(newHeader, headerId){
        const change = {
            text: newHeader
        }
        try {
            const res = await axios.patch(`${API_URL}/text/${headerId}`, change)
            console.log('res in updating header', res.data)
        } catch (err){
            console.error(err)
        }

    }

    async updateCategory(newCategory, categoryId){
        const change = {
            category_name: newCategory
        }
        try {
            const res = await axios.patch(`${API_URL}/category/${categoryId}`, change)
            console.log(res.data)
        } catch (err){
            console.error(err)
        }
    }

    async deleteCategory(categoryId){
        try {
            const res = await axios.delete(`${API_URL}/category/${categoryId}`)
            console.log(res.data)
        } catch (err){
            console.error(err)
        }
    }

    async postCategory(category){
        //post category
        const categoryToPost = {
            category_name: category,
            sessionID: this.props.sessionID
        }
        try {
            const res = await axios.post(`${API_URL}/category`, categoryToPost)
            console.log('res in posting category', res.data)
        } catch (err){
            console.error(err)
        }
    }

    async handleBlurHeader(e){
        const { header } = this.state;
        //post header if id is not there
        if (header && header.id){
            this.updateHeader(e.target.value, header.id)
        } else {
            this.postHeader(e.target.value)
        }
    }

    handleChangeCategory(e, categoryInd){
        const { category_list } = this.state;
        let categoryToUpdate = category_list.filter(cate => cate.id === categoryInd)[0];
        categoryToUpdate.category_name = e.target.value;
        this.setState({category_list: category_list})
    }

    async findCategory(categoryId){
        let category = null
        try {
            const res = await axios.get(`${API_URL}/category/${categoryId}`)
            category = res.data[0]
        } catch (err){
            console.error(err)
        }
        return category
    }

    async handleBlurCategory(e, categoryInd){
        //post category if id has not existed
        const foundCategory = await this.findCategory(categoryInd);
        console.log('foundCategory', foundCategory)
        if (foundCategory !== undefined){
            this.updateCategory(e.target.value, categoryInd);
        } else {
            this.postCategory(e.target.value);
        }
    }

    addCategory(){
        //post category to backend here

        this.setState({ 
            category_list: [
                ...this.state.category_list,
                {
                    id: this.state.category_list.length + 1,
                    category_name: "category name"
                }
            ]
        })
    }


    render(){

        //now we don't know category name in advance, how can we classify
        const { category_list } = this.state;
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

        const { isPublished } = this.props;
       
        return (
            <div className="container">
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Type a header..." 
                        className="header"
                        value={this.state.header && this.state.header.text ? this.state.header.text : ""}
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
    return {
        isPublished: state.courseReducer.isPublished
    }
}

export default connect(mapStateToProps, {})(InputDragDrop1);