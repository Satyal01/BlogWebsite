const express = require("express");
const multer = require("multer");
const path = require("path")


// setting destination and filename for coverImage  uploads
const storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function(req, file, cb){
        console.log('here in the filename')
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({storage: storage})

const blogRouter = express.Router();


const {handleBlogGet, handleBlogPost, handleOneBlogGet , handleComment}  = require("../controllers/blog/handleBlog")
const {restricTo} = require("../middleware/checkToken")

blogRouter.route("/add-new")
.all(restricTo(["USER","ADMIN"]))
.get(handleBlogGet)
.post(upload.single("coverImage") ,handleBlogPost)


blogRouter.route("/:id")
.get(handleOneBlogGet)


blogRouter.route("/comment/:blogId")
.post(handleComment);

module.exports = blogRouter;