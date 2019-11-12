/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            showUpdateSection: [],
            newSkill: {
                name: "",
                level: ""
            }
        }

        this.openAddSection = this.openAddSection.bind(this)
        this.closeAddSection = this.closeAddSection.bind(this)
        this.openUpdateSection = this.openUpdateSection.bind(this)
        this.closeUpdateSection = this.closeUpdateSection.bind(this)
        this.handleNewSkillChange = this.handleNewSkillChange.bind(this)
        this.handleSkillChange = this.handleSkillChange.bind(this)
        this.saveNewSkill = this.saveNewSkill.bind(this)
        this.saveEditedSkill = this.saveEditedSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.skillData.length !== this.props.skillData.length) {
            const updateSection = []
            nextProps.skillData.forEach(() => {
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

    handleNewSkillChange(event) {
        const data = Object.assign({
            name: this.state.newSkill.name,
            level: this.state.newSkill.level
        })
        data[event.target.name] = event.target.value
        this.setState({ newSkill: data })
    }

    handleSkillChange(index, event) {
        const data = Object.assign({ skills: [] })
        data.skills.push(...this.props.skillData)
        data.skills[index][event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    saveNewSkill() {
        const data = Object.assign({ skills: [] })
        data.skills.push(...this.props.skillData, this.state.newSkill)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeAddSection()
        this.setState({
            newSkill: {
                name: "",
                level: ""
            }
        })
    }

    saveEditedSkill(index) {
        const data = Object.assign({ skills: [] })
        data.skills.push(...this.props.skillData)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeUpdateSection(index)
    }

    deleteSkill(index) {
        const data = Object.assign({ skills: [] })
        data.skills.push(...this.props.skillData)
        data.skills.splice(index, 1)
        console.log(data)
        this.props.saveProfileData(data)
    }

    render() {
        let addSection = [];
        if (this.state.showAddSection) {
            addSection = <div className='row' style={{ paddingBottom: "0px" }}>
                <div className="column">
                    <div className="ui grid">
                        <div className="three column row">
                            <div className='column'>
                                <SingleInput
                                    inputType="text"
                                    name="name"
                                    content={this.state.newSkill.name}
                                    controlFunc={this.handleNewSkillChange}
                                    placeholder="Add Skill"
                                    errorMessage="Please enter a valid skill"
                                    isError={false}
                                />
                            </div>
                            <div className='column'>
                                <select className="ui right labeled dropdown"
                                    value={this.state.newSkill.level}
                                    onChange={this.handleNewSkillChange}
                                    name="level">
                                    <option value="">Skill Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                            <div className='column'>
                                <button type="button" className="ui teal button" onClick={this.saveNewSkill}>Add</button>
                                <button type="button" className="ui button" onClick={this.closeAddSection}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        return (
            <React.Fragment>
                {addSection}
                <div className='row'>
                    <div className="column">
                        <table className="ui fixed table">
                            <thead>
                                <tr className="row">
                                    <th className="column">Skill</th>
                                    <th className="column">Level</th>
                                    <th className="right aligned column"><button type="button" className="ui teal button" onClick={this.openAddSection}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.skillData.map((skill, index) => {
                                    if (this.state.showUpdateSection[index]) {
                                        return <tr className="row" key={skill.id}>
                                            <td className='column'>
                                                <SingleInput
                                                    inputType="text"
                                                    name="name"
                                                    content={skill.name}
                                                    controlFunc={this.handleSkillChange.bind(this, index)}
                                                    placeholder="Add Skill"
                                                    errorMessage="Please enter a valid skill"
                                                    isError={false}
                                                />
                                            </td>
                                            <td className='column'>
                                                <select className="ui right labeled dropdown"
                                                    value={skill.level}
                                                    onChange={this.handleSkillChange.bind(this, index)}
                                                    name="level">
                                                    <option value="">Skill Level</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                            </td>
                                            <td className='column'>
                                                <button type="button" className="ui blue basic button" onClick={() => this.saveEditedSkill(index)}>Update</button>
                                                <button type="button" className="ui red basic button" onClick={() => this.closeUpdateSection(index)}>Cancel</button>
                                            </td>
                                        </tr>
                                    } else {
                                        return <tr className="row" key={skill.id}>
                                            <td className="column">{skill.name}</td>
                                            <td className="column">{skill.level}</td>
                                            <td className="right aligned column"><i className="pencil icon" onClick={() => this.openUpdateSection(index)}></i><i className="cancel icon" onClick={() => this.deleteSkill(index)}></i></td>
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

