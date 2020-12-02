import React from 'react';
import './video.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import { connect } from 'react-redux';
import { getHeader, addHeader, changeHeader, updateHeader } from '../../duck/actions/videoAction';

class Video extends React.Component {
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
            link: "",
            uploaded_link: ""
        }
        this.handleChangeVideo = this.handleChangeVideo.bind(this)
        this.handleChangeHeader = this.handleChangeHeader.bind(this)
        this.handleBlurHeader = this.handleBlurHeader.bind(this)
        this.enterlink = this.enterlink.bind(this)
        this.handleChangeLink = this.handleChangeLink.bind(this)
        this.handleReplaceVideo = this.handleReplaceVideo.bind(this)
        this.getVideo = this.getVideo.bind(this)
    }

    componentDidMount(){
        this.props.getHeader(this.props.sessionID)
        this.getVideo(this.props.sessionID)
    }

    async getVideo(sessionID){
        try {
            const res = await axios.get(`${API_URL}/video/session/${sessionID}`)
            console.log('res in getting video', res.data)
            this.setState({uploaded_link: res.data.video_url})
        } catch (err){
            console.error(err)
        }
    }

    async postVideo(videoData){
        try {
            const res = await axios.post(`${API_URL}/video/session/${this.props.sessionID}`, videoData, 
                                    {
                                    //     withCredentials: true,
                                        headers: {
                                        'Content-Type': 'multipart/form-data'
                                            }
                                    }
                                )
            console.log('res in uploading video', res.data)
        } catch (err){
            console.error(err)
        }
    }


    handleChangeVideo(e){
        const video = e.target.files[0]
        this.setState({
            video: video,
            have_video: true,
            video_uploaded: true
        })
        console.log('video', video)

        const formData = new FormData()
        formData.append('file', video)
        this.postVideo(formData)
    

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

    handleChangeHeader(e){
        this.props.changeHeader({
            text: e.target.value
        })
    }

    handleBlurHeader(e, headerID){
        if (headerID){
            //update header
            this.props.updateHeader({ text: e.target.value}, headerID )
        } else {
            //post header
            const header = {
                text: e.target.value,
                sessionID: this.props.sessionID
            }
            this.props.addHeader(header)
        }
    }


    render(){

        const { have_link, have_video, link, video, video_uploaded, link_uploaded, show_link } = this.state;

        const { header } = this.props;

        return (
            <div className="video-container">
                {this.props.order_number 
                    ? <h1 style={{color: 'silver', textAlign: 'left', width: '100%', left: '25%', top: '10px', position: 'absolute'}}>#{this.props.order_number}</h1>
                    : null
                }
                <div className="header">
                    <input
                        type="text"
                        placeholder="Header for video"
                        value={ header && header.text ? header.text : "" }
                        onChange={this.handleChangeHeader}
                        onBlur= {e => this.handleBlurHeader(e, header.id)}
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
                        src= {video !== null? URL.createObjectURL(video) : link.length > 0 && this.isValidUrl(link) ? link.replace("watch?v=", "embed/") : this.state.uploaded_link} 
                        frameBorder="0" 
                        allowFullScreen scrolling="no"></iframe>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('check state in video', state)
    return {
        header: state.videoReducer.header
    }
}

export default connect(mapStateToProps, { getHeader, addHeader, changeHeader, updateHeader })(Video);

