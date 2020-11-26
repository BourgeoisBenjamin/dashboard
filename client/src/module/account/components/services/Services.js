import React, {Component} from "react";
import './Services.css'
import history from "../../../../history";
import Service from './components/Service'
import TwitterImage from '../../../../assets/images/twitter.png';
import YoutubeImage from '../../../../assets/images/youtube.png';
import AccountService from "../../../../core/services/account/AccountService";
import MenuContext from "../../../../core/contexts/MenuContext";

const services = {
    'twitter': function(connected, onClickConnect, onClickDisconnect) { return <Service onClickConnect={onClickConnect} onClickDisconnect={onClickDisconnect} connected={ connected } title="Twitter" logo={ TwitterImage }/> },
    'youtube': function(connected, onClickConnect, onClickDisconnect) { return <Service onClickConnect={onClickConnect} onClickDisconnect={onClickDisconnect} connected={ connected } title="Youtube" logo={ YoutubeImage }/> }
};

class Services extends Component
{

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new AccountService();

        this.state = {
            data: []
        };

        this.props.parentState.setServicesIsSelected(true);
        this.props.parentState.setInformationIsSelected(false);
        this.props.parentState.setPasswordIsSelected(false);
        this.onClickConnect = this.onClickConnect.bind(this);
        this.onClickDisconnect = this.onClickDisconnect.bind(this);
        this.getUserServices = this.getUserServices.bind(this);

        this.getUserServices();
    }

    onClickConnect(title)
    {
        this.service.init((uuid) => {
            console.log(uuid);
            this.service.getServiceConnect(uuid, () => {
                this.getUserServices();
            }, () => {
            });
            if (title === 'Twitter') {
                window.open('http://localhost:8080/account/service/twitter/connect?uuid=' + uuid, 'Login to Twitter', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=500');
            } else if (title === 'Youtube') {
                window.open('http://localhost:8080/account/service/google/connect?uuid=' + uuid, 'Login to google', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=500');
            }
        }, () => {
        });
    }

    onClickDisconnect(title)
    {
        if (title === 'Twitter') {
            this.service.disconnectTwitter(() => {
                console.log('ok');
                this.getUserServices();
            }, () => {

            });
        } else if (title === 'Youtube') {
            this.service.disconnectGoogle(() => {
                this.getUserServices();
            }, () => {

            });
        }
    }

    getUserServices()
    {
        this.service.getUserServices(() => {
            this.setState({
                data: this.service.getUserServicesData()
            });
            console.log(this.service.getUserServicesData());
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

    render() {
        const servicesRender = this.initServices();

        return (
            <div id="services">
                <div class="title">
                    <p>Connect your account to services</p>
                </div>
                <div class="content">
                    {servicesRender}
                </div>
            </div>
        )
    }

    initServices()
    {
        let servicesRender = [];

        this.state.data.forEach((d) => {
            console.log(d);
            if (services[d.service_name]) {
                servicesRender.push(services[d.service_name](d.connected, this.onClickConnect, this.onClickDisconnect));
            }
        });
        return servicesRender;
    }
}

export default Services;