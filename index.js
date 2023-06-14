
async function addtodo(event){
    event.preventDefault();
    const todo=event.target.todo.value;
    const Description=event.target.Description.value;
    let obj={
        todo,
        Description
    }
    try{
    const addtodo1= await axios.post("https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/todo",obj)
      console.log(addtodo1)
    }catch(err){
        console.log(err)
    }
}
//dom content loader
 window.addEventListener("DOMContentLoaded",async()=>{
    try{
    const addtodo2= await axios.get("https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/todo")
    
        for(var i=0;i<addtodo2.data.length;i++){
            console.log(addtodo2.data[i])
            showDataOnScreenReminder(addtodo2.data[i])
        }

    const addtodo3= await axios.get("https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/done")
    
        for(var i=0;i<addtodo3.data.length;i++){
            console.log(addtodo3.data[i])
            showDataOnScreenDone(addtodo3.data[i])
        }
    }catch(err){
        console.log(err)
    }
    
})
//show data on reminder
function showDataOnScreenReminder(data){
    document.getElementById('todo').value='';
    document.getElementById('Description').value='';

    const parentNode=document.getElementById('todo-list');
    const childNode=`<li id=${data._id}> ${data.todo}- ${data.Description} 
                        <button onclick="deleteTodoReminder('${data._id}')" class="btn btn-success btn-sm">Done</button>
                        <button onclick="deleteTodo('${data._id}')" class="btn btn-danger btn-sm">Delete</button>
                         </li>`
    parentNode.innerHTML=parentNode.innerHTML+childNode;
}
//show data on done
function showDataOnScreenDone(data){

    const parentNode=document.getElementById('todo-done');
    const childNode=`<li id=${data._id}> ${data.todo}- ${data.Description} 
                        
                         </li>`
    parentNode.innerHTML=parentNode.innerHTML+childNode;
}

async function deleteTodo(dlt){
    try{
   const dlttodo1= await axios.delete(`https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/todo/${dlt}`)
    
        console.log(dlttodo1);
    }catch(err){
        console.log(err)
    }
    deleteFromScreen(dlt)
}

//delete from screen
function deleteFromScreen(dlt){
    const parentNode=document.getElementById('todo-list');
    const childNode=document.getElementById(dlt);

    parentNode.removeChild(childNode);
}


//delete from reminder and add in done area

async function deleteTodoReminder(dlt){
    try{
     const dlttodo2= await axios.get(`https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/todo/${dlt}`)
    
        console.log(dlttodo2.data)
        addDone(dlttodo2.data)

     const dlttodo3= await axios.delete(`https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/todo/${dlt}`)
   
        console.log(dlttodo3.data)
    }catch(err){
        console.log(err);
    }
    deleteFromScreen(dlt)
}
    
 
//post method for doneTodo
async function addDone(data){
    
    const todo=data.todo;
    const Description=data.Description;
    let obj={
        todo,
        Description
    }
    try{ 
   const addtodo4= await axios.post("https://crudcrud.com/api/13e7537ae7b645f5a2dbea373e71830e/done",obj)
   
    console.log(addtodo4)
   }catch(err){
    console.log(err)
   }

}


