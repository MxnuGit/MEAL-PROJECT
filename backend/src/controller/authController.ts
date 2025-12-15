import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth.js"
import { connection } from "../utils/db.js"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    const user = getUser(req, res)
    if(user) {
        res.status(401).send("Questa operazione richiede il logout")
        return
    }
    
    const { username, password } = req.body

    connection.execute(
    "SELECT username FROM users WHERE username=?",
    [username],
    function (err, results: any[]) {
      if (err) {
        res.status(500).send("Errore database.")
        return
      }
}
