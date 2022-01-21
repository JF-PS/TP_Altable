module.exports = (express, controller) => {
  const router = express.Router();

  router.post("/", controller.create);
  router.put("/:id", controller.updateQuantity);
  router.get("/", controller.getAll);
  router.get("/menu", controller.getAllPositiveQuantity);  return router;
};
