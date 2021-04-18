const vocabService = require('./vocabulary.service')

exports.readVocabulary = async (req, res, next) => {
    try {
        await vocabService.createByCsv()
        res.json({ success: true })
    }
    catch (err) {
        next(err)
    }
}
    exports.readLesson = async (req, res, next) => {
        try {
            await vocabService.readLesson()
            res.json({ success: true })
        }
        catch (err) {
            next(err)
        }  
}