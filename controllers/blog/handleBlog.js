const blogModel = require("../../model/Blog");
const commentModel = require("../../model/comment");


function handleBlogGet(req, res){
    res.render("addBlog",{data : {user : req.user}})
}




async function handleBlogPost(req,res){
    console.log("req.body ", req.body);
    console.log('file', req.file);

    const newBlog = await blogModel.create({
        title : req.body.title,
        content : req.body.content,
        coverImageUrl: `uploads/${req.file.filename}`,
        createdBy : req.user._id
    });

    res.redirect("/home");
}

async function handleOneBlogGet(req, res){
    const blog = await blogModel.findById({_id : req.params.id}).populate("createdBy")
    const comment = await commentModel.find({blogId : req.params.id}).populate("createdBy");
    // console.log("comment thing..", comment)
    if(comment.length){
        return res.render("Blog",{data:{blogData : blog, user : req.user, commentData : comment}})
    }else{
        return res.render("Blog", {data:{blogData : blog, user : req.user, commentData : false}});
    }
}


async function handleComment(req, res){
    console.log('working')
    const comment = await commentModel.create({
        content: req.body.content,
        createdBy : req.user._id,
        blogId : req.params.blogId
    })

    res.redirect(`/blog/${req.params.blogId}`);
}


module.exports= {
    handleBlogGet,
    handleBlogPost,
    handleOneBlogGet,
    handleComment
}