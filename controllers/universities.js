const Universities = require('../models/universities');

const createUniversity = async (req, res) => {
  const {
    alpha_two_code,
    domains,
    country,
    state_province,
    web_pages,
    name,
  } = req.body;

  if (
    !alpha_two_code ||
    !name ||
    !country ||
    domains.length === 0 ||
    web_pages.length === 0
  )
    throw new CustomError.NotFoundError('Please provide all informations.');

  const repeatedUniversity = await Universities.findOne({
    country,
    name,
    alpha_two_code,
  });

  if (repeatedUniversity) {
    throw new CustomError.NotFoundError('University already exists');
  }

  const university = await Universities.create({
    alpha_two_code,
    domains,
    country,
    state_province,
    web_pages,
    name,
  });
  res.status(200).json({ university });
};

const getAllUniversities = async (req, res) => {
  const universities = await Universities.find({});

  res.status(200).json({ universities });
};

const getSingleUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await Universities.findOne({ _id: id });

  if (!university) {
    throw new CustomError.NotFoundError(
      `Sorry, there is no university with id : ${id}`
    );
  }

  res.status(200).json({ university });
};

const updateUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await Universities.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!university) {
    throw new CustomError.NotFoundError(`No university with id : ${id}`);
  }

  res.status(200).json({ university });
};

const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await Universities.findOne({ _id: id });

  if (!university) {
    throw new CustomError.NotFoundError(`No university with id : ${id}`);
  }

  await university.remove();
  res.status(200).json({ msg: 'Success! University removed.' });
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getSingleUniversity,
  updateUniversity,
  deleteUniversity,
};
