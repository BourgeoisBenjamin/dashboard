import React, { Component } from 'react';
import './WidgetForm.css'
import { CgClose } from 'react-icons/cg'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../../../history";
import {Route, Switch} from "react-router-dom";
import YoutubeWidgetLastVideosOfChannelForm from "./form-widgets/YoutubeWidgetLastVideosOfChannelForm";
import YoutubeDisplayChannelSubscribersForm from "./form-widgets/YoutubeDisplayChannelSubscribersForm";

const services = [
    {
        name: 'Select a service',
        widgets: []
    },
    {
        name: 'Twitter',
        widgets: [
            {
                name: 'Last tweets',
                urlClient: '/home/widget/twitter/last-tweets/',
                urlRequest: '/service/twitter/last-tweets/'
            },
            {
                name: 'Search',
                urlClient: '/home/widget/twitter/search/',
                urlRequest: '/service/twitter/search/'
            }
        ]
    },
    {
        name: 'Youtube',
        widgets: [
            {
                name: 'Last videos of a channel',
                urlClient: '/home/widget/youtube/last-videos-of-a-channel/',
                urlRequest: '/service/youtube/last-videos-channel/'
            },
            {
                name: 'Display channel subscribers',
                urlClient: '/home/widget/youtube/display-channel-subscribers/',
                urlRequest: '/service/youtube/channel-subscribers/'
            }
        ]
    }
];

class WidgetForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'servicesSelected' : services.find(service => service.name === this.props.name),
            'widgetSelected': ''
        };

        this.handleSelectServicesChanged = this.handleSelectServicesChanged.bind(this);
        this.handleSelectWidgetsChanged = this.handleSelectWidgetsChanged.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleSelectServicesChanged(e)
    {
        this.setState(
            {
                'servicesSelected': services.find(service => service.name === e.target.value),
                'widgetSelected': ''
            },
        );
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

    render() {
        return (
            <div id="widget-form" className="switch-wrapper">
                <div class="form">
                    <div class="header">
                        <div class="title">
                            <p>{this.props.title}</p>
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
                            <FormControl style={{minWidth: 300}}>
                                <Select
                                    variant={'outlined'}
                                    displayEmpty
                                    input={<Input />}
                                    value={this.state.servicesSelected.name}
                                    onChange={this.handleSelectServicesChanged}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Select a service</em>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a service</em>
                                    </MenuItem>
                                    {services.map((service) => (
                                        <MenuItem key={service.name} value={service.name}>
                                            {service.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="widget-input input">
                            <FormControl style={{minWidth: 300}}>
                                <Select
                                    variant={'outlined'}
                                    displayEmpty
                                    input={<Input/>}
                                    value={this.state.widgetSelected}
                                    onChange={this.handleSelectWidgetsChanged}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Select a widget</em>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{'aria-label': 'Without label'}}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a widget</em>
                                    </MenuItem>
                                    {this.state.servicesSelected.widgets.map((widget) => (
                                        <MenuItem key={widget.name} value={widget.name}>
                                            {widget.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div class="title-parameters">
                            <p>Parameters</p>
                        </div>
                        <Switch>
                            <Route path={'/home/widget/youtube/last-videos-of-a-channel/'} render={() => <YoutubeWidgetLastVideosOfChannelForm />}/>
                            <Route path={'/home/widget/youtube/display-channel-subscribers/'} render={() => <YoutubeDisplayChannelSubscribersForm />}/>
                        </Switch>
                        <div class="widget-button">
                            <button>Add widgets</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WidgetForm;