const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
// DB CONNECTION

//POST
router.post('/',function(req, res){
    const  taskToAdd  =  req.body; // this is data we are sending
    console.log('in post route - task', taskToAdd);
    const queryText  = 'INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress") VALUES ($1, $2, $3, $4, $5);';
    pool.query(queryText, [taskToAdd.task,  taskToAdd.dueDate, taskToAdd.category, taskToAdd.notes, taskToAdd.progress ]).then(()=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log('error in POST', err);       
    });
});  // END POST ROUTE

//GET
router.get('/', function (req, res) {
console.log('In GET route');
const query = 'SELECT * FROM "toDo";';
pool.query(query).then((results) => {
    console.log(results); // This is an object
    res.send(results.rows); // result.rows is an Array of tasks
}).catch((err) => {
    console.log('Error making GET', err);
    res.sendStatus(500);
});
}); // END GET ROUTE

//DELETE
router.delete('/:id', (req, res) => {
    console.log('params',req.params);
    let queryText =`DELETE FROM "toDo" WHERE "id" = '${req.params.id}';`;
    pool.query(queryText)
    .then((result)=>{
    res.send(result.rows)        
    })
    .catch((err) =>{
        console.log('error making queury', err);
        res.sendStatus(500);
    })   
})

//PUT
router.put('/progress/:id',  (req, res) => {
    console.log(req.params.id, 'this?',req.body);
    let id = req.params.id; 
    let queryText = `UPDATE "toDo" SET "progress" = 'Yes' WHERE "id" = $1;`;
    console.log(`Updating book ${id} with `, id);  
    pool.query(queryText, [id])
    .then(()=>{
      res.sendStatus(200);
      console.log('error making put requeat',error);
  })});





module.exports = router;