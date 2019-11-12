import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.saveVisaStatus = this.saveVisaStatus.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        })
        data[event.target.name] = event.target.value
        event.target.value == "Citizen" || event.target.value == "Permanent Resident" ?
            (
                data.visaExpiryDate = null,
                this.props.saveProfileData(data)
            ) :
            this.props.updateProfileData(data)
    }

    handleDateChange(date, name) {
        const data = Object.assign({
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        })
        data[name] = date;
        this.props.updateProfileData(data)
    }

    saveVisaStatus() {
        const data = Object.assign({
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        })
        console.log(data)
        this.props.saveProfileData(data)
    }

    render() {
        let visaExpiryDate = [];
        const visaStatus = this.props.visaStatus
        if (visaStatus == "Work Visa" || visaStatus == "Student Visa") {
            visaExpiryDate = <React.Fragment>
                <div className='column'>
                    <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>Visa expiry date</label>
                    <DatePicker
                        selected={this.props.visaExpiryDate ? moment(this.props.visaExpiryDate) : moment()}
                        onChange={(date) => this.handleDateChange(date, "visaExpiryDate")}
                        placeholderText="Visa expiry date"
                        dateFormat="DD/MM/YYYY"
                    />
                </div>
                <div className='column'>
                    <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>&nbsp;</label>
                    <br />
                    <button type="button" className="ui teal button" onClick={this.saveVisaStatus}>Save</button>
                </div>
            </React.Fragment>
        }

        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div id="MyDatePicker" className="three column row">
                        <div className='column'>
                            <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>Visa type</label>
                            <select className="ui right labeled dropdown"
                                value={this.props.visaStatus}
                                onChange={this.handleChange}
                                name="visaStatus">
                                <option value="Citizen">Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                        </div>
                        {visaExpiryDate}
                    </div>
                </div>
            </div>
        )
    }
}