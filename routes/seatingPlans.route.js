module.exports = (express, controller) => {
  const router = express.Router();

  router.post("/", controller.create);
  router.get("/:id", controller.getById);

  return router;
};
