module.exports = (express, controller) => {
  const router = express.Router();

  router.post("/create", controller.create);

  return router;
};
