import React from 'react';
import { Link } from 'react-router-dom'

export default class Overview extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <ol 
                style={{
                    display: 'flex', 
                    flexDirection: 'column',
                    color: 'grey',
                    marginTop: '50px',
                    marginLeft: '50px',
                    textAlign: 'left'
                }}>
                <h3>Modules</h3>
                <li><Link to="/dragdrop/1">Drag and drop 1</Link></li>
                <li><Link to="/dragdrop/2">Drag and drop 2</Link></li>
                <li><Link to="/hover">Hover</Link></li>
                <li><Link to="/type">Type</Link></li>
                <li><Link to="/rain">Words falling out</Link></li>
                <li><Link to="/transition">Transition</Link></li>
                <li><Link to="/slider">Slider</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/video">Video</Link></li>
            </ol>
        )
    }
}