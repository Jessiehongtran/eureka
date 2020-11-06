import React from 'react';
import './slider.scss'

export default class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sliderRange: 10
        }
        this.handleChangeSlider = this.handleChangeSlider.bind(this)
    }

    handleChangeSlider(e){
        this.setState({sliderRange: e.target.value})
    }

    render(){
        const { sliderRange } = this.state

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="slider-container">
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            value={sliderRange}
                            className="slider"
                            onChange={e => this.handleChangeSlider(e)}
                        />
                    </div>
                    <div className="text-container">
                        <p>I want to grow</p>
                        <p className="tree-number">{sliderRange}</p>
                        <p>trees</p>
                    </div>
                </div>
            </div>
        )
    }
}