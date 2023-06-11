function addtodo(event){
    event.preventDefault();
    const todo=event.target.todo.value;
    const Description=event.target.Description.value;
    let obj={
        todo,
        Description
    }
    axios.post("https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/todo",obj)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })

}
//dom content loader
window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/todo")
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            console.log(response.data[i])
            showDataOnScreenReminder(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    axios.get("https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/done")
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            console.log(response.data[i])
            showDataOnScreenDone(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })

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

function deleteTodo(dlt){
    axios.delete(`https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/todo/${dlt}`)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    deleteFromScreen(dlt)
}

//delete from screen
function deleteFromScreen(dlt){
    const parentNode=document.getElementById('todo-list');
    const childNode=document.getElementById(dlt);

    parentNode.removeChild(childNode);
}


//delete from reminder and add in done area

function deleteTodoReminder(dlt){
    axios.get(`https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/todo/${dlt}`)
    .then((response)=>{
        console.log(response.data)
        addDone(response.data)
    })
    

    axios.delete(`https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/todo/${dlt}`)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    deleteFromScreen(dlt)
}   
//post method for doneTodo
function addDone(data){
    
    const todo=data.todo;
    const Description=data.Description;
    let obj={
        todo,
        Description
    }
    
    axios.post("https://crudcrud.com/api/02881edc3e974eec9153e940621dd6be/done",obj)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })

}


