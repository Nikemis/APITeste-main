import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nome: {
        unique: true,
        type: String
    },
    senha: {
        required: true,
        type: String
    },
},
    {
        versionKey: false
    }
);

export default mongoose.model('User', userSchema);