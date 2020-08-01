const viewPath = "datas";
const Data = require("../models/Data");
const User = require("../models/user");

exports.index = async (req, res) => {
  try {
    const datas = await Data.find()
      .populate("user")
      .sort({ updatedAt: "desc" });

    res.status(200).json(datas);
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error fetching the datas", error });
  }
};

exports.show = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id).populate("user");

    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error fetching the datas", error });
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: "New Data",
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    const data = await Data.create({ user: user._id, ...req.body });

    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There was an error creating the data post", error });
  }
};

exports.edit = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: data.title,
      formData: data,
    });
  } catch (error) {
    req.flash("danger", `There was an error accessing this data: ${error}`);
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    let data = await Data.findById(req.body.id);
    if (!data) throw new Error("Data could not be found");

    const attributes = { user: user._id, ...req.body };
    await Data.validate(attributes);
    await Data.findByIdAndUpdate(attributes.id, attributes);

    req.flash("success", "The data was updated successfully");
    res.redirect(`/datas/${req.body.id}`);
  } catch (error) {
    req.flash("danger", `There was an error updating this data: ${error}`);
    res.redirect(`/datas/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Data.deleteOne({ _id: req.body.id });
    res.status(200).json({ message: "Yeah" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error deleting the datas", error });
  }
};
