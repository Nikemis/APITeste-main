import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import userModel from './models/user.js';
import { isLoggedIn } from './middlewares/index.js'
import { tarefasRoutes } from './routes/tarefas.js'
import { usersRoutes } from './routes/users.js'
import jwt from 'jsonwebtoken'

await mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'id-token', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).send('<h1>Ola Mundo</h1>');
});

app.post('/login', async (req, res) => {
    try {
        const data = await userModel.findOne({ 'nome': req.body.nome });

        if (data != null && data.senha === req.body.senha) {
            const token = jwt.sign({ id: req.body.user }, 'segredo',
                { expiresIn: 300 });
            return res.json({ token: token });
        }

        res.status(500).json({ message: 'Login invalido!' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.use('/api', isLoggedIn, tarefasRoutes);
app.use('/api', isLoggedIn, usersRoutes);
app.listen(3000, () => console.log('Server ready on http://localhost:3000.'));

export default app;