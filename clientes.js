const express = require("express");
const router = express.Router();

let listaClientes = [];

//Inicio da API com o get para dar boas vindas
router.get("/",(req,res) =>{
    res.status(200).json({message: "Bem vindos ao cadastro de clientes, cadastre nome e endereço"});
} );

//Get listar apra mostrar a lista clientes completa que está sendo incrementada no Post.

router.get("/listar",(req,res) =>{
    res.status(200).json(listaClientes);    
} );

// listar com nome
router.get("/listar/:nome",(req,res) =>{
    const nome = req.params.nome;
    const cliente = listaClientes.find((item) => item.nome === nome);
    res.status(200).json(cliente);
} );

router.get("/listarindex/:nome",(req,res) =>{
    const nome = req.params.nome;
    const index = listaClientes.findIndex((item) => item.nome === nome);
    if(index == -1){
        res.status(204);
        return;
    }
    res.status(200).json({index:index});
} );

//Listar com Endereço

router.get("/listar/:endereco",(req,res) =>{
    const endereco = req.params.endereco;
    const cliente = listaClientes.find((item) => item.endereco === endereco);
    res.status(200).json(cliente);
} );

//Post cadastrando a informação e salvando na lista clientes
router.post("/", (req,res)=>{
    const cliente = req.body;

    if(!cliente.nome){
        res.status(400).json({message:"nome na requisição esta vazio"});
        return;
    }
    
    if(!cliente.endereco){
        res.status(400).json({message:"Endereço na requisição está vazio"});
        return;
    }     
       listaClientes.push(cliente);
       res.status(201).json({message:"Cliente cadastrado com sucesso"});
});

//Update passando a alteração realizada e mostrando no console o antes
router.put("/:id", (req,res) => { 
    const cliente = listaClientes[req.params.id];

    console.log(cliente);

    listaClientes[req.params.id] = req.body;

    res.status(200).json(listaClientes[req.params.id]);
});

router.delete("/:id", (req,res) => {
    delete listaClientes[req.params.id];
    console.log(listaClientes[req.params.id]);
    res.status(200).json(listaClientes[req.params.id]);
    
});

module.exports = router;