const courseService = require("./course.service");
exports.searchCourse = (req, res, next) => {
  const { _id } = req.user;
  console.log("cc");
  const { q,public } = req.query;
  courseService
    .searchCourse(_id, q,public)
    .then((response) => res.json(response))
    .catch((e) => next(e));
};
exports.shareCourse = (req, res, next) => {
  console.log("cc");
  const { _id } = req.user;
  const {friend_id,course_id}=req.body
  courseService
    .shareCourse(_id,course_id,friend_id)
    .then((response) => res.json({success:true}))
    .catch((err) => next(err));
};
exports.accept = (req, res, next) => {
  const { _id } = req.user;
  const {course_id}=req.body
  courseService
    .accept(_id,course_id)
    .then((response) => res.json({success:true}))
    .catch((err) => next(err));
};
exports.createCourse = (req, res, next) => {
  const { _id } = req.user;
  courseService
    .create({ ...req.body, _id }, req)
    .then((response) => res.json(response))
    .catch((err) => next(err));
};

exports.updateContentOnCourse = (req, res, next) => {
  courseService
    .updateContentOnCourse(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
};

exports.getCourse = (req, res, next) => {
  const { _id } = req.user;

  courseService
    .findById((req.params && req.params.id) || (req.query && req.query.id), _id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
};
exports.findByPublic = (req, res, next) => {
  var page = parseInt(req.query.page) || 0;
  var limit = parseInt(req.query.limit) || 5;
  courseService
    .findByPublic(page, limit, req.user._id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
};

exports.deleteCourse = (req, res, next) => {
  const { _id } = req.user;
  courseService
    .deleteCourse(
      (req.params && req.params.id) || (req.query && req.query.id),
      _id
    )
    .then((response) => res.json({ success: true }))
    .catch((err) => next(err));
};

exports.deleteContentCourse = (req, res, next) => {
  courseService
    .deleteContentCourse(req.query.id)
    .then((response) => res.json({ success: true }));
};
exports.learn = (req, res, next) => {
  const { _id } = req.user;

  courseService
    .learn(req.params.id, _id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
};
