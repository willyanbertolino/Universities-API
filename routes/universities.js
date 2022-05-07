const express = require('express');
const router = express.Router();

const {
  createUniversity,
  getAllUniversities,
  getSingleUniversity,
  updateUniversity,
  deleteUniversity,
} = require('../controllers/universities');

router.route('/').post(createUniversity).get(getAllUniversities);

router
  .route('/:id')
  .get(getSingleUniversity)
  .patch(updateUniversity)
  .delete(deleteUniversity);

module.exports = router;
