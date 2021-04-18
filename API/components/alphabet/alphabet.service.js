const { db, error } = require("../../helper");
const { Alphabet, User, Room } = db;

exports.getAll = async (_id, pageNumber, limit, type) => {
  const result = await Alphabet.find({type:type.toString()})
    .skip(pageNumber * limit)
    .limit(limit)
    .sort({ update_at: -1 });

  const count = await Alphabet.countDocuments({ type });

  return {
    total: count,
    page: pageNumber,
    pageSize: result.length,
    result: [...result],
  };
};
