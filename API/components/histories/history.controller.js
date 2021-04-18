const historyService = require('./history.service');

exports.setHistory = (req, res, next) => {
    const { _id } = req.user;
    historyService
        .setHistory(req.body,  _id )
        .then(response => res.json(response))
        .catch(e => next(e))
}
exports.upDateHistory = (req, res, next) => {
    const { _id } = req.user;
    console.log(_id)
    historyService
        .upDateHistory(req.body, _id)
        .then(response => res.json(response))
        .catch(e => next(e))
}
exports.getCurrent = (req, res, next) => {
    const { _id } = req.user;
    console.log(_id)
    historyService
        .getCurrent( _id)
        .then(response => res.json(response))
        .catch(e => next(e))
}
exports.vocabulary = (req, res, next) => {
    const { _id } = req.user;
    historyService
        .vocabulary( _id,req.params.id)
        .then(response => res.json(response))
        .catch(e => next(e))
}