import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ "username": req.body.username });
    if (!user) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Имя пользователя и пароль не совпадают." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    return res.status(401).json({ error: "Не удалось войти в систему" });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: "Выход из аккаунта"
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  
  if (!(authorized)) {
    return res.status(403).json({
      error: 'Пользователь не авторизован'
    });
  }

  next();
};

export default { signin, signout, requireSignin, hasAuthorization };