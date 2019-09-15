console.log( 'js' );
$(document).ready(handleReady);

function handleReady(){
    setDate();
    $('#submit').on('click', addTask);
    getTasks();
}

function setDate(){
    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#dueDate').val(today);
};

function addTask(){
    //GRABS TASK FROM INPUT FIELDS
    const task =$('#task').val();
    const dueDate =$('#dueDate').val();
    const category =$('#category').val();
    const notes =$('#notes').val();
    const progress =$('#progress').val();
    //TURNS  TASK INTO AN OBJECT
    const objectToSend ={
        task: task,
        dueDate: dueDate,
        category: category,
        notes: notes,
        progress: progress
    }
    //POST TASK TO THE SERVER
    $.ajax({
        type: 'POST',
        url:'/tasks',
        data: objectToSend
    }).then(function(response){
    //BRINGS BACK INFO FROM SERVER &
    //DISPLAYS NEW TASK ON DOM
        getTasks();
    }).catch(function(err){
        console.log(err);
        alert('something wrong in the POST');       
    })
}

function getTasks(){
    //GET ANY TASKS ON THE SERVER 
    $.ajax({
        type: 'GET',
        url:'/tasks'
    }).then(function(response){
        console.log('in getTasks response', response);
        // APPEND TASKS TP THE DOM
        appendTasks(response);
    }).catch(function(err){
        console.log('in getTasks - error', err);
        alert('something went wrong in GET')     
    })
}

// function appendTasks(tasks){
//     //EMPTY OLD DATA
//     $('#taskDisplay').empty();
//     for(let task of tasks){
//         console.log(task);
//         let tableRow = $(`
//         <tr>
//             <td>${task.task}</td>
//             <td>${task.dueDate}</td>
//             <td>${task.category}</td>
//             <td>${task.notes}</td>
//             <td>${task.progress}</td>
//             <td><button data-id="${task.id}" class="deleteThis"><i class="fa fa-close"></i></button></td> 
//         </tr>`)
//         //ATTACH DATA TO ROW, NEED FOR  DELETE
//         tableRow.data('id',task.id);
//         //APPEND ROW TO TABLE
//         $('#taskDisplay').append(tableRow);        
//     }
//     $(`.deleteThis`).on('click', deleteBtn);
// }

function appendTasks(task){
    //EMPTY OLD DATA
    $('#taskDisplay').empty();
    for(let i=0; i<task.length; i++){
        console.log(task[i]);
        let progress = ``;
        if(task[i].progress === false){
          progress = `<button id="transferBtn">Mark Complete</button>`
        }
        let tableRow = $(`
       <tr>
        <td>${task[i].task}</td>
        <td>${task[i].dueDate}</td>
        <td>${task[i].category}</td>
        <td>${task[i].notes}</td>
        <td>${progress}</td>
        <td><button data-id="${task[i].id}" class="deleteThis"><i class="fa fa-close"></i></button></td> 
        </tr><br>`)
              //ATTACH DATA TO ROW, NEED FOR  DELETE
        tableRow.data('id',task[i].id);
        console.log('id',task[i].id);
        
        //APPEND ROW TO TABLE
        $('#taskDisplay').append(tableRow);        
    }
    $(`.deleteThis`).on('click', deleteBtn);
}

        // $('#taskDisplay').append(`<tr data-id="${task[i].id}">

// }
//     for(let task of tasks){
//         console.log(task);
//         let tableRow = $(`
//         <tr>
//             <td>${task.task}</td>
//             <td>${task.dueDate}</td>
//             <td>${task.category}</td>
//             <td>${task.notes}</td>
//             <td>${task.progress}</td>
//             <td><button data-id="${task.id}" class="deleteThis"><i class="fa fa-close"></i></button></td> 
//         </tr>`)
//         //ATTACH DATA TO ROW, NEED FOR  DELETE
//         tableRow.data('id',task.id);
//         //APPEND ROW TO TABLE
//         $('#taskDisplay').append(tableRow);        
//     }
//     $(`.deleteThis`).on('click', deleteBtn);
// }









function deleteBtn(){
    let el  =$(this).data('id');
    console.log('delete', el);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${el}`
    }).then(function(response){
        console.log(response);
        getTasks();
    }).catch(function(err){
        alert('error on delete', err);
    })   
}