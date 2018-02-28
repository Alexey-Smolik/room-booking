const express = require('express');
const app = express();
//const models = require('./models');
const path = require('path');




app.set('PORT', process.env.PORT || 3000);
app.get('/api/room', (req,res) => {
    res.send("Server get method");
    console.log("Server request Get ");
    
}); 


app.listen(app.get('PORT') , ()=> {
	console.log("Server is running on port 3000");
});