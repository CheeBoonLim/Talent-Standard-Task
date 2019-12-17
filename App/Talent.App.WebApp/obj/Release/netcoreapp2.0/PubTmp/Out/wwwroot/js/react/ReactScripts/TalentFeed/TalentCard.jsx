import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import TalentCardDetail from './TalentCardDetail.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideo: true
        }

        this.updateShowVideo = this.updateShowVideo.bind(this)
        this.handleClick = this.handleClick.bind(this)
    };

    updateShowVideo(value) {
        this.setState({ showVideo: value });
    }

    handleClick(event, url) {
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }
        url && window.open(url, "_blank");
        event.preventDefault();
    }

    render() {
        let id = this.props.talent.id ? this.props.talent.id : ""
        let name = this.props.talent.name ? this.props.talent.name : ""
        let cvUrl = this.props.talent.cVUrl ? this.props.talent.cVUrl : ""
        let linkedInUrl = this.props.talent.linkedInUrl ? this.props.talent.linkedInUrl : ""
        let githubUrl = this.props.talent.githubUrl ? this.props.talent.githubUrl : ""
        let skills = this.props.talent.skills ? this.props.talent.skills :[]
        return (
            <div className="ui card" style={{ width: "100%" }}>
                <div className="extra content" style={{ color: "#3d3838" }}>
                    <div className="left floated">
                        <h3>{name}</h3>
                    </div>
                    <div className="right floated" style={{ color: "#3d3838" }}>
                        <Icon name='star' size='big' onClick={() => { console.log("like") }} />
                    </div>
                </div>
                <div className="content" style={{ padding: "0" }}>
                    <TalentCardDetail showVideo={this.state.showVideo} talent={this.props.talent}/>
                </div>
                <div className="extra content">
                    <table style={{ width: "100%", fontSize: "80%", borderCollapse: "collapse", color: "#3d3838", textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td>
                                    {this.state.showVideo ? <Icon name='user' size='big' onClick={() => this.updateShowVideo(false)}/> :
                                                            <Icon name='video camera' size='big' onClick={() => this.updateShowVideo(true)}/>
                                    }
                                </td>
                                <td>
                                    <Icon name='file pdf outline' size='big' onClick={(event) => this.handleClick(event, cvUrl)}/>
                                </td>
                                <td>
                                    <Icon name='linkedin' size='big' onClick={(event) => this.handleClick(event, linkedInUrl)}/>
                                </td>
                                <td>
                                    <Icon name='github' size='big' onClick={(event) => this.handleClick(event, githubUrl)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="extra content" style={{ width: "100%" }}>
                    <div className="left floated ">
                        {skills.map((skill) =>
                            <button key={skill} className="ui blue basic button" style={{ padding: "10px 15px" }}>{skill}</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

