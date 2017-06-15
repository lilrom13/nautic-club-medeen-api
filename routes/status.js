/**
 * Created by romain on 2017-06-04.
 */

var status = {
    
    getApiStatus: function (req, res) {
        res.send({
            status: 'ok'
        });
    }
}

module.exports = status;