/**
 * Created by romain on 2017-06-05.
 */

exports.toJSON = function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;

    return obj;
};