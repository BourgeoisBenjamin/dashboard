import React, { Component } from 'react';
import history from "../../history";
import MenuContext from "../../core/contexts/MenuContext";
import './Home.css'
import WidgetForm from './components/WidgetForm'
import {Route, Switch} from "react-router-dom";
import {services} from "./services";
import WidgetService from "../../core/services/widget/WidgetService";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.widgetService = new WidgetService();

        if (localStorage.getItem('JWTToken') == null) {
            history.push('/');
        }

        this.handleNewWidgetClick = this.handleNewWidgetClick.bind(this);
        this.getUserWidgets();
    }

    getUserWidgets()
    {
        this.widgetService.getUserWidgets(() => {

        }, () => {

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
        const routes = [];
        services.map((service, i) => {
            service.widgets.map((widget) => {
                routes.push(<Route path={widget.urlClient} render={() => <WidgetForm name={service.name} widget={widget.name} />} />)
            });
            routes.push(<Route path={service.url} render={() => <WidgetForm name={service.name} />} />);
        });

        return (
            <div id="home-module">
                <div class="new-widgets-button">
                    <button onClick={this.handleNewWidgetClick}>New widgets</button>
                </div>
                <div class="content">

                </div>
                {/*<TransitionGroup component={null}>*/}
                {/*    <CSSTransition timeout={{ enter: 300, exit: 300 }} classNames="fade" key={this.state.key}>*/}
                        <Switch location={this.props.location}>
                            { routes }
                            <Route path={'/home/widget/'} render={() => <WidgetForm />} />
                        </Switch>
                {/*    </CSSTransition>*/}
                {/*</TransitionGroup>*/}
            </div>
        );
    }
}

export default Home;