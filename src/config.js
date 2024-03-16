const mongoose = require("mongoose");
const connect=mongoose.connect("mongodb+srv://mongo:UNE8bmYvV38FARx5@cluster0.l2ubs1d.mongodb.net/revive");



connect.then(() =>{
    console.log("database connected succesfully");
})
.catch(() =>{
    console.log("failed");
})

//schema users
const LoginSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// model users
const loginmodel = mongoose.model("users",LoginSchema);


// schema savedata
const saveSchema = new mongoose.Schema({
   
    
    library:{
        type: String,
        required: true,
        
        
    },
    canteen:{
        type: String,
        required: true,
        
        
    },
    portico:{
        type: String,
        required: true
        
    },
    auditorium:{
        type: String,
        required: true
        
    },
    ground:{
        type: String,
        required: true
        
    }, 
    
    
   
});
  
// model savedata
const savemodel = mongoose.model("soildatas",saveSchema);

//model farmers

const farmerSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        
        
    },
    message:{
        type: String,
        required: true
        
    },
    linkname:{
        type: String,
        
    },
    
    link:{
        type: String,
        
        
    },
    image:{  
        type: String,
        required:true
    }
   
    
});

// model farmerdata
const farmermodel = mongoose.model("farmers",farmerSchema);

// feedback

const feedbackSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
        
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
        
    }
   
     
});

// model savedata
const feedbackmodel = mongoose.model("feedbacks",feedbackSchema);

//schema test
const testSchema = new mongoose.Schema({
    
    library:{
        type: String,
        required: true,
        
        
    },
    canteen:{
        type: String,
        required: true,
        
        
    },
    portico:{
        type: String,
        required: true
        
    },
    auditorium:{
        type: String,
        required: true
        
    },
    ground:{
        type: String,
        required: true
        
    }, 
   
   
});

// model test
const testmodel = mongoose.model("tests",testSchema);

// exports

module.exports ={
    loginmodel,
    savemodel,
    farmermodel,
    feedbackmodel,
    testmodel,
};

