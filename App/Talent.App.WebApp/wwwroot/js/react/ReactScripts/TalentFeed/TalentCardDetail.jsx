import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);

        this.renderVideo = this.renderVideo.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    };

    render() {
        return (
            this.props.showVideo ? this.renderVideo() : this.renderProfile()
        )
    }

    renderVideo() {
        let videoUrl = this.props.talent.videoUrl ? this.props.talent.videoUrl : "https://www.youtube.com/watch?v=ysz5S6PU-U"
        return (
            <ReactPlayer url={videoUrl} controls={true} width='100%' height='100%' />
        )
    }

    renderProfile() {
        let photoId = this.props.talent.photoId ? this.props.talent.photoId : "https://react.semantic-ui.com/images/wireframe/image.png"
        let currentEmployment = this.props.talent.currentEmployment ? this.props.talent.currentEmployment : "Unknown"
        let visa = this.props.talent.visa ? this.props.talent.visa : "Unknown"
        let level = this.props.talent.level ? this.props.talent.level : "Unknown"
        return (
            <div className="ui grid container">
                <div className="eight wide column" style={{ padding: "14px 0" }}>
                    <img src={photoId} style={{ width: "100%" }} />
                </div>
                <div className="eight wide column" style={{ padding: "30px 20px" }}>
                    <div role="list" className="ui list">
                        <div role="listitem" className="item">
                            <div className="header">Talent snapshot</div>
                        </div>
                        <div role="listitem" className="item">
                            <div className="header" style={{ fontWeight: "normal" }}>CURRENT EMPLOYER</div>
                            {currentEmployment}
                        </div>
                        <div role="listitem" className="item">
                            <div className="header" style={{ fontWeight: "normal" }}>VISA STATUS</div>
                            {visa}
                        </div>
                        <div role="listitem" className="item">
                            <div className="header" style={{ fontWeight: "normal" }}>POSITION</div>
                            {level}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}