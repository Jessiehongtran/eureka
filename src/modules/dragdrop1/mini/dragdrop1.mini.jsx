import React from 'react';
import './dragdrop1.mini.scss';
import { connect } from 'react-redux';

class DragDropMini extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const { header } = this.props;

        return (
            <div className="dragdrop-mini">
                <input
                    type="text"
                    placeholder="Type a header..." 
                    className="header"
                    disabled
                />
                <div className="ans">
                    <input
                        type="text" 
                        className="ans-input"
                        disabled
                    />
                    <button>Add</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        header: state.dragdropReducer.header,
        category_list: state.dragdropReducer.category_list
    }
}

export default connect(mapStateToProps, {})( DragDropMini );
