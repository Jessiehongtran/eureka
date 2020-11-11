import React from 'react';
import { Link } from 'react-router-dom';
import './wordRain.scss'

export default class WordRain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            origin_text: "",
            speed: 50,
            i: 0,
            showText: false
        }
        this.raining = this.raining.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleBlurText = this.handleBlurText.bind(this)
    }

    raining(){
        if (this.state.i < this.state.origin_text.length) {
            this.setState({
                text: this.state.text + this.state.origin_text.charAt(this.state.i),
                i: this.state.i + 1,
                showText: true
            });
           
            setTimeout(this.raining, this.state.speed);
        }
    }

    handleChangeText(e){
        this.setState({
            origin_text: e.target.value,
            showText: false
        })
    }

    handleBlurText(){
        console.log(this.state.origin_text)
        //post to backend
    }

    render(){
     
        return (
            <>
                <div className="rain">
                    <input
                        type="text"
                        placeholder="Start typing..." 
                        value={this.state.origin_text}
                        onChange={this.handleChangeText}
                        onBlur={this.handleBlurText}
                        className="rain-input"
                    />
                    {!this.state.showText
                    ? <button onClick={() => this.raining()}>Get a nutshell</button>
                    : <p className="text">{this.state.text}</p>}
                </div>
            </>
        )
    }
}