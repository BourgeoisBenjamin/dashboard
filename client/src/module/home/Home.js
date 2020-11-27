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
import {Draggable, DragDropContext} from "react-beautiful-dnd";
import {Droppable} from "react-beautiful-dnd";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.widgetService = new WidgetService();

        this.state = {
            widgets: [[]],
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
        this.onDragEnd = this.onDragEnd.bind(this);
        this.getUserWidgets();
    }

    getUserWidgets()
    {
        this.widgetService.getUserWidgets(() => {
            let widgetsTmp = [];

            widgetsTmp[0] = [];
            widgetsTmp[1] = [];
            widgetsTmp[2] = [];
            widgetsTmp[3] = [];

            let i = 1;

            this.widgetService.data.forEach((d) => {
                if (widgets[d.name]) {
                    widgetsTmp[d.position_y].push({
                        name: d.name,
                        id_widget: d.id,
                        position_x: d.position_x,
                        id: `item-${i -1}-${new Date().getTime()}`,
                        content: widgets[d.name](d.id, i, this.state, this.getUserWidgets)
                    });
                    i++;
                }
            });
            widgetsTmp.forEach((d) => {
                d.sort((a, b) => {
                    return (a.position_x - b.position_x);
                });
                console.log(d);
            })
            this.setState({
                widgets: widgetsTmp
            })
            this.state.getWidgetData.forEach((w) => {
                w();
            });
        }, (error) => {
            if (error.response?.status === 403) {
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

    onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(this.state.widgets[sInd], source.index, destination.index);
            const newState = [...this.state.widgets];
            newState[sInd] = items;
            this.updateWidgetsState(newState);
            this.setState({
                widgets: newState
            });
            console.log(newState);
        } else {
            const result = move(this.state.widgets[sInd], this.state.widgets[dInd], source, destination);
            const newState = [...this.state.widgets];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            this.updateWidgetsState(newState);
            this.setState({widgets: newState});
            console.log(newState);
        }
    }

    updateWidgetsState(newState)
    {
        let data = {
            data: []
        };

        let posY = 0;
        newState.forEach((s) => {
            let posX = 0;
            s.forEach((widget) => {
                data.data.push({
                    id: widget.id_widget,
                    name: widget.name,
                    position_x: posX,
                    position_y: posY
                });
                posX++;
            });
            posY++;
        })
        console.log(data);
        this.widgetService.putUserWidgets(data, () => {
            console.log('update !')
        }, (error) => {
            if (error.response?.status === 403) {
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
                        <DragDropContext onDragEnd={this.onDragEnd} >
                            {this.state.widgets.map((el, ind) => (
                                <Droppable key={ind} droppableId={`${ind}`}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            // style={getListStyle(snapshot.isDraggingOver)}
                                            {...provided.droppableProps}
                                            style={{ width: '450px' }}
                                        >
                                            {el.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                marginTop: '100px',
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </DragDropContext>
                        {/*{ this.state.widgets }*/}
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