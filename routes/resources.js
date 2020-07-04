const {
  index,
  show,
  new: _new,
  create,
  edit,
  update,
  delete: _delete,
} = require("../controllers/ResourceController");

function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("danger", "You need to login first.");
    return res.redirect("/login");
  }
  next();
}

module.exports = (router) => {
  router.get("/datas", index);
  router.get("/datas/new", auth, _new);
  router.post("/datas", auth, create);
  router.post("/datas/update", auth, update);
  router.post("/datas/delete", auth, _delete);
  router.get("/datas/:id/edit", auth, edit);
  router.get("/datas/:id", show);
};
