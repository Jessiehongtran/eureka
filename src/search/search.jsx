import React from 'react';
import './search.scss';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="search">
                <input 
                    placeholder="Search..."
                />
            </div>
        )
    }
}