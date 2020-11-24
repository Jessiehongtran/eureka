import React from 'react';
import './video.mini.scss'

export default class VideoMini extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="video-mini">
                <input
                    type="text"
                    placeholder="Header for video"
                    className="header"
                    disabled
                />
                <div className="upload">
                    <label className="video-upload">
                        Upload video
                        <input
                            type="file"
                            disabled 
                        />
                    </label>
                </div>
            </div>
        )
    }
}