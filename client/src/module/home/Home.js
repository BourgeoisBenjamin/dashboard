import React, { Component } from 'react';
import history from "../../history";
import MenuContext from "../../core/contexts/MenuContext";
import './Home.css'
import WidgetForm from './components/WidgetForm'
import {Route, Switch} from "react-router-dom";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') == null) {
            history.push('/');
        }

        this.handleNewWidgetClick = this.handleNewWidgetClick.bind(this);
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
                            <Route path={'/home/widget/weather/city-weather/'} render={() => <WidgetForm name={'Weather'} widget={'City\'s Weather in Celsius or Fahrenheit'} />} />
                            <Route path={'/home/widget/weather'} render={() => <WidgetForm name={'Weather'} />} />
                            <Route path={'/home/widget/youtube/last-videos-of-a-channel/'} render={() => <WidgetForm name={'Youtube'} widget={'Last videos of a channel'} />} />
                            <Route path={'/home/widget/youtube'} render={() => <WidgetForm name={'Youtube'} />} />
                            <Route path={'/home/widget/'} render={() => <WidgetForm />} />
                        </Switch>
                {/*    </CSSTransition>*/}
                {/*</TransitionGroup>*/}
            </div>
        );
    }
}

export default Home;