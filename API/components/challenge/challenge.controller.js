const challengeService = require('./challenge.service')

exports.getAll = (req, res, next) => {
    const level = req.query.level
    challengeService
        .getAll(req.query)
        .then(response => {
            res.json(response)
        })
        .catch(e => next(e))
}
exports.getRandom = (req, res, next) => {
    challengeService
        .getRandom()
        .then(response => {
            res.json(response)
        })
        .catch(e => next(e))
}
exports.getById = (req, res, next) => {
    const { id } = req.params
    challengeService
        .getById(id)
        .then(response => {
            const resp = response.toJSON()
            res.json({
                ...resp,
                image: getImgUrl(resp.image),
                choice_1_voice: getAudioUrl(resp.choice_1_voice),
                choice_2_voice: getAudioUrl(resp.choice_2_voice)
            })
        })
        .catch(e => next(e))
}
exports.getByLevel = (req, res, next) => {
    const { level } = req.params
    challengeService
        .getByLevel(level)
        .then(response => {
            const resp = response.toJSON()
            res.json({
                ...resp,
                image: getImgUrl(resp.image),
                choice_1_voice: getAudioUrl(resp.choice_1_voice),
                choice_2_voice: getAudioUrl(resp.choice_2_voice)
            })
        })
        .catch(e => next(e))
}
// exports.importDB = async (req, res, next) => {
//     try {
//         await challengeService.importData()
//         res.json({ success: true })
//     }
//     catch (err) {
//         next(err)
//     }
// }
const getImgUrl = image => {
    return image
      ? `${process.env.SERVER_URL}/api/assets/challenge/photo/${image.toString()}`
      : 'no'
}
const getAudioUrl = audio => {
    return audio
      ? `${process.env.SERVER_URL}/api/assets/challenge/audio/${audio.toString()}`
      : 'no'
}

