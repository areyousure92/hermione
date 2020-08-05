import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Введите имя пользователя'
  },
  created: {
    type: Date,
    default: Date.now
  },
  hashed_password: {
    type: String,
    required: 'Введите пароль'
  },
  salt: String
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      //console.log(err);
      return '';
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
}

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Пароль должен быть не меньше 6 символов длиной.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Нужно ввести пароль');
  }
}, null);

export default mongoose.model('User', UserSchema);
