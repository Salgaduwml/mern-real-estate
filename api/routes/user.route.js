import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { getUserListings } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);

export default router;
