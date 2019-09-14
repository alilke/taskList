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
    const status =$('#status').val();
    //TURNS  TASK INTO AN OBJECT
    const objectToSend ={
        task: task,
        dueDate: dueDate,
        category: category,
        notes: notes,
        status: status
    }
    //POST TASK TO THE SERVER
    $.ajax({
        method: 'POST',
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
        method: 'GET',
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

function appendTasks(tasks){
    //EMPTY OLD DATA
    $('#taskDisplay').empty();
    for(let task of  tasks){
        console.log(task);
        let tableRow = $(`
        <tr>
            <td>${task.task}</td>
            <td>${task.dueDate}</td>
            <td>${task.category}</td>
            <td>${task.notes}</td>
            <td>${task.status}</td>
            <td><button data-id="${task.id}" class="deleteThis">Delete</button></td> 
        </tr>`)
        //ATTACH DATA TO ROW, NEED FOR  DELETE
        tableRow.data('id',task.id);
        //APPEND ROW TO TABLE
        $('#taskDisplay').append(tableRow);        
    }
    $(`.deleteThis`).on('click', deleteBtn);
}

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