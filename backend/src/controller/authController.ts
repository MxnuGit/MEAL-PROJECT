import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth"
import { connection } from "../utils/db"
import bcrypt from "bcrypt"


/* ===================== REGISTER ===================== */
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

      if (Array.isArray(results) && results.length > 0) {
        res.status(400).send("Username già in uso.")
        return
      }

      bcrypt.hash(password, 10).then(function (passwordHash) {
        // 3️⃣ Inserimento utente
        connection.execute(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, passwordHash],
          function (err) {
            if (err) {
              res.status(500).send("Errore database.")
              return
            }

            connection.execute(
              "SELECT username, role FROM users WHERE username=?",
              [username],
              function (err, results: any[]) {
                if (err || !Array.isArray(results) || results.length === 0) {
                  res.status(500).send("Errore creazione utente.")
                  return
                }

                const newUser = results[0] as User

                setUser(req, res, newUser)

                res.json({ message: "Registrazione effettuata con successo" })
            })
          }
        )
      })
    }
  )
}


/* ===================== LOGIN ===================== */
export const login = (req: Request, res: Response) => {
  // Blocca se già loggato
  const user = getUser(req, res)
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.")
    return
  }

  const { username, password } = req.body

  // 1️⃣ Query utente
  connection.execute(
    "SELECT username, password, role FROM users WHERE username=?",
    [username],
    function (err, results: any[]) {
      if (err) {
        res.status(500).send("Errore database.")
        return
      }

      if (!Array.isArray(results) || results.length === 0) {
        res.status(400).send("Credenziali errate.")
        return
      }

      const userData = results[0]

       bcrypt.compare(password, userData.password).then(function (correctPassword) {
        if (!correctPassword) {
          res.status(400).send("Credenziali errate.")
          return
        }

        // 3️⃣ Rimuove password prima del JWT
        delete userData.password

        // 4️⃣ JWT + cookie
        setUser(req, res, userData)

        res.json({ message: "Login effettuato con successo" })
      })
    }
  )
}


/* ===================== LOGOUT ===================== */

export const logout = (req: Request, res: Response) => {
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
  }

  unsetUser(req, res)
  res.json({ message: "Logout effettuato con successo" })
}


/* ===================== PROFILO ===================== */

export const getProfile = (req: Request, res: Response) => {
  const user = getUser(req, res)
  res.json(user)
}


//     const [users] = await connection.execute("SELECT username FROM users WHERE username=?", [username])

//     if(Array.isArray(users) && users.length > 0) {
//         res.status(400).send("Username già in uso")
//         return 
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     await connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", [
//         username,
//         passwordHash,
//     ])

//     const [results] = await connection.execute(
//         "SELECT username, role FROM users WHERE username=?",
//         [username]
//     )
//     const newUser = (results as User[])[0]

//     setUser(req, res, newUser)

//     res.json({ message: "Registrazione effetuata con successo" })
// }

// export const login = async (req: Request, res: Response) => {
//     const user = getUser(req, res)
//     if(user) {
//         res.status(401).send("Questa operazione richiede il logout")
//         return
//     }

//     const { username, password } = req.body

//     const [results] = await connection.execute(
//         "SELECT username, role, password FROM users WHERE username=?",
//         [username]
//     )

//     if(!Array.isArray(results) || results.length == 0){
//         res.status(400).send("Credenziali errate")
//         return
//     }

//     const userData = results[0] as any

//     const correctPassword = await bcrypt.compare(password, userData.password)

//     if(!correctPassword) {
//         res.status(400).send("Credenziali errate")
//         return
//     }

//     delete userData.password

//     setUser(req, res, userData)

//     res.json({ message: "Login effettuato con successo" })
// }

// export const logout = async (req: Request, res: Response) => {
//     const user = getUser(req, res)
//     if(!user) {
//         res.status(401).send("Questa operazione richiede il login")
//         return
//     }

//     unsetUser(req, res)
//     res.json({ message: "Logout effettuato con successo" })
// }

// export const getProfile = async (req: Request, res: Response) => {
//     const user = getUser(req, res)
//     res.json({})
// }
