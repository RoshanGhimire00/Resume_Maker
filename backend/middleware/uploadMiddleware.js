import multer from 'multer';


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/') // Specify the destination folder
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`) 
    }
});

//File FILTER

const fileFilter=(req,file,cb)=>{
    const allowedTypes= ["images/jpeg","image/png","image/jpg"];

    if(allowedTypes.includes(file.minetype)){
        cb(null, true)
    
    }else{
        cb(new Error("Only .jpeg, .jpg and .png files are allowed"),false)
    }

}
const upload =multer({storage,fileFileter})

export default upload;
