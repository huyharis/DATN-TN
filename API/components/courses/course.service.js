const { db, error } = require("../../helper");
const question = require("../../helper/question");
const { Course, Content, User } = db;
const AvartaCtr = require("../avatars/avatar.controller");
const Noti = require("../notify/notify.service")

exports.accept = async (user_id, course_id) => {
  try {
    const user = await User.find({ _id: user_id, courses: { $in: course_id } })
    if (user.length) throw error.courseOfFriendIsExit
    await User.findByIdAndUpdate({ _id: user_id }, { $push: { courses: course_id } })
    return
  } catch (error) {
    throw (error)
  }

}
exports.shareCourse = async (user_id, course_id, friend_id) => {
  try {
    const user = await User.find({ _id: friend_id, courses: { $in: course_id } })
    if (user.length) throw error.courseOfFriendIsExit
    Noti.create(
      {
        recerUser: friend_id,
        contentMess: {
          type: "SHARE_COURSE",
          content: course_id,
        },
      },
      user_id
    );
    return
  } catch (error) {
    throw (error)
  }

}

exports.makeQuestion = async (id, _id) => {
  const courses = await this.findById(id, _id);
  if (!courses) throw error.courseNotFound;
  return question._makeQuestion({}, courses.contents);
};

exports.learn = (id, _id) => {
  try {
    return this.makeQuestion(id, _id);
  } catch (error) {
    console.log(error);
  }
};
exports.searchCourse = async (id, q, ispublic) => {
  if (!ispublic) {
    const user = await User.findById(id)
      .populate({
        path: "courses",
        populate: { path: "contents" },
        options: { sort: "-create_at" },
      })
      .select("-hash");
    let {
      avatar,
      username,
      _id,
      courses,
      create_at,
      ...userExceptField
    } = user.toJSON();
    console.log(courses);
    course = courses.filter((e) => {
      if (e.title.toLowerCase().indexOf(q) > -1) return true;
    });
    course = course.map(val => {
      return {
        ...val,
        avatar: AvartaCtr.getImgUrl(course.avatar)
      }
    })
    return course;
  } else {
    let course = await Course.find({
      type: "public",
    })
      .populate("contents")
      .lean();

    course = course.filter((e) => {
      if (e.title.toLowerCase().indexOf(q) > -1) return true;
    });
    course = course.map(val => {
      return {
        ...val,
        avatar: AvartaCtr.getImgUrl(course.avatar)
      }
    })
    return course
  }
};
exports.findById = async (id, id_user) => {
  try {
    const user = await User.findById(id_user)
      .populate({
        select: "-contents",
        path: "histories",
      })
      .lean();
    const { histories } = user;

    const { complete = 0 } =
      histories.find((u) => u.topic.toString() === id) || {};
    const course = await Course.findById({ _id: id }).populate("contents");
    if (!course) {
      return {
        result: [],
      };
    }
    return {
      ...course.toJSON(),
      complete,
      avatar: AvartaCtr.getImgUrl(course.avatar),
    };
  } catch (error) {
    throw error;
  }
};
exports.findByPublic = async (pageNumber, limit, id) => {
  let course = await Course.find({ type: "public" })
    .populate({ path: "contents", model: "Content" })
    .lean()
    .skip(pageNumber * limit)
    .limit(limit)
    .sort({ update_at: -1 });

  const user = await User.findById(id).populate({
    select: "-contents",
    path: "histories",
  });

  const { histories } = user.toJSON();

  course.forEach((element, index) => {
    course[index] = {
      ...element,
      complete: 0,
      avatar: AvartaCtr.getImgUrl(element.avatar),
    };
  });

  histories.forEach((his) => {
    const index = course.findIndex(
      (el) => el._id.toString() === his.topic.toString()
    );
    course[index] = {
      ...course[index],
      complete: his.complete,
    };
  });

  const count = await Course.countDocuments({ type: "public" });

  return {
    result: [...course],
    total: count,
    page: pageNumber,
    pageSize: course.length,
  };
  // }
};

exports.addContent = async (id, content) => {
  const contents = await Content.create(content);
  return Course.findByIdAndUpdate(id, { $push: { contents } }, { new: true });
};

exports.removeContent = (id, contents) => {
  return Promise.all([
    Course.findByIdAndUpdate(id, { $pull: { contents: { $in: contents } } }),
    Content.deleteMany({ _id: { $in: contents } }),
  ]);
};

exports.updateContentOnCourse = async (id, body) => {
  const { content } = body;
  await Content.deleteMany({ id: content });
  const contents = await Content.create(content);
  await Course.findByIdAndUpdate({ id: id }, { $pull: { content } });
  return Course.findByIdAndUpdate({ id: id }, { $push: { contents } });
};

exports.create = async (body, req) => {
  const { title, content, _id } = body;
  const contents = await Content.create(content);
  const courses = await Course.create({ title, contents });
  AvartaCtr.updateImGCourse(courses, req);
  await User.findByIdAndUpdate(_id, { $push: { courses } });
  return courses;
};

exports.deleteCourse = async (id_course, id_user) => {
  try {
    const course = await Course.findById({ _id: id_course });
    return Promise.all([
      Content.deleteMany({ _id: { $in: course.contents } }),
      Course.deleteOne({ _id: id_course }),
      User.findByIdAndUpdate(
        { _id: id_user },
        { $pull: { courses: id_course } }
      ),
    ]);
  } catch (error) {
    throw error;
  }
};

exports.deleteContentCourse = async (id_content) => {
  return Promise.all([
    Content.findByIdAndDelete({ _id: id_content }),
    Course.findOneAndUpdate(
      { contents: id_content },
      { $pull: { contents: id_content } }
    ),
  ]);
};
