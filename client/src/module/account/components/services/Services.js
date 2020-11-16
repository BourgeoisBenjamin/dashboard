import React, {Component} from "react";
import './Services.css'
import Service from './components/Service'
import TwitterImage from '../../../../assets/images/twitter.png';
import YoutubeImage from '../../../../assets/images/youtube.png';

class Services extends Component
{
    constructor(props) {
        super(props);

        this.props.parentState.setServicesIsSelected(true);
        this.props.parentState.setInformationIsSelected(false);
        this.props.parentState.setPasswordIsSelected(false);
    }

    render() {
        return (
            <div id="services">
                <div class="title">
                    <p>Connect your account to services</p>
                </div>
                <div class="content">
                    <Service connected={ true } title="Twitter" logo={ TwitterImage }/>
                    <Service connected={ false } title="Youtube" logo={ YoutubeImage }/>
                </div>
            </div>
        )
    }
}

export default Services;