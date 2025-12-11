import express, { Express } from "express"
import ricetteRouter from "./routes/recipesRouter"
import usersRouter from "./routes/userRouter"

const app: Express = express()
const port: number = 3000

app.use(ricetteRouter)
app.use("/api", usersRouter)

app.use(express.static('dist'))
app.use(express.static("public"))

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`In ascolto su http://localhost:${port}`)
})
