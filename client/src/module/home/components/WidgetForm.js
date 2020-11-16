import React, { Component } from 'react';
import './WidgetForm.css'
import { CgClose } from 'react-icons/cg'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../../../history";

const servicesName = [
    'Twitter',
    'Youtube',
];

const widgetsName = [
    'Je sais pas quoi',
    'Lalaaaaalala jentends pas'
];

class WidgetForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'servicesSelected' : 'Select a service',
            'widgetSelected': 'Select a widget'
        };

        this.handleSelectServicesChanged = this.handleSelectServicesChanged.bind(this);
        this.handleSelectWidgetsChanged = this.handleSelectWidgetsChanged.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleSelectServicesChanged(e)
    {
        this.setState({'servicesSelected': e.target.value});
    }

    handleSelectWidgetsChanged(e)
    {
        this.setState({'widgetSelected': e.target.value});
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
                            <p>New widgets</p>
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
                                    value={this.state.servicesSelected}
                                    onChange={this.handleSelectServicesChanged}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a service</em>
                                    </MenuItem>
                                    {servicesName.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
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
                                            return <em>Placeholder</em>;
                                        }
                                        return selected;
                                    }}
                                    inputProps={{'aria-label': 'Without label'}}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select a service</em>
                                    </MenuItem>
                                    {widgetsName.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div class="title-parameters">
                            <p>Parameters</p>
                        </div>
                        <p>...</p>
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