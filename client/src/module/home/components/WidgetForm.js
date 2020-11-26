import React, { Component } from 'react';
import './WidgetForm.css'
import { CgClose } from 'react-icons/cg'
import history from "../../../history";
import {Route, Switch} from "react-router-dom";
import YoutubeCommentsVideoForm from "./form-widgets/YoutubeCommentsVideoForm";
import YoutubeChannelVideoForm from "./form-widgets/YoutubeChannelVideoForm";
import { services } from '../services';
import SelectInput from "../../../shared/components/inputs/SelectInput";
import CityWeatherForm from "./form-widgets/CityWeatherForm";
import ErrorDialog from "../../../shared/components/dialogs/ErrorDialog";
import BasicButton from "../../../shared/components/buttons/BasicButton";
import SuccessDialog from "../../../shared/components/dialogs/SuccessDialog";
import CovidCountryCaseForm from "./form-widgets/CovidCountryCaseForm";
import CovidSummaryCountryForm from "./form-widgets/CovidSummaryCountryForm";
import AccountService from "../../../core/services/account/AccountService";
import TwitterSearchTweetsForm from "./form-widgets/TwitterSearchTweetsForm";
import TwitterLastTweetsForm from "./form-widgets/TwitterLastTweetsForm";
import YoutubeStatisticsChannelForm from "./form-widgets/YoutubeStatisticsChannelForm";
import YoutubeStatisticsVideoForm from "./form-widgets/YoutubeStatisticsVideoForm";
import MenuContext from "../../../core/contexts/MenuContext";
import SpotifyTopTracksUserForm from "./form-widgets/SpotifyTopTracksUserForm";
import SpotifyTopArtistsUserForm from "./form-widgets/SpotifyTopArtistsUserForm";
import SpotifyRecentlyPlayedTracksUserForm from "./form-widgets/SpotifyRecentlyPlayedTracksUserForm";

class WidgetForm extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.state = {
            servicesSelected: this.props.name === undefined ? null : services.find(service => service.name === this.props.name),
            widgetSelected: this.props.widget === undefined ? '' : this.props.widget,
            onClickAddWidget: null,
            onClickUpdateWidget: null,
            successMessageOpen: false,
            errorMessageOpen: false,
            displayLoader: false,
            availableService: [],

            setOnClickAddWidget: (newEvent) => {
                this.setState({onClickAddWidget: newEvent});
            },

            setOnClickUpdateWidget: (newEvent) => {
                this.setState({onClickUpdateWidget: newEvent});
            },

