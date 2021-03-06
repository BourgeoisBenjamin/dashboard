import React, {Component} from "react";
import './CovidSummaryCountry.css'
import LocationImage from '../../../../assets/images/placeholder.png'
import history from "../../../../history";
import DeathImage from '../../../../assets/images/death.png'
import RecoveryImage from '../../../../assets/images/recovery.png'
import ConfirmedImage from '../../../../assets/images/confirmed.png'
import SummaryCountryModel from "../../../../core/models/services/covid/response/SummaryCountryModel";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";
import CovidSummaryCountryService from "../../../../core/services/services/covid/CovidSummaryCountryService";
import MenuContext from "../../../../core/contexts/MenuContext";

class CovidSummaryCountry extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.state = {
            model: new SummaryCountryModel(),
            isLoading: true,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new CovidSummaryCountryService();

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters  = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    componentDidMount()
    {
        this.getDataWidget();
    }

    getDataWidget(isLoading = true)
    {
        this.setState({
            isLoading: isLoading,
            errorAppear: false
        })
        this.service.get(this.props.id, () => {
            this.setState({
                model: this.service.getResponseModel(),
                isLoading: false
            })
        }, () => {
            if (this.service.getError().response?.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
            this.setState({
                isLoading: false,
                errorMessage: 'Could not load data',
                errorAppear: true
            })
        });
        setTimeout(() => {
            this.getDataWidget(false);
        }, 3600000);
    }

    render() {
        return (
            <div id="covid-summary-country" class="widget">
                <div className="content">
                    <WidgetHeader
                        mainTitle="COVID 19"
                        secondTitle="Summary of the day per country"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div className="content" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                        <div className="header-content">
                            <div className="description">
                                <div className="logo">
                                    <img src={LocationImage} alt="" />
                                </div>
                                <div className="text">
                                    <p>In {this.state.model.Country}, {new Date(this.state.model.Date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="stat-wrap">
                            <div className="stat">
                                <div className="image">
                                    <div className="logo">
                                        <img alt="" src={ConfirmedImage} />
                                    </div>
                                    <div className="description">
                                        <p>New confirmed</p>
                                    </div>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.NewConfirmed}</p>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="image">
                                    <div className="logo">
                                        <img alt="" src={RecoveryImage}/>
                                    </div>
                                    <div className="description">
                                        <p>New recovered</p>
                                    </div>
                                </div>
                                <div class="value">
                                    <p>{this.state.model.NewRecovered}</p>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="image">
                                    <div className="logo">
                                        <img alt="" src={DeathImage}/>
                                    </div>
                                    <div className="description">
                                        <p>New deaths</p>
                                    </div>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.NewDeaths}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }

    onClickDelete()
    {
        this.service.delete(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
            if (this.service.getError().response?.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
        });
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/covid/summary-country/',
            search: '?id=' + this.props.id
        })
    }
}

export default CovidSummaryCountry;