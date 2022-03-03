const router = require("express").Router();
const authRoutes = require("./auth.routes");
const refugeeRoutes = require("./refugee.routes");
const shelterRoutes = require("./shelter.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/refugee", refugeeRoutes);
router.use("/shelter", shelterRoutes);

module.exports = router;
