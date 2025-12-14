import { Request, Response } from "express"
import { connection } from "../utils/db.js"

// export async function allRecipes(req: Request, res: Response){
//     connection.execute(
//         'SELECT * FROM ricetta',
//         [],
//         function(err, results, fields){
//             res.json(results)
//         }
//     )
// }