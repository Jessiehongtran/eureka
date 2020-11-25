import React from 'react';
import './video.scss'

export default class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            video: null,
            header: "",
            have_link: false,
            have_video: false,
            video_uploaded: false,
            link_uploaded: false,
            show_link: false,
            link: ""
        }
        this.handleChangeVideo = this.handleChangeVideo.bind(this)
        this.saveHeader = this.saveHeader.bind(this)
        this.enterlink = this.enterlink.bind(this)
        this.handleChangeLink = this.handleChangeLink.bind(this)
        this.handleReplaceVideo = this.handleReplaceVideo.bind(this)
    }

    handleChangeVideo(e){
        this.setState({
            video: e.target.files[0],
            have_video: true,
            video_uploaded: true
        })

    }

    saveHeader(e){
        this.setState({header: e.target.value})
    }

    enterlink(){
        this.setState({
            show_link: true
        })
    }

    handleChangeLink(e){
        this.setState({
            link: e.target.value,
            have_link: true,
            link_uploaded: true
        })
    }

    handleReplaceVideo(){
        this.setState({
            have_link: false,
            have_video: false,
            show_link: false,
            video_uploaded: false,
            link_uploaded: false,
            video: null,
            link: ""
        })
    }

    isValidUrl(string) {
        try {
          new URL(string);
        } catch (_) {
          return false;  
        }
      
        return true;
      }


    render(){
        console.log('videourl', this.state.videoUrl)
        const { have_link, have_video, link, video, video_uploaded, link_uploaded, show_link } = this.state;

        console.log('have_link', have_link, 'have_video', have_video)

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
                    {!have_video && !have_link
                    ? <label className="video-upload">
                        Upload video
                        <input
                            type="file" 
                            onChange={this.handleChangeVideo}

                        />
                    </label>
                    : video_uploaded ? <button className="change-btn" onClick={() => this.handleReplaceVideo()}>Change video</button> : null}
                    {!have_link && !have_video
                    ? <label className="video-link">
                        <p 
                            className="text"
                            onClick={() => this.enterlink()}
                        >Enter video link</p>
                        {show_link
                        ? <input
                            type="text" 
                            className="link-input"
                            onChange={this.handleChangeLink}
                        />
                        : null}
                     </label>
                    : link_uploaded ? <button className="change-btn" onClick={() => this.handleReplaceVideo()}>Change video</button> : null}
                </div>
                <div className="video-prev">
                    <iframe 
                        className="video" 
                        width="760" 
                        height="515" 
                        src= {video !== null? URL.createObjectURL(video) : link.length > 0 && this.isValidUrl(link) ? link.replace("watch?v=", "embed/") : ""} 
                        frameBorder="0" 
                        allowFullScreen scrolling="no"></iframe>
                    
                </div>
            </div>
        )
    }
}

