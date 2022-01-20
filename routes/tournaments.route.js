module.exports = (express, controller) => {
  const router = express.Router();

  router.post("/create", controller.create);

  router.get("/:id", controller.getById);

  return router;
};
