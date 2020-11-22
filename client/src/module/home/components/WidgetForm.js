import React, { Component } from 'react';
import './WidgetForm.css'
import { CgClose } from 'react-icons/cg'
import history from "../../../history";
import {Route, Switch} from "react-router-dom";
import YoutubeWidgetLastVideosOfChannelForm from "./form-widgets/YoutubeWidgetLastVideosOfChannelForm";
import YoutubeDisplayChannelSubscribersForm from "./form-widgets/YoutubeDisplayChannelSubscribersForm";
import { services } from '../services';
import SelectInput from "../../../shared/components/inputs/SelectInput";
import CityWeatherForm from "./form-widgets/CityWeatherForm";
import ErrorDialog from "../../../shared/components/dialogs/ErrorDialog";
import BasicButton from "../../../shared/components/buttons/BasicButton";
import SuccessDialog from "../../../shared/components/dialogs/SuccessDialog";
import CovidCountryCaseForm from "./form-widgets/CovidCountryCaseForm";
import CovidSummaryCountryForm from "./form-widgets/CovidSummaryCountryForm";

class WidgetForm extends Component {

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
            title: props.isAnUpdate ? 'Update widget' : 'Create widget',

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
                            <p>{this.state.title}</p>
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
                                name="Select a service" arrayKey="name" arrayValue="name" array={services}
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
                            <Route path={'/home/widget/youtube/last-videos-of-a-channel/'} render={() => <YoutubeWidgetLastVideosOfChannelForm />}/>
                            <Route path={'/home/widget/youtube/display-channel-subscribers/'} render={() => <YoutubeDisplayChannelSubscribersForm />}/>
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