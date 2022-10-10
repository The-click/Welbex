const Router = require('express');
const TableController = require('../controllers/TableController');
const router = new Router();



router.post('/', TableController.create);
router.get('/', TableController.get);
router.delete('/:id', TableController.delete);





module.exports = router;