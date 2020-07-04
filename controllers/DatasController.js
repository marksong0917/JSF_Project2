// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index 1
  - show 2
  - new 3
  - create 4
  - edit 5
  - update 6
  - delete 7 
*/

const viewPath = "datas";
const Data = require("../models/Data");
const User = require("../models/user");

exports.index = async (req, res) => {
  try {
    const datas = await Data.find()
      .populate("user")
      .sort({ updatedAt: "desc" });

    res.render(`${viewPath}/index`, {
      pageTitle: "Data List",
      datas: datas,
    });
  } catch (error) {
    req.flash(
      "danger",
      `There was an error displaying the data list: ${error}`
    );
    res.redirect("/");
  }
};

exports.show = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id).populate("user");
    console.log(data);
    res.render(`${viewPath}/show`, {
      pageTitle: data.title,
      data: data,
    });
  } catch (error) {
    req.flash("danger", `There was an error displaying this data: ${error}`);
    res.redirect("/");
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: "New Data",
  });
};

exports.create = async (req, res) => {
  try {
    console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });
    console.log("User", user);
    const data = await Data.create({ user: user._id, ...req.body });

    req.flash("success", "Data created successfully");
    res.redirect(`/datas/${data.id}`);
  } catch (error) {
    req.flash("danger", `There was an error creating this data: ${error}`);
    req.session.formData = req.body;
    res.redirect("/datas/new");
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
    req.flash("success", "The data was deleted successfully");
    res.redirect(`/datas`);
  } catch (error) {
    req.flash("danger", `There was an error deleting this data: ${error}`);
    res.redirect(`/datas`);
  }
};
