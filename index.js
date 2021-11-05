const express = require("express");

const router = require("./pessoas");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({message:"Bem vindos ao primeiro projeto do modulo 3"})
})
const pessoasRouter = require("./pessoas");
app.use("/pessoas",pessoasRouter);

const clientesRouter = require("./clientes");
app.use("/clientes",clientesRouter);

const fornecedorRouter = require("./fornecedor");
app.use("/fornecedor",fornecedorRouter);

app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`)
});
