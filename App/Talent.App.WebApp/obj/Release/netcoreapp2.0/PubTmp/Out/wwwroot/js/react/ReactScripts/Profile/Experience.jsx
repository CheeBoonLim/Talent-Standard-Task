/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            showUpdateSection: [],
            newExperience: {
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            }
        }

        this.openAddSection = this.openAddSection.bind(this)
        this.closeAddSection = this.closeAddSection.bind(this)
        this.openUpdateSection = this.openUpdateSection.bind(this)
        this.closeUpdateSection = this.closeUpdateSection.bind(this)
        this.handleNewExperienceChange = this.handleNewExperienceChange.bind(this)
        this.handleNewDateChange = this.handleNewDateChange.bind(this)
        this.handleExperienceChange = this.handleExperienceChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.saveNewExperience = this.saveNewExperience.bind(this)
        this.saveEditedExperience = this.saveEditedExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.experienceData.length !== this.props.experienceData.length) {
            const updateSection = []
            nextProps.experienceData.forEach(() => {
                updateSection.push(false)
            });
            this.setState({ showUpdateSection: updateSection })
        }
    }

    openAddSection() {
        this.setState({ showAddSection: true })
    }

    closeAddSection() {
        this.setState({ showAddSection: false })
    }

    openUpdateSection(index) {
        const updateSection = this.state.showUpdateSection
        updateSection[index] = true
        this.setState({ showUpdateSection: updateSection })
    }

    closeUpdateSection(index) {
        const updateSection = this.state.showUpdateSection
        updateSection[index] = false
        this.setState({ showUpdateSection: updateSection })
    }

    handleNewExperienceChange(event) {
        const data = Object.assign({
            company: this.state.newExperience.company,
            position: this.state.newExperience.position,
            responsibilities: this.state.newExperience.responsibilities,
            start: this.state.newExperience.start,
            end: this.state.newExperience.end
        })
        data[event.target.name] = event.target.value
        this.setState({ newExperience: data })
    }

    handleNewDateChange(date, name) {
        const data = Object.assign({
            company: this.state.newExperience.company,
            position: this.state.newExperience.position,
            responsibilities: this.state.newExperience.responsibilities,
            start: this.state.newExperience.start,
            end: this.state.newExperience.end
        })
        data[name] = date;
        this.setState({ newExperience: data })
    }

    handleExperienceChange(index, event) {
        const data = Object.assign({ experience: [] })
        data.experience.push(...this.props.experienceData)
        data.experience[index][event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    handleDateChange(index, date, name) {
        const data = Object.assign({ experience: [] })
        data.experience.push(...this.props.experienceData)
        data.experience[index][name] = date
        this.props.updateProfileData(data)
    }

    saveNewExperience() {
        const data = Object.assign({ experience: [] })
        data.experience.push(...this.props.experienceData, this.state.newExperience)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeAddSection()
        this.setState({
            newExperience: {
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            }
        })
    }

    saveEditedExperience(index) {
        const data = Object.assign({ experience: [] })
        data.experience.push(...this.props.experienceData)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeUpdateSection(index)
    }

    deleteExperience(index) {
        const data = Object.assign({ experience: [] })
        data.experience.push(...this.props.experienceData)
        data.experience.splice(index, 1)
        console.log(data)
        this.props.saveProfileData(data)
    }
    
    render() {
        let addSection = [];
        if (this.state.showAddSection) {
            addSection = <React.Fragment>
                <div className="ui grid">
                    <div className="two column row" style={{ paddingBottom: "0px" }}>
                        <div className='column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Company:"
                                name="company"
                                value={this.state.newExperience.company}
                                controlFunc={this.handleNewExperienceChange}
                                maxLength={80}
                                placeholder="Company"
                                errorMessage="Please enter a valid company"
                            />
                        </div>
                        <div className='column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Position:"
                                name="position"
                                value={this.state.newExperience.position}
                                controlFunc={this.handleNewExperienceChange}
                                maxLength={80}
                                placeholder="Position"
                                errorMessage="Please enter a valid position"
                            />
                        </div>
                    </div>
                    <div id="MyDatePicker" className="two column row" style={{ paddingBottom: "0px" }}>
                        <div className='column'>
                            <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>Start Date:</label>
                            <DatePicker
                                selected={this.state.newExperience.start}
                                onChange={(date) => this.handleNewDateChange(date, "start")}
                                placeholderText="Start Date"
                                dateFormat="DD/MM/YYYY"
                            />
                        </div>
                        <div className='column'>
                            <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>End Date:</label>
                            <DatePicker
                                selected={this.state.newExperience.end}
                                onChange={(date) => this.handleNewDateChange(date, "end")}
                                placeholderText="End Date"
                                dateFormat="DD/MM/YYYY"
                            />
                        </div>
                    </div>
                    <div className="row" style={{ paddingBottom: "0px" }}>
                        <div className='column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Responsibilities:"
                                name="responsibilities"
                                value={this.state.newExperience.responsibilities}
                                controlFunc={this.handleNewExperienceChange}
                                maxLength={80}
                                placeholder="Responsibilities"
                                errorMessage="Please enter a valid responsibilities"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='column'>
                            <button type="button" className="ui teal button" onClick={this.saveNewExperience}>Add</button>
                            <button type="button" className="ui button" onClick={this.closeAddSection}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }

        return (
            <React.Fragment>
                {addSection}
                <div className='row'>
                    <div className="column">
                        <table className="ui fixed table">
                            <thead>
                                <tr className="row">
                                    <th className="column">Company</th>
                                    <th className="column">Position</th>
                                    <th className="column">Responsibilities</th>
                                    <th className="column">Start</th>
                                    <th className="column">End</th>
                                    <th className="right aligned column"><button type="button" className="ui teal button" onClick={this.openAddSection}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.experienceData.map((experience, index) => {
                                    if (this.state.showUpdateSection[index]) {
                                        return <React.Fragment key= { experience.id }>
                                            <tr className="row">
                                                <td colSpan="3" className='column'>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        label="Company:"
                                                        name="company"
                                                        value={experience.company}
                                                        controlFunc={this.handleExperienceChange.bind(this, index)}
                                                        maxLength={80}
                                                        placeholder="Company"
                                                        errorMessage="Please enter a valid company"
                                                    />
                                                </td>
                                                <td colSpan="3" className='column'>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        label="Position:"
                                                        name="position"
                                                        value={experience.position}
                                                        controlFunc={this.handleExperienceChange.bind(this, index)}
                                                        maxLength={80}
                                                        placeholder="Position"
                                                        errorMessage="Please enter a valid position"
                                                    />
                                                </td>
                                            </tr>
                                            <tr id="MyDatePicker" className="row">
                                                <td colSpan="3" className='column' style={{ borderTop: "0px" }}>
                                                    <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>Start Date:</label>
                                                    <DatePicker
                                                        selected={moment(experience.start)}
                                                        onChange={(date) => this.handleDateChange(index, date, "start")}
                                                        placeholderText="Start Date"
                                                        dateFormat="DD/MM/YYYY"
                                                    />
                                                </td>
                                                <td colSpan="3" className='column' style={{ borderTop: "0px" }}>
                                                    <label style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px", display: "inline-block" }}>End Date:</label>
                                                    <DatePicker
                                                        selected={moment(experience.end)}
                                                        onChange={(date) => this.handleDateChange(index, date, "end")}
                                                        placeholderText="End Date"
                                                        dateFormat="DD/MM/YYYY"
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="row">
                                                <td colSpan="6" className='column' style={{ borderTop: "0px" }}>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        label="Responsibilities:"
                                                        name="responsibilities"
                                                        value={experience.responsibilities}
                                                        controlFunc={this.handleExperienceChange.bind(this, index)}
                                                        maxLength={80}
                                                        placeholder="Responsibilities"
                                                        errorMessage="Please enter a valid responsibilities"
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="row">
                                                <td colSpan="6" className='column' style={{ borderTop: "0px" }}>
                                                    <button type="button" className="ui teal button" onClick={() => this.saveEditedExperience(index)}>Update</button>
                                                    <button type="button" className="ui button" onClick={() => this.closeUpdateSection(index)}>Cancel</button>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    } else {
                                        return <tr className="row" key={experience.id}>
                                            <td className="column">{experience.company}</td>
                                            <td className="column">{experience.position}</td>
                                            <td className="column">{experience.responsibilities}</td>
                                            <td className="column">{moment(experience.start).format('Do MMM, YYYY')}</td>
                                            <td className="column">{moment(experience.end).format('Do MMM, YYYY')}</td>
                                            <td className="right aligned column"><i className="pencil icon" onClick={() => this.openUpdateSection(index)}></i><i className="cancel icon" onClick={() => this.deleteExperience(index)}></i></td>
                                        </tr>
                                    }
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
