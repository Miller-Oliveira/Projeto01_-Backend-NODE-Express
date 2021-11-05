const express = require("express");
const router = express.Router();

let listaPessoas = [];

//Inicio da API com o get para dar boas vindas
router.get("/",(req,res) =>{
    res.status(200).json({message: "Bem vindos ao cadastro de pessoas, preenche com seu nome, altura,idade e peso"});
} );

//Get listar apra mostrar a lista pessoas completa que está sendo incrementada no Post.

router.get("/listar",(req,res) =>{
    res.status(200).json(listaPessoas);  
} );



router.get("/listarindex/:nome",(req,res) =>{
    const nome = req.params.nome;
    const index = listaPessoas.findIndex((item) => item.nome === nome);
    if(index == -1){
        res.status(204);
        return;
    }
    res.status(200).json({index:index});
} );

//Listar com altura
router.get("/listar/:altura",(req,res) =>{
    const altura = req.params.altura;
    const pessoa = listaPessoas.find((item) => item.altura === altura);
    res.status(200).json(pessoa);
} );
//Listar com peso
router.get("/listar/:peso",(req,res) =>{
    const peso = req.params.peso;
    const pessoa = listaPessoas.find((item) => item.peso === peso);
    res.status(200).json(pessoa);
} );
//Listar com idade
router.get("/listar/:idade",(req,res) =>{
    const idade = req.params.idade;
    const pessoa = listaPessoas.find((item) => item.idade === idade);
    res.status(200).json(pessoa);
} );

//Listar com parâmetro ID
router.get("/listar/:id",(req,res) =>{
    res.status(200).json(listaPessoas[req.params.id -1]);
} );

//Post cadastrando a informação e salvando na lista pessoas
router.post("/", (req,res)=>{
    const pessoa = req.body;
   
    if(!pessoa.nome){
        res.status(400).json({message:"nome na requisição esta vazio"});
        return;
    }
    
    if(!pessoa.altura){
        res.status(400).json({message:"altura na requisição está vazio"});
        return;
    }
    
    if(!pessoa.peso){
        res.status(400).json({message:"peso na requisição esta vazio"});
        return;
    }
    
    if(!pessoa.idade){
        res.status(400).json({message:"idade na requisição esta vazio"});
        return;
    }
    listaPessoas.push(pessoa);
    res.status(201).json({message:"Pessoa cadastrada com sucesso"});
});

//Update passando a alteração realizada e mostrando no console o antes
router.put("/:id", (req,res) => { 
    const pessoa = listaPessoas[req.params.id];    

    listaPessoas[req.params.id] = req.body;
    //listaPessoas.push(pessoa);
    //res.status(200).json(listaPessoas[req.params.id]);
    res.status(201).json({message:"Pessoa alterada com sucesso"});    
});

router.delete("/:id", (req,res) => {
    delete listaPessoas[req.params.id];
    console.log(listaPessoas[req.params.id]);
    res.status(200).json(listaPessoas[req.params.id]);
    
});

module.exports = router;