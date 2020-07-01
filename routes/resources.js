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
    return res.redirect("/resource");
  }
  next();
}

module.exports = (router) => {
  router.get("/resource", index); // public
  router.get("/resource/new", auth, _new); // authenticated
  router.post("/resource", auth, create); // authenticated
  router.post("/resource/update", auth, update); // authenticated
  router.post("/resource/_delete", auth, _delete); // authenticated
  router.get("/resource/:id/edit", auth, edit); // authenticated
  router.get("/resource/:id", show); // public
};
