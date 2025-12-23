const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  try {
    const { token } = req.cookies
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ msg: ['Error'] })
      }
      req.user = decoded
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

module.exports = { validateToken }
