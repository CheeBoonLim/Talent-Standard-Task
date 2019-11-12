import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Description extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    };

    handleChange(event) {
        const data = Object.assign({
            summary: this.props.summary,
            description: this.props.description
        })
        data[event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    saveDescription() {
        const data = Object.assign({
            summary: this.props.summary,
            description: this.props.description
        })
        console.log(data)
        this.props.saveProfileData(data)
    }

    render() {
        const summaryCharacterLimit = 150;
        const descriptionCharacterLimit = 600;
        let summary = this.props.summary ? this.props.summary : ""
        let description = this.props.description ? this.props.description : ""
        return (
            <div className='ui sixteen wide column'>
                <div className="field" >
                    <ChildSingleInput
                        inputType="text"
                        name="summary"
                        value={summary}
                        controlFunc={this.handleChange}
                        maxLength={summaryCharacterLimit}
                        placeholder="Please provide a short summary about yourself"
                        errorMessage="Please enter a valid summary"
                    />
                </div>
                <p>Summary must be no more than {summaryCharacterLimit} characters.</p>
                <div className="field" >
                    <textarea maxLength={descriptionCharacterLimit} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={description} onChange={this.handleChange}></textarea>
                </div>
                <p>Description must be between 150-{descriptionCharacterLimit} characters.</p>
                <button type="button" className="ui right floated teal button" onClick={this.saveDescription}>Save</button>
            </div>
        )
    }
}
