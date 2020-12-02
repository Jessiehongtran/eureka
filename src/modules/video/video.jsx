import React from 'react';
import './video.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import { connect } from 'react-redux';
import { getHeader, addHeader, changeHeader, updateHeader, addVideo, changeVideo, changeLink, updateVideo, getVideo } from '../../duck/actions/videoAction';

class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // video: null,
            header: {},
            have_link: false,
            have_video: false,
            video_uploaded: false,
            link_uploaded: false,
            show_link: false,
            // link: "",
            uploaded_link: null
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
        console.log('video component mount')
        if (this.props.sessionID && this.props.isPublished){
            this.getHeader(this.props.sessionID)
            this.getVideo(this.props.sessionID)
        }
    }

    async getHeader(sessionID){
        try {
            const res = await axios.get(`${API_URL}/text/session/${sessionID}`)
            if (res.data.length > 0){
                this.setState({ header: res.data[0] })
            } 
        } catch (err){
            console.error(err)
        }
    }

    async getVideo(sessionID){
        try {
            const res = await axios.get(`${API_URL}/video/session/${sessionID}`)
            console.log('res in getting video within component', res.data)
            if (res.data && res.data.id){
                this.setState({uploaded_link: res.data.video_url})
            } else {
                this.setState({uploaded_link: ""})
            }
        } catch (err){
            console.error(err)
        }
    }

    handleChangeVideo(e){
        const video = e.target.files[0]
        this.setState({
            have_video: true,
            video_uploaded: true
        })
        this.props.changeVideo(video)

        const formData = new FormData()
        formData.append('file', video)
        this.props.addVideo(formData, this.props.sessionID)
    }

    enterlink(){
        this.setState({
            show_link: true
        })
    }

    handleChangeLink(e){
        this.setState({
            have_link: true,
            link_uploaded: true
        })
        this.props.changeLink(e.target.value)
    }

    handleReplaceVideo(){
        this.setState({
            have_link: false,
            have_video: false,
            show_link: false,
            video_uploaded: false,
            link_uploaded: false,
            video: null
        })
        this.props.changeLink("")
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

        const { have_link, have_video,  video_uploaded, link_uploaded, show_link, uploaded_link } = this.state;

        const { header, isPublished, link, video,  video_file } = this.props;

        console.log('uploaded_link', uploaded_link)
        console.log('video_file', video_file)
        console.log('video', video)

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
                        value={ this.state.header.text ? this.state.header.text : header && header.text ? header.text : "" }
                        onChange={this.handleChangeHeader}
                        onBlur= {e => this.handleBlurHeader(e, header.id)}
                        disabled={ isPublished ? true : false }
                    />
                </div>
                {!isPublished
                ? <div className="upload">
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
                : null}
                <div className="video-prev">
                    <iframe 
                        className="video" 
                        width="760" 
                        height="515" 
                        src= {uploaded_link !== null ? uploaded_link : video && video.id ? video.video_url : video_file !== null? URL.createObjectURL(video_file) : link.length > 0 && this.isValidUrl(link) ? link.replace("watch?v=", "embed/") : ""} 
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
        header: state.videoReducer.header,
        isPublished: state.courseReducer.isPublished,
        video_file: state.videoReducer.video_file,
        link: state.videoReducer.link,
        video: state.videoReducer.video
    }
}

export default connect(mapStateToProps, { getHeader, addHeader, changeHeader, updateHeader, addVideo, changeLink, changeVideo, getVideo, updateVideo })(Video);

