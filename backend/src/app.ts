import express, { Express } from "express"
import ricetteRouter from "./routes/ricetteRouter"

const app: Express = express()
const port: number = 3000

app.use(express.static('dist'))

app.use(express.static("public"))
app.use(express.static("dist"))

app.use(ricetteRouter)

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`In ascolto su http://localhost:${port}`)
})
