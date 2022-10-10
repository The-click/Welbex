require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const db = require('./db');

// const errorHandler = require('./middleware/ErrorHandlingMiddleware');




const PORT = process.env.PORT || 5000; 


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);




// app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message:'Working'});
})

const start = async () => {
    try{
        app.listen(PORT, () => console.log('Server start on port ' + PORT));
    }catch (e){
        console.log(e);

    }
}
start();