import axios from "axios";

export default class WidgetService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    data = [];

    url = 'widgets/';

    getUserWidgets(onSuccess, onFailure)
    {
        axios.get(this.url, this.header)
            .then(res => {
                console.log(res);
                this.data = [];
                res.data.forEach((d) => {
                    this.data.push(d);
                });
                onSuccess();
            }).catch(error => {
                onFailure(error);
        })
    }

    putUserWidgets(data, onSuccess, onFailure)
    {
        axios.put(this.url, data, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
            onFailure(error);
        })
    }
}