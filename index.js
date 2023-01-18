import fetch from 'node-fetch';
import express, { response } from 'express';
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
    getSearchWord(searchword);
  }else{
    response.send("Input the search word");
  }
});

async function getSearchWord(searchword){
  let requestOptions = {};
  await fetch(`https://api.apilayer.com/spoonacular/recipes/autocomplete?query=${searchword}&apikey=mGAW74xIyucj3kfBlC996NK7rw1pXg06`, requestOptions)
  .then(response => response.json())
  .then((data) =>{
    data.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
      });
      console.log('-------------------');
    });
  })
  .catch((error) => {
    console.log(error)
  });
  
}
