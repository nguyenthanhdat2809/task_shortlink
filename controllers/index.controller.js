const Url = require("../models/Url");

exports.index = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Wellcome to shorten link"
  });
}

exports.location = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({
        message: "Url not define",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
