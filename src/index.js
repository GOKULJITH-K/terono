const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {loginmodel,savemodel,farmermodel,feedbackmodel,testmodel} = require("./config");
const multer =require("multer");
const fs = require('fs');
const cookieParser = require('cookie-parser');
const port=process.env.PORT || 3000 ;
 
    
const app = express();
 
const secretKey = process.env.SECRET_KEY || 'REVIVE';
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine','ejs');

app.use(express.static("public"));
app.use(express.static("uploads"));

const verifyToken = async(req,res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:'Unauthorized'});

 
    try{
        const decoded = await jwt.verify(token,secretKey);
        req.user = decoded;
    }
    catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
};
const extractToken = (req,res)=>{
    const token = req.headers['authorization'];
    if(token){
        req.token= token.split(' ')[1];
    }
    
};

const storage=multer.diskStorage ({
        destination:function(req,file,cb)
        {cb(null, './uploads'); 
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`);
    },
    });

const upload = multer({ storage:storage });



   

app.get("/",(req,res)=>{

    if (req.cookies.token) {
                
        res.render("welcome");
    } else {
    
        res.render("index");
    }


})
app.get("/login",(req,res)=>{

    const message = ""; 
    res.render("login", { message: message });
})
app.get("/signup",(req,res)=>{
    res.render("signup"); 
})
app.get("/logout", (req, res) => {
    const message = ""; 
    res.clearCookie('token'); 
    res.render("login", { message: message });
    
    
});
app.get("/welcome",extractToken,verifyToken, async(req,res)=>{

    const farmerdata = await farmermodel.find().sort({_id:-1}).limit().exec();
    res.render("welcome",{farmerdata:farmerdata});
  
})  
app.get("/weather",(req,res)=>{

    if(req.cookies.token){

        res.render("weather");

    }else{

        res.render("index");
    } 
})
app.get("/profile",(req,res)=>{

    if(req.cookies.token){

        res.render("profile");

    }else{

        res.render("index");
    } 
})
app.get("/about",(req,res)=>{

    if(req.cookies.token){

        res.render("about");

    }else{

        res.render("index");
    } 
}) 
app.get("/contact",(req,res)=>{

    if(req.cookies.token){

        res.render("contact");

    }else{

        res.render("index");
    } 
})
app.get("/crop",async(req,res)=>{
    const testdata = await testmodel.find().sort({_id:-1}).limit(15).exec();

    const nitrogenval=testdata.map(soil=>soil.nitrogen);
    const nitrogen=Number(mode(nitrogenval));

    const phosphorusval=testdata.map(soil=>soil.phosphorous);
    const phosphorous=Number(mode(phosphorusval));

    const potassiumval=testdata.map(soil=>soil.potassium);
    const potassium=Number(mode(potassiumval));

    const pHval=testdata.map(soil=>soil.ph);
    const ph=Number(mode(pHval)); 

    const temperatureval=testdata.map(soil=>soil.temperature);
    const temperature=Number(mode(temperatureval));

    const humidityval=testdata.map(soil=>soil.humidity);
    const humidity=Number(mode(humidityval));
    
    const electrical_conductivityVal=testdata.map(soil=>soil.electrical_conductivity);
    const electrical_conductivity=Number(mode(electrical_conductivityVal));
    
    if(req.cookies.token){

        res.render("crop",
        {
            nitrogen:nitrogen,
            phosphorous:phosphorous,
            potassium:potassium,
            ph:ph,
            temperature:temperature,
            humidity:humidity,
            electrical_conductivity:electrical_conductivity
            
        });

    }else{

        res.render("index");
    }
   
})
app.get("/complaint",async(req,res)=>{
    const testdata = await testmodel.find().sort({_id:-1}).limit(30).exec();

    const nitrogenval=testdata.map(soil=>soil.nitrogen);
    const nitrogen=Number(mode(nitrogenval));

    const phosphorusval=testdata.map(soil=>soil.phosphorous);
    const phosphorous=Number(mode(phosphorusval));

    const potassiumval=testdata.map(soil=>soil.potassium);
    const potassium=Number(mode(potassiumval));

    const pHval=testdata.map(soil=>soil.ph);
    const ph=Number(mode(pHval));

    const temperatureval=testdata.map(soil=>soil.temperature);
    const temperature=Number(mode(temperatureval));

    const humidityval=testdata.map(soil=>soil.humidity);
    const humidity=Number(mode(humidityval));
    
    const electrical_conductivityVal=testdata.map(soil=>soil.electrical_conductivity);
    const electrical_conductivity=Number(mode(electrical_conductivityVal));
    if(req.cookies.token){

        res.render("complaint",{
            nitrogen:nitrogen,
            phosphorous:phosphorous,
            potassium:potassium,
            ph:ph,
            temperature:temperature,
            humidity:humidity,
            electrical_conductivity:electrical_conductivity,
        });

    }else{

        res.render("index");
    }
   
    
})
app.get("/admin",(req,res)=>{
    res.render("admin");
})
app.get("/farmer",(req,res)=>{
    res.render("farmer");
})
app.get("/test",(req,res)=>{
    res.render("test");
})
app.get("/farmerassist",async(req,res)=>{
    const assistdata = await farmermodel.find().sort({_id:-1}).exec();
   
    if(req.cookies.token){

        res.render("farmerassist",{assistdata:assistdata});
    }else{

        res.render("index");
    }
   
})
app.get("/bindirection/library",async(req,res)=>{
    const lat = "11.9853032";
    const lng = "75.3816390"; 
   
    if(req.cookies.token){

        res.render("bindirection",{lat:lat, lng:lng});
    }else{
 
        res.render("index");
    }
   
})
app.get("/feedback",async(req,res)=>{
    const feedbackdata = await feedbackmodel.find().sort({_id:-1}).exec();
    res.render("feedback",{feedbackdata:feedbackdata});
})  
app.get("/invoice",async(req,res)=>{
    
    
    if(req.cookies.token){

        res.render("invoice");
    }else{

        res.render("index");
    }
      
})  
app.get("/receipt",async(req,res)=>{
    
    
    if(req.cookies.token){

        res.render("receipt");
    }else{

        res.render("index");
    }
    
}) 
app.get("/request",async(req,res)=>{
    
    
    if(req.cookies.token){

        res.render("request");
    }else{

        res.render("index");
    }
    
}) 
app.get("/statement",async(req,res)=>{
    
    
    if(req.cookies.token){

        res.render("statement");
    }else{

        res.render("index");
    }
    
}) 
app.get("/visit",async(req,res)=>{
    
    
    if(req.cookies.token){

        res.render("visit");
    }else{

        res.render("index");
    }
    
}) 
app.get("/selection",async(req,res)=>{

    if(req.cookies.token){

        res.render("selection");
    }else{

        res.render("index");
    }

    
})
app.get("/delete",async(req,res)=>{

    //const deldata = await savemodel.findOne().sort({_id:-1}).exec();
    //const soilname = deldata.soilname;
    
    if(req.cookies.token){

        res.render("delete");
    }else{

        res.render("index");
    }
    
})
app.get("/alert",async(req,res)=>{

    const soildatas = await savemodel.find().sort({_id:-1}).exec();
    if(req.cookies.token){

        res.render("alert", {soildatas: soildatas});

    }else{

        res.render("index");
    }
     
})
app.get("/delete/delete-data", async(req,res)=>{
    
  
        await testmodel.deleteMany();
        const testdata = await testmodel.find().sort({_id:-1}).limit(15).exec();

        const nitrogenval=testdata.map(soil=>soil.nitrogen);
        const nitrogen=Number(mode(nitrogenval));
    
        const phosphorusval=testdata.map(soil=>soil.phosphorous);
        const phosphorous=Number(mode(phosphorusval));
    
        const potassiumval=testdata.map(soil=>soil.potassium);
        const potassium=Number(mode(potassiumval));
    
        const pHval=testdata.map(soil=>soil.ph);
        const ph=Number(mode(pHval));
    
        const temperatureval=testdata.map(soil=>soil.temperature);
        const temperature=Number(mode(temperatureval));

        const humidityval=testdata.map(soil=>soil.humidity);
        const humidity=Number(mode(humidityval));
        
        const electrical_conductivityVal=testdata.map(soil=>soil.electrical_conductivity);
        const electrical_conductivity=Number(mode(electrical_conductivityVal));

        if(req.cookies.token){

            res.render("savedata",{
                nitrogen:nitrogen,
                phosphorous:phosphorous,
                potassium:potassium,
                ph:ph,
                temperature:temperature,
                humidity:humidity,
                electrical_conductivity:electrical_conductivity,
            });
            
        }else{
    
            res.render("index");
        }
        
        
      
})
app.get("/alert/:id",async(req,res)=>{

    let id=req.params.id;
    const alertdata = await savemodel.findById(id);
    const soilname= alertdata.soilname;
    const datealert = alertdata.date;
    
    if(req.cookies.token){

        res.render("alert",
        {
          soilname:soilname,
          date:datealert,
          id:id
      });
        
    }else{

        res.render("index");
    }
   
    
})

  
app.get("/alert/delete/:id",async(req,res)=>{


    let id=req.params.id;
    await savemodel.findByIdAndDelete(id)

    const soildatas = await savemodel.find().sort({_id:-1}).exec();
    if(req.cookies.token){

        res.render("soilhealth", {soildatas: soildatas});
        
    }else{

        res.render("index");
    }
     
})
app.get("/selection/:id",async(req,res)=>{
    
    let id=req.params.id;
    
    const soildatas = await savemodel.findById(id);
    const nitrogen = soildatas.nitrogen;
    const phosphorous = soildatas.phosphorous;
    const potassium = soildatas.potassium;
    const ph = soildatas.ph;
    const temperature = soildatas.temperature;
    const humidity = soildatas.humidity;
    const electrical_conductivity = soildatas.electrical_conductivity;

    if(req.cookies.token){

        res.render("selection",{
            nitrogen:nitrogen,
            phosphorous:phosphorous,
            potassium:potassium,
            ph:ph,
            temperature:temperature,
            humidity:humidity,
            electrical_conductivity:electrical_conductivity,
        });
        
    }else{

        res.render("index");
    }

     
})


  
//

 
function mode(array){
    if (array.length==0)
    return null;
    var modeMap={};
    var maxEl=array[0],maxCount=1;
    for (var i=0;i<array.length;i++){
        var el =array[i];
        if(modeMap[el]==null)
        modeMap[el]=1;
        else
        modeMap[el]++;
        if(modeMap[el]>maxCount){
            maxEl=el;
            maxCount=modeMap[el];
        }
    }
    return maxEl;
}
       

//login router

app.post("/login", express.json(), async(req,res)=>{

    // cookie adding 

    try{
        const check=await loginmodel.findOne({username: req.body.username});
        if(!check){

            const message = "You have an invalid username";
            res.render("login", { message: message });
             
        } 
 
        const isPasswordMatch=await bcrypt.compare(req.body.password, check.password);
        if(req.body.username=="admin" && req.body.password=="admin" ){

            res.render("admin");

        }else if(isPasswordMatch){

            const token = jwt.sign({
                userId: check._id,
                username: check.username
            }, secretKey, { expiresIn: '7d' });

            res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); 

            res.render("welcome");
             
        } 
        else{ 
           const message = "You have an invalid password";
            res.render("login",{message:message});
        }
    }catch{
        const message = "You have an invalid password";
            res.render("login",{message:message});
    }
    

   

})

// signup router

app.post("/signup", async(req,res) =>{

    const data={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password
    }

    const existingUser = await loginmodel.findOne({name:data.username});

    if(existingUser){
        
        res.send("User exist");
    }
    else{ 
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const logindata=await loginmodel.insertMany(data);
        console.log(logindata);
 
    }
     res.render("signup");
    
})
 
// save data router

app.post("/savedata", upload.single("image"), async(req,res) =>{

   // const imageBuffer = fs.readFileSync(req.file.path);
    const userdata={

        library:req.body.coordinates1,
        canteen:req.body.coordinates2,
        portico:req.body.coordinates3,
        auditorium:req.body.coordinates4,
        ground:req.body.coordinates5,
        //image: imageBuffer 
           
    }
   
       
        const savedata=await savemodel.insertMany(userdata);
        console.log(savedata);
       
        
        res.render("welcome");
  
  
    
})
app.post("/farmer", upload.single("image"), async(req,res) =>{

    const farmerdata={

        title:req.body.title,
        message:req.body.message,
        linkname:req.body.linkname,
        link:req.body.link,
        image:req.file.filename 
        
    }
    
       
        const farmersdata=await farmermodel.insertMany(farmerdata);
        console.log(farmersdata);
       
        
        res.render("farmer");
  
  
    
})

// feedback router
app.post("/feedback", async(req,res) =>{

    const feedbackdata={

        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        
    }
   
       
        const feedbacksdata=await feedbackmodel.insertMany(feedbackdata);
        console.log(feedbacksdata);
       
        
        res.redirect("welcome")
  
  
    
})
 // router test

 app.post("/test", async(req,res) =>{

    const testdata={

      
        library:req.body.library,
        canteen:req.body.canteen,
        portico:req.body.portico,
        auditorium:req.body.auditorium,
        ground:req.body.ground,
        
        
    }
     
       
        const testsdata=await testmodel.insertMany(testdata);
        console.log(testsdata);
       
         
        res.render("test");
  
 }) 
 
  
  

app.listen(port,() => {
    console.log(`server running on port:${port} `);
})
   