const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);


router.get('/', async (req, res) => {
    try {
        const zoos = await find();
        res.json(zoos);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const zoo = await find(id);
        if (zoo && Object.keys(zoo) > 0) return res.json(zoo);
        return res.status(400).json({message: "ID not found."});
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newZoo = await add(req.body);
        if (newZoo) return res.status(200).json(newZoo);
        res.status(400).json({ message: "Unable to add."})
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedZoo = await update(req.params.id, req.body);
        if (updatedZoo) return res.status(200).json(updatedZoo);
        return res.status(400).json({ message: "Could not update."});
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;