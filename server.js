const express = require('express')

const db = require("./config/db");

const app = express()
const nunjucks = require("nunjucks")

app.set ("view engine", "njk")
app.use(express.urlencoded({ extended: true}))

nunjucks.configure ( {
    express: app, 
    autoescape: false,
    noCache: true
})

app.use(express.static('styles'))

// ROTAS 

// ROTA PARA CARREGAR A PAGINA INICIAL //
// app.get("/", (req,res)=> {
//     return res.render("index")
// })

// ROTA PARA ADICIONAR ITEM NO BANCO //
app.post("/", (req,res)=> {

    const query = 
    `INSERT INTO mjogadora (
        jogo,
        placar,
        mintemporada,
        maxtemporada,
        recordemin,
        recordemax
    ) VALUES ($1, $2, $3, $4, $5, $6)
    `
   
    const values = [
        req.body.jogo,
        req.body.placar,
        req.body.mintemporada,
        req.body.maxtemporada,
        req.body.recordemin,
        req.body.recordemax
    ]

    db.query(query, values, function (err, results) {

        if (err) throw `Database error! ${err}` 

        console.log(results.rows)
        
        return res.redirect ("/")

    })

})

// ROTA PARA MOSTRAR OS VALORES DO BANCO //

app.get("/", (req,res)=> {

    db.query(`
            SELECT *
            FROM mjogadora`, function(err,results) 
            {
                
            if(err) throw `Database error! ${err}` 

            const resultados = results.rows
            
             return res.render("index", {resultados})

            })

})


app.listen ("5000", () =>{
    console.log("Servidor rodando.")
})