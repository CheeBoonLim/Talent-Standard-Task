/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        this.setState({
            showEditSection: true,
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({
            linkedAccounts: {
                linkedIn: this.props.linkedAccounts.linkedIn,
                github: this.props.linkedAccounts.github
            }
        })
        data.linkedAccounts[event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    saveLinkedAccounts() {
        const data = Object.assign({
            linkedAccounts: {
                linkedIn: this.props.linkedAccounts.linkedIn,
                github: this.props.linkedAccounts.github
            }
        })
        console.log(data)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid GitHub Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveLinkedAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <button type="button" className="ui primary button" style={{ width: "200px", marginRight: "15px" }} onClick={() => location.href = linkedIn}><i className="linkedin icon"></i>LinkedIn</button>
                    <button type="button" className="ui secondary button" style={{ width: "200px", marginLeft: "15px" }} onClick={() => location.href = github}><i className="github icon"></i>GitHub</button>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}