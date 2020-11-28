import React, { Component } from 'react';
import history from "../../history";
import MenuContext from "../../core/contexts/MenuContext";
import './Home.css'
import WidgetForm from './components/WidgetForm'
import {Redirect, Route, Switch} from "react-router-dom";
import {services} from "./services";
import WidgetService from "../../core/services/widget/WidgetService";
import {widgets} from "./widgets";
import queryString from "query-string";
import {Draggable, DragDropContext} from "react-beautiful-dnd";
import {Droppable} from "react-beautiful-dnd";

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        document.title = 'Dashboard - Home';

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
        console.log(result)
        const { source, destination } = result;

        // if dropped outside the list
        if (!destination) {
            return;
        }
        // Parse to int
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        // If draggable haven't change column
        if (sInd === dInd) {
            // Reorder list
            const items = this.reorder(this.state.widgets[sInd], source.index, destination.index);
            const newWidgets = [...this.state.widgets];
            newWidgets[sInd] = items;
            this.updateWidgetsState(newWidgets);
            this.setState({
                widgets: newWidgets
            });
        } else {
            // Moved source to dest
            const result = this.move(this.state.widgets[sInd], this.state.widgets[dInd], source, destination);
            const newWidgets = [...this.state.widgets];
            // Replace newWidgets columns with these of result
            newWidgets[sInd] = result[sInd];
            newWidgets[dInd] = result[dInd];
            this.updateWidgetsState(newWidgets);
            this.setState({widgets: newWidgets});
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
        // eslint-disable-next-line array-callback-return
        services.map((service, i) => {
            // eslint-disable-next-line array-callback-return
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
                                        <div class="droppable-content" ref={provided.innerRef} {...provided.droppableProps} style={{ width: '450px' }}>
                                            {el.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                    </div>
                    <Switch location={this.props.location}>
                        { routes }
                        <Route path={'/home/widget/'} render={() => <WidgetForm isAnUpdate={isAnUpdate} />} />
                        <Route path='/home/*' exact={true} render={() => <Redirect to="/404" />} />
                    </Switch>
            </div>
        );
    }

    move(source, destination, droppableSource, droppableDestination) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        // Removed element from the source
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        // Added element to the destination list
        destClone.splice(droppableDestination.index, 0, removed);

        // Create an array in order to return it
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }

    reorder(list, startI, endI) {
        // Create a clone
        const result = Array.from(list);
        // Remove an element
        const [removed] = result.splice(startI, 1);
        // Insert the removed element at end index
        result.splice(endI, 0, removed);

        return result;
    };
}

export default Home;