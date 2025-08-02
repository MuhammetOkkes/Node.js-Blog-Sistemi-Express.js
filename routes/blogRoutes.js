const express = require("express");
const router = express.Router();
const {
  getHome,
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/", getHome);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlog);
router.post("/create", createBlog);
router.put("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

module.exports = router;
