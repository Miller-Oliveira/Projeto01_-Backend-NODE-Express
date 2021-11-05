const express = require("express");
const router = express.Router();

let listaFornecedor = [];

//Inicio da API com o get para dar boas vindas
router.get("/",(req,res) =>{
    res.status(200).json({message: "Cadastro de fornecedor: insira razão social e CNPJ"});
} );

//Get listar apra mostrar a lista fornecedors completa que está sendo incrementada no Post.

router.get("/listar",(req,res) =>{
    res.status(200).json(listaFornecedor);    
} );

// listar com razaosocial
router.get("/listar/:razaosocial",(req,res) =>{
    const razaosocial = req.params.razaosocial;
    const fornecedor = listaFornecedor.find((item) => item.razaosocial === razaosocial);
    res.status(200).json(fornecedor);
} );

router.get("/listarindex/:razaosocial",(req,res) =>{
    const razaosocial = req.params.razaosocial;
    const index = listaFornecedor.findIndex((item) => item.razaosocial === razaosocial);
    if(index == -1){
        res.status(204);
        return;
    }
    res.status(200).json({index:index});
} );

//Listar com cnpj

router.get("/listar/:cnpj",(req,res) =>{
    const cnpj = req.params.cnpj;
    const fornecedor = listaFornecedor.find((item) => item.cnpj === cnpj);
    res.status(200).json(fornecedor);
} );

//Post cadastrando a informação e salvando na lista fornecedors
router.post("/", (req,res)=>{
    const fornecedor = req.body;

    if(!fornecedor.razaosocial){
        res.status(400).json({message:"razaosocial na requisição esta vazio"});
        return;
    };
    
    if(!fornecedor.cnpj){
        res.status(400).json({message:"cnpj na requisição está vazio"});
        return;
    };
    
       listaFornecedor.push(fornecedor);
       res.status(201).json({message:"Fornecedor cadastrado com sucesso"});
});

//Update passando a alteração realizada e mostrando no console o antes
router.put("/:id", (req,res) => { 
    const fornecedor = listaFornecedor[req.params.id];

    console.log(fornecedor);

    listaFornecedor[req.params.id] = req.body;

    res.status(200).json(listaFornecedor[req.params.id]);
});

router.delete("/:id", (req,res) => {
    delete listaFornecedor[req.params.id];
    console.log(listaFornecedor[req.params.id]);
    res.status(200).json(listaFornecedor[req.params.id]);

});

module.exports = router;