var validUrl = require("valid-url");
var shortid = require("shortid");

const Url = require("../models/Url");

exports.index = async (req, res) => {
  try {
    const urls = await Url.find({});
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.postUrl = async (req, res, next) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({
      message: "Invalid base url",
    });
  }

  // create url code
  const urlCode = shortid.generate();
  console.log(urlCode);

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.status(200).json(url);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({
      message: "Invalid long url",
    });
  }
};
