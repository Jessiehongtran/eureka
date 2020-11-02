import React from 'react';
import './wordRain.scss'

export default class WordRain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            txt: "When it comes to resilience, knowledge is power! All that stuff about 'a stich in time' is a good advice when it comes to your resilience. It reminds us to take corrective action quickly when needed. Keep an eye out for any habits that can be warning signs of sagging resilience. In particular, watch out for churning things over in your mind non-stop, avoiding people rather than dealing with things, or having anger outbursts. These are not a big deal from time to time. In fact, they're perfectly normal-welcome to the human racel. But when they show up all the time they can be a red flag. If that's the case, it might mean you need a new perspective on things, or it might mean it's a good time to reach out for some help.",
            speed: 50,
            i: 0,
            showText: false
        }
        this.raining = this.raining.bind(this)
    }

    raining(){
        if (this.state.i < this.state.txt.length) {
            this.setState({
                text: this.state.text + this.state.txt.charAt(this.state.i),
                i: this.state.i + 1,
                showText: true
            });
           
            setTimeout(this.raining, this.state.speed);
        }
    }

    render(){
     
        return (
            <div className="rain">
                {!this.state.showText
                ? <button onClick={() => this.raining()}>Get a nutshell</button>
                : <p className="text">{this.state.text}</p>}
            </div>
        )
    }
}