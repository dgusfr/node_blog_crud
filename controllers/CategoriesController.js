const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.get("/categories/save", (req, res) => {
  const title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(),
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});
module.exports = router;
