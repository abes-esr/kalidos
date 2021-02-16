const axios = require('axios');
import { setNoticeDisplay } from '../../actions/index';
import store from '../../store/index';


export const modifKey = (result) => {
    const data_notice = Object.keys(result).map((key) => [Number(key), result[key]]);
    return data_notice;
};

function deleteNotice(index) {
    axios({
        method: 'DELETE',
        url: '/deleteNotice',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
            "index": index,
        },
    }).then(function () {
        console.log("suppression notice ok");
        store.dispatch(setNoticeDisplay(0));
        window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

export { deleteNotice };
