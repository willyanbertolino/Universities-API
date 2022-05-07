const Universities = require('../models/universities');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

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
    throw new CustomError.BadRequestError('Please provide all informations.');

  const repeatedUniversity = await Universities.findOne({
    country,
    name,
    alpha_two_code,
  });

  if (repeatedUniversity) {
    throw new CustomError.BadRequestError('University already exists');
  }

  const university = await Universities.create({
    alpha_two_code,
    domains,
    country,
    state_province,
    web_pages,
    name,
  });
  res.status(StatusCodes.CREATED).json({ university });
};

const getAllUniversities = async (req, res) => {
  let page = Number(req.query.page);
  if (!page || page < 0) {
    page = 0;
  }

  const universities = await Universities.find()
    .skip((page - 1) * 20)
    .limit(20);

  res.status(StatusCodes.OK).json({ universities, count: universities.length });
};

const getSingleUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await Universities.findOne({ _id: id });

  if (!university) {
    throw new CustomError.BadRequestError(
      `Sorry, there is no university with id : ${id}`
    );
  }

  res.status(StatusCodes.OK).json({ university });
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
    throw new CustomError.BadRequestError(`No university with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ university });
};

const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  const university = await Universities.findOne({ _id: id });

  if (!university) {
    throw new CustomError.BadRequestError(`No university with id : ${id}`);
  }

  await university.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! University removed.' });
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getSingleUniversity,
  updateUniversity,
  deleteUniversity,
};
