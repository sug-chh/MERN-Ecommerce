import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
