const { createUser, getUserByUSerId, getUsers, UpdateUser, DeleteUsers, Login,contactUs } = require("./user.controller");
const router = require("express").Router();
const multer  = require('multer')

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload= multer({storage})

router.post("/", upload.single('file'), createUser)
router.get("/:id", getUserByUSerId)
router.get("/", getUsers)
router.patch("/", UpdateUser)
router.delete("/", DeleteUsers)
router.post("/login", Login)
router.post("/contactus", contactUs)
module.exports = router 