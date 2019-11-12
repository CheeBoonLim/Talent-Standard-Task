/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            showUpdateSection: [],
            newLanguage: {
                    name: "",
                    level: ""
            }
        }

        this.openAddSection = this.openAddSection.bind(this)
        this.closeAddSection = this.closeAddSection.bind(this)
        this.openUpdateSection = this.openUpdateSection.bind(this)
        this.closeUpdateSection = this.closeUpdateSection.bind(this)
        this.handleNewLanguageChange = this.handleNewLanguageChange.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.saveNewLanguage = this.saveNewLanguage.bind(this)
        this.saveEditedLanguage = this.saveEditedLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.languageData.length !== this.props.languageData.length) {
            const updateSection = []
            nextProps.languageData.forEach(() => {
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

    handleNewLanguageChange(event) {
        const data = Object.assign({
                name: this.state.newLanguage.name,
                level: this.state.newLanguage.level
        })
        data[event.target.name] = event.target.value
        this.setState({ newLanguage: data })
    }

    handleLanguageChange(index, event) {
        const data = Object.assign({ languages: [] })
        data.languages.push(...this.props.languageData)
        data.languages[index][event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    saveNewLanguage() {
        const data = Object.assign({ languages: [] })
        data.languages.push(...this.props.languageData, this.state.newLanguage)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeAddSection()
        this.setState({
            newLanguage: {
                name: "",
                level: ""
            }
        })
    }

    saveEditedLanguage(index) {
        const data = Object.assign({ languages: [] })
        data.languages.push(...this.props.languageData)
        console.log(data)
        this.props.saveProfileData(data)
        this.closeUpdateSection(index)
    }

    deleteLanguage(index) {
        const data = Object.assign({ languages: [] })
        data.languages.push(...this.props.languageData)
        data.languages.splice(index, 1)
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
                                    content={this.state.newLanguage.name}
                                    controlFunc={this.handleNewLanguageChange}
                                    placeholder="Add Language"
                                    errorMessage="Please enter a valid language"
                                    isError={false}
                                />
                            </div>
                            <div className='column'>
                                <select className="ui right labeled dropdown"
                                    value={this.state.newLanguage.level}
                                    onChange={this.handleNewLanguageChange}
                                    name="level">
                                    <option value="">Language Level</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Native/Bilingual">Native/Bilingual</option>
                                </select>
                            </div>
                            <div className='column'>
                                <button type="button" className="ui teal button" onClick={this.saveNewLanguage}>Add</button>
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
                                    <th className="column">Language</th>
                                    <th className="column">Level</th>
                                    <th className="right aligned column"><button type="button" className="ui teal button" onClick={this.openAddSection}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.languageData.map((language, index) => {
                                    if (this.state.showUpdateSection[index]) {
                                        return <tr className="row" key={language.id}>
                                            <td className='column'>
                                                <SingleInput
                                                    inputType="text"
                                                    name="name"
                                                    content={language.name}
                                                    controlFunc={this.handleLanguageChange.bind(this, index)}
                                                    placeholder="Add Language"
                                                    errorMessage="Please enter a valid language"
                                                    isError={false}
                                                />
                                            </td>
                                            <td className='column'>
                                                <select className="ui right labeled dropdown"
                                                    value={language.level}
                                                    onChange={this.handleLanguageChange.bind(this, index)}
                                                    name="level">
                                                    <option value="">Language Level</option>
                                                    <option value="Basic">Basic</option>
                                                    <option value="Conversational">Conversational</option>
                                                    <option value="Fluent">Fluent</option>
                                                    <option value="Native/Bilingual">Native/Bilingual</option>
                                                </select>
                                            </td>
                                            <td className='column'>
                                                <button type="button" className="ui blue basic button" onClick={() => this.saveEditedLanguage(index)}>Update</button>
                                                <button type="button" className="ui red basic button" onClick={() => this.closeUpdateSection(index)}>Cancel</button>
                                            </td>
                                        </tr>
                                    } else {
                                        return <tr className="row" key={language.id}>
                                            <td className="column">{language.name}</td>
                                            <td className="column">{language.level}</td>
                                            <td className="right aligned column"><i className="pencil icon" onClick={() => this.openUpdateSection(index)}></i><i className="cancel icon" onClick={() => this.deleteLanguage(index)}></i></td>
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