/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCameraIcon: true,
            showProfilePhoto: false,
            showUploadButton: false,
            newProfilePhoto: ''
        }

        this.displayFilePicker = this.displayFilePicker.bind(this)
        this.fileSelectedChange = this.fileSelectedChange.bind(this)
        this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.imageUrl == '' || nextProps.imageUrl == null) {
            this.setState({
                showCameraIcon: true,
                showProfilePhoto: false
            })
        } else {
            this.setState({
                showCameraIcon: false,
                showProfilePhoto: true
            })
        }
    }

    displayFilePicker() {
        document.getElementById("profilePhoto").click();
    }

    fileSelectedChange() {
        const data = Object.assign({
            profilePhoto: this.props.imageName,
            profilePhotoUrl: this.props.imageUrl
        })
        let acceptedExtenstion = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        let selectedFile = event.target.files[0];
        if (acceptedExtenstion.includes(selectedFile.type)) {
            if (this.props.imageUrl) {
                URL.revokeObjectURL(this.props.imageUrl);
            }
            data.profilePhoto = event.target.files[0].name;
            data.profilePhotoUrl = URL.createObjectURL(event.target.files[0]);
            this.setState({
                showCameraIcon: false,
                showProfilePhoto: true,
                showUploadButton: true,
                newProfilePhoto: selectedFile
            })
            this.props.updateProfileData(data)
            console.log(data);
        } else {
            this.setState({
                showCameraIcon: true,
                showProfilePhoto: false,
                showUploadButton: false
            })
        }
    }

    uploadProfilePhoto() {
        let newProfilePhoto = this.state.newProfilePhoto;
        console.log(newProfilePhoto)
        const formData = new FormData();
        formData.set("profilePhoto", newProfilePhoto);
        var url = this.props.savePhotoUrl;

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
                this.setState({
                    showUploadButton: false
                })
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        const profilePhotoName = this.props.imageName ? this.props.imageName : "";
        const profilePhotoUrl = this.props.imageUrl ? this.props.imageUrl : "";
        let cameraIcon = [];
        let profilePicture = [];
        let uploadButton = [];
        const showCameraIcon = this.state.showCameraIcon;
        if (showCameraIcon == true) {
            cameraIcon = <i className="camera retro huge circular icon" style={{ margin: "0 364px 20px 364px" }} onClick={this.displayFilePicker}></i>
        }
        const showProfilePhoto = this.state.showProfilePhoto;
        if (showProfilePhoto == true) {
            profilePicture = <img src={profilePhotoUrl} alt={profilePhotoName} style={{ margin: "0 364px 20px 364px", verticalAlign: "middle", width: "112px", height: "112px", borderRadius: "100%" }} onClick={this.displayFilePicker}/>
        }
        const showUploadButton = this.state.showUploadButton;
        if (showUploadButton == true) {
            uploadButton = <button type="button" className="ui teal button" style={{ margin: "0 366px" }} onClick={this.uploadProfilePhoto}><i className="upload icon"></i>Upload</button>
        }
        return (
            <React.Fragment>
                <input type="file" id="profilePhoto" name="profilePhoto" style={{ display: "none" }} onChange={this.fileSelectedChange} />
                {cameraIcon}
                {profilePicture}
                {uploadButton}
            </React.Fragment>
        )
    }
}
