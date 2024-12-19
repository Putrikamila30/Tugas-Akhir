const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


app.route('/todos')
    .get((req, res) => {
        TodoModel.find()
            .then(todos => res.json(todos))
            .catch(err => res.status(500).json(err));
    })
    .post((req, res) => {
        const { task } = req.body;
        TodoModel.create({ task })
            .then(todo => res.status(201).json(todo))
            .catch(err => res.status(500).json(err));
    });

app.route('/todos/:id')
    .put((req, res) => {
        TodoModel.findByIdAndUpdate(req.params.id, { done: true }, { new: true })
            .then(todo => res.json(todo))
            .catch(err => res.status(500).json(err));
    })
    .delete((req, res) => {
        TodoModel.findByIdAndDelete(req.params.id)
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).json({ error: 'Todo not found' });
                }
            })
            .catch(err => res.status(500).json(err));
    });

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});