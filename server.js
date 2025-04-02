
const express=require("express");

const app=express();

const shortId=require("shortid");


const mongoose=require("mongoose");
const User=require('./model');
mongoose.connect("mongodb://localhost/urlDb");

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async(req,res)=>{
     res.render('index');  
})


app.post('/post1',async(req,res)=>{
   
        const chk= await User.findOne({longurl: req.body.fullUrl});
 
        if(chk==null){
            
     const add= await User.create({shorturl: shortId.generate() ,longurl: req.body.fullUrl,clicks:0});
     add.save();
     return res.render('index',{urls: add.shorturl})
        }
       
       return res.render('index',{urls:chk.shorturl});
    
});

app.get('/:short', async(req,res)=>{
     
    const s=req.params.short;
    const check=await User.findOne({shorturl:s});
    if(check==null){
        res.sendStatus(404)
        return
    }
    check.clicks++;
    check.save();
    
    res.redirect(check.longurl);
      })

app.listen(3000,()=>{
    console.log("Server started")
})

