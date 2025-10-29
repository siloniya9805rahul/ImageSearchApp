
import { connect } from 'mongoose';
async function connectDb() {
    try {
        const connection = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log("MongoDB connexted !")

    } catch (error) {
        console.log(error)
    }
}

export default connectDb;