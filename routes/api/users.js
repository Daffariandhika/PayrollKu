const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const mailer = require('@sendgrid/mail');
mailer.setApiKey(keys.sendGridKey);

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateResetInput = require('../../validation/reset');
const validateNewInput = require('../../validation/newpassword');
const validateRoleInput = require('../../validation/role');

//Load user model
const User = require('../../models/User');

//@route  Get api/users/register
//@desc Register user route
//@access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        errors.email = 'Email sudah terpakai';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route  Post api/users/login
//@desc Login user route
//@access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User tidak ditemukan';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          //User match
          const payload = {
            id: user.id,
            name: user.name,
            is_admin: user.is_admin,
          }; //Create JWT Payload

          //Sign token
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 7200 },
            (e, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            }
          );
        } else {
          errors.password = 'Password Salah';
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => console.log(err));
});

//@route  Get api/users/current
//@desc Returns current user route
//@access Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//@route  Get api/users/all
//@desc Get all users
//@access Private

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({ is_delete: 0 })
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

//@route  Post api/users/assignrole
//@desc asign user role
//@access Private

router.post(
  '/assignrole',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoleInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userFields = {};

    if (req.body.user) userFields.user = req.body.user;
    if (req.body.role) userFields.is_admin = req.body.role;

    User.findOne({ _id: req.body.user })
      .where('is_delete')
      .equals(0)
      .then((user) => {
        if (user) {
          let role = parseInt(req.body.role);
          let currentUser = req.body.currentUser;
          let userId = JSON.stringify(user._id).replace(
            /^"(.*)"$/,
            '$1'
          );
          let loggedPrivilege = req.body.loggedPrivilege;

          if (userId === currentUser) {
            errors.role = 'Tidak bisa memberi role saat sedang logged-in';
            return res.status(400).json(errors);
          }

          if (loggedPrivilege === 0) {
            errors.role = 'Anda tidak punya kewenangan';
            return res.status(400).json(errors);
          }

          if (user.is_admin === role) {
            errors.role = 'Role ini telah ada pada user ini';
            return res.status(400).json(errors);
          }

          User.findOneAndUpdate(
            { _id: req.body.user },
            { $set: userFields },
            { new: true }
          )
            .then((user) => res.status(200).json({ success: true }))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route  Post api/users/forgotpassword
//@desc Send resetpassword token
//@access Public

router.post('/forgotpassword', (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.email = 'User tidak ditemukan';
        return res.status(404).json(errors);
      }

      let token = token1();

      const resetUser = {
        email: req.body.email,
        name: user.name,
        token: token,
        password: user.password,
        expiry: Date.now() + 86400000,
      };

      User.findOneAndUpdate(
        { name: user.name },
        { $set: resetUser },
        { new: true }
      )
        .then((user) => {
          const resetMessage = {
            to: `${user.email}`,
            from: 'muhammaddaffariandhika@gmail.com',
            subject: 'Permintaan Reset Password',
            html: `<html>
  <head>
    <title>Permintaan Reset Password</title>
    <meta charset="UTF-8" />
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); overflow: hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: #4a90e2; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0;">🔒 Permintaan Reset Password</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Halo <strong>${user.name}</strong>,</p>
                <p style="font-size: 15px; line-height: 1.6;">
                  Kami telah menerima permintaan untuk mereset password akun Anda di <strong>PayrollKu</strong>. Jika Anda benar-benar mengajukan permintaan ini, silakan klik tombol di bawah untuk mengatur ulang password Anda:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000/resetpassword/${user.token}" style="background-color: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    Reset Password
                  </a>
                </div>
                <p style="font-size: 14px; color: #666;">
                  Jika Anda tidak merasa melakukan permintaan ini, Anda dapat mengabaikan email ini. Tautan reset ini akan kedaluwarsa dalam waktu 24 jam demi keamanan akun Anda.
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
                <p style="font-size: 12px; color: #999;">
                  Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:
                  <br />
                  <a href="http://localhost:3000/resetpassword/${user.token}" style="color: #4a90e2;">http://localhost:3000/resetpassword/${user.token}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; text-align: center; padding: 20px; font-size: 12px; color: #999;">
                &copy; 2025 PayrollKu. Seluruh hak cipta dilindungi undang-undang.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
          };

          mailer
            .send(resetMessage)
            .then(() => {
              return res
                .status(200)
                .json({
                  success: 'Password link berhasil dikirim!',
                });
            })
            .catch(() => {
              errors.email = 'Error mengirim password link';
              return res.status(400).json(errors);
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//@route  Post api/users/forgotpassword
//@desc Reset user password
//@access Public

router.post('/resetpassword/:token', (req, res) => {
  const { errors, isValid } = validateNewInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ token: req.params.token })
    .then((user) => {
      if (!user.token) {
        errors.noToken = 'Token untuk reset password tidak ditemukan atau tidak Valid!';
        return res.status(404).json(errors);
      } else if (user.expiry < Date.now()) {
        errors.email = 'Token Untuk Reset Password Expired!';
        return res.status(422).json(errors);
      }
      if (req.params.token === user.token) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            User.findOneAndUpdate(
              { email: user.email },
              { password: req.body.password },
              { name: user.name }
            )
              .then((user) => {
                res
                  .status(200)
                  .json({
                    user,
                    success: 'Password berhasil di ubah!',
                  });
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        errors.email = 'Token untuk reset password tidak sesuai';
        return res.status(400).json(errors);
      }
    })
    .catch((err) => {
      errors.noToken = 'Token untuk reset password tidak ditemukan atau tidak Valid!';
      return res.status(404).json(errors);
    });
});

const token1 = () => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 20; i++) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return text;
};

module.exports = router;
