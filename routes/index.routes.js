const router = require("express").Router();
const authRoutes = require("./auth.routes");
const refugeeRoutes = require("./refugee.routes");
const shelterRoutes = require("./shelter.routes");

const { isAuthenticated } = require("../middleware/jwt.middleware"); 
/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/shelter", shelterRoutes);
router.use("/refugee",isAuthenticated, refugeeRoutes);
module.exports = router;