            setDisplayLoader: (displayLoader) => {
                this.setState({displayLoader: displayLoader});
            }
        };

        this.handleSelectServicesChanged = this.handleSelectServicesChanged.bind(this);
        this.handleSelectWidgetsChanged = this.handleSelectWidgetsChanged.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleAddWidgetClick = this.handleAddWidgetClick.bind(this);
        this.handleUpdateWidgetClick = this.handleUpdateWidgetClick.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);

        this.getUserServices();
    }

    getUserServices()
    {
        const accountService = new AccountService();

        accountService.getUserServices(() => {
            console.log(accountService.getUserServicesData())
            let availableServices = [];
            accountService.getUserServicesData().forEach((d) => {
                let s = services.find(service => service.name.toLowerCase() === d.service_name);
                if (s) {
                    s.connected = d.connected;
                    availableServices.push(s);
                }
            });
            this.setState({
                availableService: availableServices
            })

        }, (error) => {
            if (error.response.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                this.setState({
                    styleMenu: {
                        'margin-left': '-300px'
                    },
                    menuIsOpen: false,
                    title: 'Home',
                    visibilityBackground: 'hidden',
                    opacityBackground: '0'
                })
                history.push('/');
            }
        });
    }

    handleUpdateWidgetClick()
    {
        if (this.state.onClickUpdateWidget === null) {
            this.setState({errorMessageOpen: true});
        } else {
            this.state.onClickUpdateWidget(() => {
                this.setState({successMessageOpen: true});
            }, () => {
                this.setState({errorMessageOpen: true});
            });
        }
    }

    handleSelectServicesChanged(e)
    {
        this.setState(
            {
                'servicesSelected': services.find(service => service.name === e.target.value),
                'widgetSelected': ''
            },
        );
        history.push(services.find(service => service.name === e.target.value).url);
    }

    handleSelectWidgetsChanged(e)
    {
        this.setState({'widgetSelected': e.target.value});
        history.push(this.state['servicesSelected'].widgets.find(widget => widget.name === e.target.value).urlClient);
    }

    handleCloseClick()
    {
        history.push('/home');
    }

    handleAddWidgetClick()
    {
        if (this.state.onClickAddWidget === null) {
            this.setState({errorMessageOpen: true});
        } else {
            this.state.onClickAddWidget(() => {
                this.setState({
                    servicesSelected: null,
                    widgetSelected: ''
                })
                history.push('/home/widget');
                this.setState({successMessageOpen: true});
            }, () => {
                this.setState({errorMessageOpen: true});
            });
        }
    }

    render() {


        return (
            <div id="widget-form" className="switch-wrapper">
                <div class="form">
                    <div class="header">
                        <div class="title">
                            <p>{this.props.isAnUpdate ? 'Update widget' : 'Create widget'}</p>
                        </div>
                        <div class="close-button">
                            <CgClose size={35} onClick={this.handleCloseClick} />
                        </div>
                    </div>
                    <div class="content">
                        <div class="title">
                            <p>Services and widgets</p>
                        </div>
                        <div class="service-input input">
                            <SelectInput
                                label="Service" value={(this.state.servicesSelected === null ? '' : this.state.servicesSelected.name)} onChange={this.handleSelectServicesChanged}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Select a service</em>;
                                    }
                                    return selected;
                                }}
                                name="Select a service" arrayKey="name" arrayValue="name" arrayValueNotDisabled="connected" array={this.state.availableService}
                                messageOnValueDisabled="Connect this service in your account settings to use it"
                            />
                        </div>
                        <div className="widget-input input">
                            <SelectInput
                                label="Widget" value={this.state.widgetSelected} onChange={this.handleSelectWidgetsChanged}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Select a widget</em>;
                                    }
                                    return selected;
                                }}
                                name="Select a widget" arrayKey="name" arrayValue="name" array={(this.state.servicesSelected === null ? [] : this.state.servicesSelected.widgets)}
                            />
                        </div>
                        <div class="title-parameters">
                            <p>Parameters</p>
                        </div>
                        <Switch>
                            <Route path={'/home/widget/covid/summary-country/'} render={() => <CovidSummaryCountryForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget} />}/>
                            <Route path={'/home/widget/covid/country-case/'} render={() => <CovidCountryCaseForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget} />}/>
                            <Route path={'/home/widget/weather/city-weather/'} render={() => <CityWeatherForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget} />}/>
                            <Route path={'/home/widget/twitter/search-tweets/'} render={() => <TwitterSearchTweetsForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/twitter/last-tweets/'} render={() => <TwitterLastTweetsForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/youtube/statistics-channel/'} render={() => <YoutubeStatisticsChannelForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/youtube/statistics-video/'} render={() => <YoutubeStatisticsVideoForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/youtube/comments-video/'} render={() => <YoutubeCommentsVideoForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/youtube/channel-videos/'} render={() => <YoutubeChannelVideoForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/spotify/top-tracks-user/'} render={() => <SpotifyTopTracksUserForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/spotify/top-artists-user/'} render={() => <SpotifyTopArtistsUserForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                            <Route path={'/home/widget/spotify/recently-played-tracks-user/'} render={() => <SpotifyRecentlyPlayedTracksUserForm parentState={this.state} onClickUpdate={this.props.onUpdateWidget}  />}/>
                        </Switch>
                        <div class="widget-button" style={{ display: this.props.isAnUpdate ? 'none' : 'block' }}>
                            <BasicButton onClick={this.handleAddWidgetClick} name="Add widget" loaderSize={50} display={this.state.displayLoader}/>
                        </div>
                        <div className="widget-button" style={{display: this.props.isAnUpdate ? 'block' : 'none'}}>
                            <BasicButton onClick={this.handleUpdateWidgetClick} name="Update widget" loaderSize={50} display={this.state.displayLoader}/>
                        </div>
                    </div>
                </div>
                <SuccessDialog onClose={this.handleSuccessMessageClose} text="Widget created" open={this.state.successMessageOpen} />
                <ErrorDialog onClose={this.handleErrorMessageClose} text="Failed to add widget" open={this.state.errorMessageOpen} />
            </div>
        );
    }

    handleSuccessMessageClose(e) {
        this.setState({successMessageOpen: false});
    }

    handleErrorMessageClose(e) {
        this.setState({errorMessageOpen: false});
    }
}

export default WidgetForm;