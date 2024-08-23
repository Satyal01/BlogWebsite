const blogModel = require("../../model/Blog")

async function handleAllBlog(req, res){ 

    const allBlogs = await blogModel.find();
    res.render("Home", {data : {user: req.user, blogs : allBlogs}})
}


module.exports ={
    handleAllBlog
}