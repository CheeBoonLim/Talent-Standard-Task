import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        const data = Object.assign({
            jobSeekingStatus: {
                status: this.props.status
            }
        })
        data.jobSeekingStatus.status = value;
        console.log(data)
        this.props.saveProfileData(data)
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px", display: "inline-block" }}>Current Status</label>
                <div className="ui form">
                    <div className="field">
                        <Checkbox
                            radio
                            label='Actively looking for a job'
                            name='status'
                            value='Actively looking for a job'
                            checked={this.props.status === 'Actively looking for a job'}
                            onChange={() => this.handleChange('Actively looking for a job')}
                        />
                    </div>
                    <div className="field">
                        <Checkbox
                            radio
                            label='Not looking for a job at the moment'
                            name='status'
                            value='Not looking for a job at the moment'
                            checked={this.props.status === 'Not looking for a job at the moment'}
                            onChange={() => this.handleChange('Not looking for a job at the moment')}
                        />
                    </div>
                    <div className="field">
                        <Checkbox
                            radio
                            label='Currently employed but open to offers'
                            name='status'
                            value='Currently employed but open to offers'
                            checked={this.props.status === 'Currently employed but open to offers'}
                            onChange={() => this.handleChange('Currently employed but open to offers')}
                        />
                    </div>
                    <div className="field">
                        <Checkbox
                            radio
                            label='Will be available on later date'
                            name='status'
                            value='Will be available on later date'
                            checked={this.props.status === 'Will be available on later date'}
                            onChange={() => this.handleChange('Will be available on later date')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}