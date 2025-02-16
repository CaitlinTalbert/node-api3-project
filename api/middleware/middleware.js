const User = require("../users/users-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
}

async function validateUser(req, res, next) {
  const { name } = req.body;
  try {
    if (!name || !name.trim()) {
      res.status(400).json({
        message: "missing required name field",
      });
    } else {
      req.name = name.trim();
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem",
    });
  }
}

async function validatePost(req, res, next) {
  const { text } = req.body;
  try {
    if (!text || !text.trim()) {
      res.status(400).json({
        message: "missing required text field",
      });
    } else {
      req.text = text.trim();
      next();
    }
  } catch (err) {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
