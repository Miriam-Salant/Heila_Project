const mongoose = require("mongoose")

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error("Oops, you didn't connect to DB\n" + err)
    }
}

module.exports = conectDB