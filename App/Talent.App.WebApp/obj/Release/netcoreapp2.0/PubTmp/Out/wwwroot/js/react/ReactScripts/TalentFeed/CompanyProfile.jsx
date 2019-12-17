import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profilePhotoUrl = this.props.companyDetails.profilePhotoUrl ? this.props.companyDetails.profilePhotoUrl : "";
        let name = this.props.companyDetails.companyContact.name ? this.props.companyDetails.companyContact.name : "";
        let location = this.props.companyDetails.companyContact.location ? this.props.companyDetails.companyContact.location : "";
        let phone = this.props.companyDetails.companyContact.phone ? this.props.companyDetails.companyContact.phone : "";
        let email = this.props.companyDetails.companyContact.email ? this.props.companyDetails.companyContact.email : "";
        let profilePhoto = [];
        if (profilePhotoUrl == "") {
            profilePhoto = <img className="ui mini circular image" src={profilePhotoUrl || "https://react.semantic-ui.com/images/wireframe/square-image.png"} />
        }
        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned header">
                        {profilePhoto}
                        <h3 style={{ margin: "3px 0 0 0"}}>{name}</h3>
                    </div>
                    <div className="center aligned">
                        <p style={{ color: "#BCBCBC" }}><i className="marker icon"></i>{location.city}, {location.country}</p>
                    </div>
                    <div className="center aligned description">
                        <p style={{ margin: "5px 0 0 0", color: "#808080" }}>We currently do not have specific skills that we desire.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="left aligned author">
                        <p style={{ color: "#BCBCBC" }}><i className="call icon"></i>: {phone}</p>
                        <p style={{ color: "#BCBCBC" }}><i className="mail icon"></i>: {email}</p>
                    </div>
                </div>
            </div>
        )
    }
}