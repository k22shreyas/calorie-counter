import fetch from 'node-fetch';
import express, { response } from 'express';
import https from 'https';
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/", function (request, response){
  response.sendFile("/workspaces/codespaces-express/index.html");
});

app.get("/getsearchword", function (request, response){
  var searchword = request.query.first;
  if (searchword != "") {
    console.log(searchword);
    const url = `https://api.apilayer.com/spoonacular/recipes/autocomplete?query=${searchword}&apikey=mGAW74xIyucj3kfBlC996NK7rw1pXg06`
    https.get(url,function(response){
      response.on("data",function(data){
        const items =[];
        data.forEach(obj => {
          //obj now points to each entry in the data variable
          items.push(obj.title);
        });
        console.log(items)
      })
    })
    //getSearchWord(searchword);
  }else{
    response.send("Input the search word");
  }
});

/*
async function getSearchWord(searchword){
  let requestOptions = {};
  const items = [];
  await fetch(`https://api.apilayer.com/spoonacular/recipes/autocomplete?query=${searchword}&apikey=mGAW74xIyucj3kfBlC996NK7rw1pXg06`, requestOptions)
  .then(response => response.json())
  .then((data) =>{
    data.forEach(obj => {
      //obj now points to each entry in the data variable
      items.push(obj.title);
    });
    console.log(items)
  })
  .catch((error) => {5
    console.log(error)
  });
}
async function displaySearchResults(){
  
}
*/