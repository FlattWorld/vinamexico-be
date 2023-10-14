import dotenv from 'dotenv';
dotenv.config({path: './config.env'})

import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8001;
const DBLINK = process.env.DATABASE || '';
const DBPASS = process.env.DB_PASSWORD || '';

const DB = DBLINK.replace('<PASSWORD>', DBPASS)

mongoose.connect(DB).then((connection) => {
  console.log('DB connection successful!');
})

app.listen(PORT, () => {  
    console.log(`🛸 Server running on port ${PORT}`);
});



