import axios from "axios";

export default class WidgetService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    data = [];

    url = 'http://localhost:8080/user/widgets/';

    getUserWidgets(onSuccess, onFailure)
    {
        axios.get(this.url, this.header)
            .then(res => {
                console.log(res);
                res.data.forEach((d) => {
                    this.data.push(d);
                });
                onSuccess();
            }).catch(error => {
                console.log(error);
                onFailure();
        })
    }
}