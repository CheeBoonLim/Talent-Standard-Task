import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from './TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {
                companyContact: {},
            }
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.loadTalentSnapshot = this.loadTalentSnapshot.bind(this);
        this.updateNewLoadedTalentSnapshot = this.updateNewLoadedTalentSnapshot.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadEmployerData();
        this.loadTalentSnapshot();
    };

    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentservicesprofilecblim.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    console.log("employerData", employerData)
                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }

    updateWithoutSave(newData) {
        let newSD = Object.assign({}, this.state.companyDetails, newData)
        this.setState({
            companyDetails: newSD
        })
    }

    loadTalentSnapshot() {
        let position = this.state.loadPosition;
        let number = this.state.loadNumber;
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentservicesprofilecblim.azurewebsites.net/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            data: { position: position, number: number },
            type: "GET",
            success: function (res) {
                console.log(res)
                if (res.data) {
                    this.updateNewLoadedTalentSnapshot(res.data);
                }
            }.bind(this)
        })
    }

    updateNewLoadedTalentSnapshot(loadedTalentSnapshot) {
        let newList = this.state.watchlist.slice();
        let newPosition = this.state.loadPosition;

        newList = newList.concat(loadedTalentSnapshot);
        newPosition = newPosition + loadedTalentSnapshot.length;

        this.setState({
            watchlist: newList,
            loadPosition: newPosition
        });
    }

    handleScroll() {
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) || ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
            $("#load-more-loading").show();
            //load ajax and update states
            //call state and update state;
            this.loadTalentSnapshot();
        }
    };

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile companyDetails={this.state.companyDetails} />
                    </div>
                    <div className="eight wide column">
                        {this.state.watchlist.map((talent) =>
                            <TalentCard key={talent.id} talent={talent}/>
                        )}
                        <p id="load-more-loading">
                            <img src="/images/rolling.gif" alt="Loading…" />
                        </p>
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}