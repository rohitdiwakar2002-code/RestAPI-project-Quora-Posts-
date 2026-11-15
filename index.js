const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require("method-override");


///connect folder----/
const path = require("path");


//--api express (request handle) ----//
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));



// -------connect the other folder-----
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//--create a array to store data (main body)---/
let posts = [
    { id:"1a",
        username : "Vishu Jatav",
        content :   "I love Sname!",
    },

     { id:"2b",
        username : "Ritik Gupta",
        content :   "I love Inst id!",
    },
    
    { id:"3c",
        username : "Vinayak Tripathi",
        content :   "I love Birayani!",
    },
    
     {id:"4d",
        username : "Suraj Rana",
        content :   "I love Gaming!",
    },
    
     {id:"5f",
        username : "Sahil",
        content :   "I need only one Gf!",
    },
    
];


//---Create a path ----///...
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//---add new page on screen-----//
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

//---Get request is not gd we need to use Post request---//
app.post("/posts",(req,res)=>{
    console.log(req.body);

    // add this post on our main page--/


    let { username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
});


// -----id naming on every post---//
app.get("/posts/:id",(req,res)=>{
    let{id} = req.params;
    // console.log(id);
    let post = posts.find((p)=> id ===p.id);
    
    res.render("Show.ejs",{post});
    console.log(post);
});


// --update your posts ----//
app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id ===p.id);
    post.content = newContent;
    console.log(post);
res.redirect("/posts");

});
// ---Edit your profiles --//
app.get("/posts/:id/edit",(req,res)=>{
    let{id} = req.params;
     let post = posts.find((p)=> id ===p.id);
     res.render("edit.ejs",{post});
});
//---Delete your post request--//
app.delete("/posts/:id",(req,res)=>{
let{id} = req.params;
  posts = posts.filter((p)=> id !==p.id);
//  res.send("delete is your posts");
res.redirect("/posts");
});





app.listen(port,()=>{
    console.log("listening to the port :8080");
});


