import app from 'express'
import userModel from '../models/user.js'

const usersRoutes = app.Router();

usersRoutes.post('/users', async (req, res) => {
    const objetoUser = new userModel({
        nome: req.body.nome,
        senha: req.body.senha
    })

    try {
        const userSalvo = await objetoUser.save();
        res.status(200).json(userSalvo)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

usersRoutes.get('/users', async (req, res) => {
    try {
        const resultados = await userModel.find();
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usersRoutes.delete('/users/:id', async (req, res) => {
    try {
        const resultado = await userModel.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

usersRoutes.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novoUser = req.body;
        const options = { new: true };
        
        const result = await userModel.findByIdAndUpdate(
            id, novoUser, options
        )
        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export { usersRoutes };