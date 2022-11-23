const express=require('express')
const app=express();
const port=process.env.PORT || 4000;
const cors=require('cors');//ei server side er port(5000) theke client side er port(3000) a access krte chaile ei cors use krte hbe

app.use(cors());

//middleware
const categories=require('./Data/Categories.json');//Category.json 1 no file setup.
const news=require('./Data/News.json');//All types of news News.json 2 no file setup.

app.get('/',(req,res)=>{
    res.send('News API is Running');
})


//1 no file Category.json used and send response to client side.
app.get('/news-categories',(req,res)=>{//left side nav bar a news category name gula ke show krar jnno.
    res.send(categories); 
})


app.get('/category/:id',(req,res)=>{
    const id=req.params.id;//category news gulo ke hold krte hle ei params dia hold krte hbe...Ar req er vitor by default params thake jeta id te hold krbe
    if (id==='08'){//Category id=8 holo All news.tai categotry 8 a click krle all news show krbe.
        res.send(news);
    }
    else{
        const category_news=news.filter(n=>n.category_id===id);//1 ta news category er moddhe onk news thkbe tai ekhane filter use kra hoyce,
        res.send(category_news);
    }
})

//2 no file News.json used and send response to client side.
app.get('/news',(req,res)=>{//sob gula news amra client side er home a send krteci..it means web site a home a click krle sob gula news show krbe.
    res.send(news);
})


app.get('/news/:id',(req,res)=>{//je id te je news ace sei id te click krle sei news show krbe.
    const id=req.params.id;
    const selectedNews=news.find(n=>n._id===id);//it means id onujayy news web a show krbe specific 1 ta news item ke show krbe.a jnno find
    res.send(selectedNews);
})

app.listen(port, ()=>{
    console.log('Dragon News Server running on port',port);
})