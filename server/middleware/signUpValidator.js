import Joi from 'joi';
import { select } from '../helpers/sqlQuery';

export default async (req, res, next) => {
  const rows = await select('email', 'users', `email='${req.body.email}'`);
  if (rows[0]) {
    return res.status(422).json({
      status: 422,
      error: 'Email already exists',
      path: 'email',
    });
  }
  const schema = {
    firstName: Joi.string().min(3).required().error(() => ({
      message: 'First name is required.',
    })),
    lastName: Joi.string().min(3).required().error(() => ({
      message: 'Last name is required.',
    })),
    email: Joi.string().email().required().error(() => ({
      message: 'Email is required and must be valid.',
    })),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required().error(() => ({
      message: 'Password is required and must 8 characters long.',
    })),
    passwordConfirm: Joi.any().valid(Joi.ref('password')).required().error(() => ({
      message: `Password don't match.`,
    })),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
      path: result.error.details[0].path[0],
    });
  }
  next();
};
