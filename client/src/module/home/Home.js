import React, { Component } from 'react';
import history from "../../history";
import MenuContext from "../../core/contexts/MenuContext";
import './Home.css'
import WidgetForm from './components/WidgetForm'
import {Route, Switch} from "react-router-dom";
import {services} from "./services";
import WidgetService from "../../core/services/widget/WidgetService";
import {widgets} from "./widgets";
import queryString from "query-string";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.widgetService = new WidgetService();

        this.state = {
            widgets: [],
            getWidgetData: [],

            setGetWidgetData: (newArray) => {
                this.setState({
                    getWidgetData: newArray
                })
            }
        };

        if (localStorage.getItem('JWTToken') == null) {
            history.push('/');
        }

        this.handleNewWidgetClick = this.handleNewWidgetClick.bind(this);
        this.getUserWidgets = this.getUserWidgets.bind(this);
        this.getUserWidgets();
    }

    getUserWidgets()
    {
        this.widgetService.getUserWidgets(() => {
            let widgetsTmp = [];

            console.log(this.widgetService.data);

            let i = 1

            this.widgetService.data.forEach((d) => {
                if (widgets[d.name]) {
                    widgetsTmp.unshift(widgets[d.name](d.id, i, this.state));
                    i++;
                }
            });
            this.setState({
                widgets: widgetsTmp
            })
            this.state.getWidgetData.forEach((w) => {
                w();
            });
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

    componentDidMount()
    {
        this.context.setShowMenu('block');
    }

    handleNewWidgetClick()
    {
        history.push('/home/widget/')
    }

    render() {
        const isAnUpdate = !!queryString.parse(window.location.search).id;

        const routes = [];
        services.map((service, i) => {
            service.widgets.map((widget) => {
                routes.push(<Route path={widget.urlClient} render={() => <WidgetForm isAnUpdate={isAnUpdate} name={service.name} widget={widget.name} onUpdateWidget={this.getUserWidgets} />} />)
            });
            routes.push(<Route path={service.url} render={() => <WidgetForm isAnUpdate={isAnUpdate} name={service.name} />} />);
        });

        return (
            <div id="home-module">
                <div class="new-widgets-button">
                    <button onClick={this.handleNewWidgetClick}>New widgets</button>
                </div>
                    <div class="home-content">
                        { this.state.widgets }
                    </div>
                {/*<TransitionGroup component={null}>*/}
                {/*    <CSSTransition timeout={{ enter: 300, exit: 300 }} classNames="fade" key={this.state.key}>*/}
                        <Switch location={this.props.location}>
                            { routes }
                            <Route path={'/home/widget/'} render={() => <WidgetForm isAnUpdate={isAnUpdate} />} />
                        </Switch>
                {/*    </CSSTransition>*/}
                {/*</TransitionGroup>*/}
            </div>
        );
    }
}

export default Home;