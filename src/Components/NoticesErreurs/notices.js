const axios = require('axios');
import { setNoticeDisplay } from '../../actions/index';
import store from '../../store/index';


export const modifKey = (result) => {
    const data_notice = Object.keys(result).map((key) => [String(key), result[key]]);
    return data_notice;
};

/**
 * Supprime une notice sur le serveur.
 * @param {string} errorIndex date de création de la notice à supprimer
 */
function deleteNotice(index) {
    axios({
        method: 'DELETE',
        url: '/notices',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
            "index": index,
        },
    }).then(function () {
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

/**
 * Supprime toutes les notices sur le serveur.
 */
function deleteAllNotices() {
    axios({
        method: 'DELETE',
        url: '/deleteAllNotices'
    }).then(function () {
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

export { deleteNotice, deleteAllNotices };
