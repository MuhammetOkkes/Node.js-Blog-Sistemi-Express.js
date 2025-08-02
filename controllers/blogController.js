const BlogManager = require("../models/BlogManager");
const blogManager = new BlogManager();
const { StatusCodes } = require("http-status-codes");

blogManager.on("blogCreated", (blog) => {
  blogManager.logActivity(`Yeni blog oluşturuldu: ${blog.title} (${blog.id})`);
});

blogManager.on("blogRead", (blog) => {
  blogManager.logActivity(`Blog okundu: ${blog.title} (${blog.id})`);
});

blogManager.on("blogAllRead", (blog) => {
  blogManager.logActivity(`Tüm bloglar okundu`);
});

blogManager.on("blogUpdated", (blog) => {
  blogManager.logActivity(`Blog güncellendi: ${blog.title} (${blog.id})`);
});

blogManager.on("blogDeleted", (blog) => {
  blogManager.logActivity(`Blog silindi: ${blog.title} (${blog.id})`);
});

const getHome = (req, res) => {
  res.status(StatusCodes.OK).json("Ana Sayfaya Hoş Geldiniz!");
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogManager.getAllBlogs();
    res.status(StatusCodes.OK).json(blogs);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Sunucu hatası: " + err.message);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogManager.readBlog(id);
    res.status(StatusCodes.OK).json(blog);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json("Blog bulunamadı");
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await blogManager.createBlog(title, content);
    res.status(StatusCodes.CREATED).json(blog);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Blog oluşturulamadı: " + err.message);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await blogManager.updateBlog(id, title, content);
    res.status(StatusCodes.OK).json(blog);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json("Güncellenecek blog bulunamadı");
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await blogManager.deleteBlog(id);
    res.status(StatusCodes.OK).json("Blog silindi");
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json("Silinecek blog bulunamadı");
  }
};

module.exports = {
  getHome,
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
