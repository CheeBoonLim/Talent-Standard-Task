import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showEditSection: false,
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
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
            address: {
                number: this.props.addressData.number,
                street: this.props.addressData.street,
                suburb: this.props.addressData.suburb,
                postCode: this.props.addressData.postCode,
                city: this.props.addressData.city,
                country: this.props.addressData.country
            }
        })
        data.address[event.target.name] = event.target.value
        this.props.updateProfileData(data)
    }

    saveAddress() {
        const data = Object.assign({
            address: {
                number: this.props.addressData.number,
                street: this.props.addressData.street,
                suburb: this.props.addressData.suburb,
                postCode: this.props.addressData.postCode,
                city: this.props.addressData.city,
                country: this.props.addressData.country
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
        let number = this.props.addressData ? this.props.addressData.number : ""
        let street = this.props.addressData ? this.props.addressData.street : ""
        let suburb = this.props.addressData ? this.props.addressData.suburb : ""
        let postCode = this.props.addressData ? this.props.addressData.postCode : ""
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.props.addressData.country;
        const selectedCity = this.props.addressData.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value=""> Select a town or city</option>
                {popCities}
            </select><br /></span>
        }
        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={number}
                                controlFunc={this.handleChange}
                                maxLength={10}
                                placeholder="Enter your number"
                                errorMessage="Please enter a valid number"
                            />
                        </div>
                        <div className='eight wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your street"
                                errorMessage="Please enter a valid street"
                            />
                        </div>
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your suburb"
                                errorMessage="Please enter a valid suburb"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='six wide column field'>
                            <label>Country</label>
                            <select className="ui right labeled dropdown"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">

                                <option value="">Select a country</option>
                                {countriesOptions}
                            </select>
                        </div>
                        <div className='six wide column field'>
                            <label>City</label>
                            {citiesOptions}
                        </div>
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Post Code"
                                name="postCode"
                                value={postCode}
                                controlFunc={this.handleChange}
                                maxLength={10}
                                placeholder="Enter your post code"
                                errorMessage="Please enter a valid post code"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='column'>
                            <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderDisplay() {
        let address = this.props.addressData.number && this.props.addressData.street && this.props.addressData.suburb && this.props.addressData.postCode ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        this.handleChangeAndSaveNationality = this.handleChangeAndSaveNationality.bind(this)
    }

    handleChangeAndSaveNationality(event) {
        const data = Object.assign({}, this.props.nationalityData)
        data[event.target.name] = event.target.value
        console.log(data)
        this.props.saveProfileData(data)
    }
    
    render() {
        let countriesOptions = [];
        const selectedCountry = this.props.nationalityData ? this.props.nationalityData : "";
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className='row'>
                <div className="ui six wide column">
                    <select className="ui right labeled dropdown"
                        value={selectedCountry}
                        onChange={this.handleChangeAndSaveNationality}
                        name="nationality">

                        <option value="">Select your nationality</option>
                        {countriesOptions}
                    </select>
                </div>
            </div>
        )
    }
}