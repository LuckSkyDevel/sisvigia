import { Router } from "express";
import { comparePassword, generateToken } from "../utils/auth";
import userService from "../services/userService";
import { User } from "../model/user";

const apiRoutes = Router();

// Registro
apiRoutes.post("/register", async (req, res) => {
    // const { nome, email, password } = req.body;
    try {
        const user = await userService.createUser(req.body);
        const token = generateToken(user.id);
        res.json({ user, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Login
apiRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: "User not found" });

        const valid = await comparePassword(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        const token = generateToken(user.id);
        res.json({ user: { id: user.id, nome: user.nome, email: user.email }, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default apiRoutes;