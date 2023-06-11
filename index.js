function addtodo(event){
    event.preventDefault();
    const todo=event.target.todo.value;
    const Description=event.target.Description.value;
    let obj={
        todo,
        Description
    }
    axios.post("https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/todo",obj)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })

}

window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/todo")
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            console.log(response.data[i])
            showDataOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    axios.get("https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/done")
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            console.log(response.data[i])
            showDataOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })

})

function showDataOnScreen(data){
    document.getElementById('todo').value='';
    document.getElementById('Description').value='';

    const parentNode=document.getElementById('todo-list');
    const childNode=`<li id=${data._id}> ${data.todo}- ${data.Description} 
                        <button onclick="deleteTodoReminder('${data._id}')" class="btn btn-success btn-sm">Done</button>
                        <button onclick="deleteTodo('${data._id}')" class="btn btn-danger btn-sm">Delete</button>
                         </li>`
    parentNode.innerHTML=parentNode.innerHTML+childNode;
}

function deleteTodo(dlt){
    console.log(dlt)
    axios.delete(`https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/todo/${dlt}`)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    deleteFromScreen(dlt)
}

function deleteFromScreen(dlt){
    const parentNode=document.getElementById('todo-list');
    const childNode=document.getElementById(dlt);

    parentNode.removeChild(childNode);
}


//new

function deleteTodoReminder(dlt){
    axios.get(`https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/todo/${dlt}`)
    .then((response)=>{
        console.log(response.data)
        addDone(response.data)
    })
    

    axios.delete(`https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/todo/${dlt}`)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    deleteFromScreen(dlt)
}   

// function deleteFromReminderScreen(dlt){
    
//     const parentNode=document.getElementById('todo-list');
//     const childNode=document.getElementById(dlt);

//     parentNode.removeChild(childNode);
// }
function addDone(data){
    
    const todo=data.todo;
    const Description=data.Description;
    let obj={
        todo,
        Description
    }
    
    axios.post("https://crudcrud.com/api/6b248e09cde44e80a9dc99ffde837b63/done",obj)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })

}


