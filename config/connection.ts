const mongoose = require('mongoose');
const connectDB = async (DBURL:string) => {
try {
        const DB_OPTIONS = {dbName:'express-auth', useNewUrlParser: true, useUnifiedTopology: true }

        await mongoose.connect(DBURL,DB_OPTIONS);
        console.log(`connection successfully ....`);
    } catch(err) {
        console.log(`err`,err);
    }
}

export default connectDB