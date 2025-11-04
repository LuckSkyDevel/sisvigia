import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authenticate } from '../utils/auth';


var userRoutes = express.Router();

userRoutes.get("/", authenticate, getAllUsers);
userRoutes.get("/:id", authenticate, getUserById);
userRoutes.put("/:id", authenticate, updateUser);
userRoutes.delete("/:id", authenticate, deleteUser);

export default userRoutes;