const validUrl = require("valid-url");
const { makeid } = require("../utils/random.utils");

const Url = require("../models/Url");

exports.index = async (req, res) => {
  try {
    const urls = await Url.find({}).limit(3).sort({ createdAt: -1 });
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.postUrl = async (req, res, next) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

    
  if (!validUrl.isUri(baseUrl)) {
    return res.status(200).json({
      message: "Invalid base url",
    });
  }

  // create url code
  const urlCode = makeid(7);
  console.log(urlCode);

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      if (longUrl.includes(baseUrl)) {
        res.status(200).json({
          message: "That is already",
        });
        return;
      }

      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
        });

        await url.save();

        res.status(200).json(url);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).json({
      message: "Invalid long url",
    });
  }
};
