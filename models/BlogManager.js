// Database yerine file system
// Veri kaynağı katmanı
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const { v4: uuidv4 } = require("uuid");

class BlogManager extends EventEmitter {
  constructor() {
    super();
    this.blogsDir = path.join(__dirname, "../blogs");
    this.logsDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(this.blogsDir)) fs.mkdirSync(this.blogsDir);
    if (!fs.existsSync(this.logsDir)) fs.mkdirSync(this.logsDir);
  }

  createBlog(title, content) {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const date = new Date().toISOString();
      const blogData = { id, title, content, date, readCount: 0 };
      const filePath = path.join(this.blogsDir, `blog-${id}.json`);
      fs.writeFile(filePath, JSON.stringify(blogData, null, 2), (err) => {
        if (err) return reject(err);
        this.emit("blogCreated", blogData);
        resolve(blogData);
      });
    });
  }

  readBlog(id) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.blogsDir, `blog-${id}.json`);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        const blog = JSON.parse(data);
        blog.readCount++;
        fs.writeFile(filePath, JSON.stringify(blog, null, 2), (err) => {
          if (err) return reject(err);
        });
        this.emit("blogRead", blog);
        resolve(blog);
      });
    });
  }

  getAllBlogs() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.blogsDir, (err, files) => {
        if (err) return reject(err);
        const jsonFiles = files.filter(
          (file) => path.extname(file) === ".json"
        );
        const blogs = [];

        let count = 0;

        jsonFiles.forEach((file) => {
          const filePath = path.join(this.blogsDir, file);
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (!err) blogs.push(JSON.parse(data));
            count++;
            if (count === jsonFiles.length) this.emit("blogAllRead", blogs);
            resolve(blogs);
          });
        });
      });
    });
  }

  updateBlog(id, title, content) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.blogsDir, `blog-${id}.json`);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        const blog = JSON.parse(data);
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.date = new Date().toISOString();
        fs.writeFile(filePath, JSON.stringify(blog, null, 2), (err) => {
          if (err) return reject(err);
        });
        this.emit("blogUpdated", blog);
        resolve(blog);
      });
    });
  }

  deleteBlog(id) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.blogsDir, `blog-${id}.json`);
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return reject(err);
        const blog = JSON.parse(data);
        fs.unlink(filePath, (err) => {
          if (err) return reject(err);
          this.emit("blogDeleted", blog);
          resolve();
        });
      });
    });
  }

  logActivity(message) {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    const logPath = path.join(this.logsDir, "activity.log");
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) console.error("Log hatası:", err);
    });
  }
}

module.exports = BlogManager;
