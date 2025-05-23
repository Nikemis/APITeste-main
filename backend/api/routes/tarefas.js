import app from 'express'
import tarefaModel from '../models/tarefa.js'

const tarefasRoutes = app.Router();

tarefasRoutes.post('/tarefas', async (req, res) => {
    const objetoTarefa = new tarefaModel({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    })

    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

tarefasRoutes.get('/tarefas', async (req, res) => {
    try {
        const resultados = await tarefaModel.find();
        res.json(resultados)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

tarefasRoutes.delete('/tarefas/:id', async (req, res) => {
    try {
        const resultado = await tarefaModel.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

tarefasRoutes.put('/tarefas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novaTarefa = req.body;
        const options = { new: true };

        const result = await tarefaModel.findByIdAndUpdate(
            id, novaTarefa, options
        )
        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export { tarefasRoutes };