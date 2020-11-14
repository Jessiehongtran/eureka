import React from 'react';
import './video.scss'

export default class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            video: null,
            header: ""
        }
        this.handleChangeVideo = this.handleChangeVideo.bind(this)
        this.saveHeader = this.saveHeader.bind(this)
    }

    handleChangeVideo(e){
        this.setState({video: e.target.files[0]})

    }

    saveHeader(e){
        this.setState({header: e.target.value})
    }

    render(){
        console.log('videourl', this.state.videoUrl)

        return (
            <div className="video-container">
                <div className="header">
                    <input
                        type="text"
                        placeholder="Header for video"
                        onBlur= {this.saveHeader}
                    />
                </div>
                <div className="upload">
                    <label className="video-upload">
                        Upload video
                        <input
                            type="file" 
                            onChange={this.handleChangeVideo}

                        />
                    </label>
                </div>
                <div className="video-prev">
                    <iframe 
                        className="video" 
                        width="760" 
                        height="515" 
                        src= {this.state.video !== null? URL.createObjectURL(this.state.video) : ""} 
                        frameBorder="0" 
                        allowFullScreen scrolling="no"></iframe>
                    
                </div>
            </div>
        )
    }
}

