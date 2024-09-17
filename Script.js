
/**
 * test for jquery/javascript
 * alert("hello");
 * 
 * 
 * /** 

 */

// API URL
 const endpoinUrl="http://localhost:3000/tasks"

let tasks = []
let createdAt = new Date();
let lastId=0;
let lastCreatedItem=null;

//Get all todo from server
async function getTasks() {
 try {
   //Use fetch api for response
   const response = await fetch(endpoinUrl);
   // check the response status
   if (response.status!=200) {
     throw new Error(`Some Error, Status Code:${response.status}`);
   }
   // get the data from jsaon object
   const data = await response.json();
   // console.log(data);
   tasks = data.reverse();
   
  // render data on the screen
  renderTasks();
  
 } catch (error) {
    console.log(error);
 }
};


//add a new todo to the server
const addTodo = async (text) => {
  
 // console.log("addTodo taking in : " , text)
  //fetch data from the server using the fetch API
  const response = await fetch(endpoinUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: text, completed: false, createdAt }),
  });

  //convert the response to JSON
  const data = await response.json();
  // console.log({ data });

  // render the added object
  getTasks()
  //return the data
  return data;
};




//update to do


const updateTodo = async (text) => {
  //fetch data from the server using the fetch API
  const response = await fetch(endpoinUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  title:text, completed: false, createdAt }),
  });

  //convert the response to JSON
  const data = await response.json();
  // console.log({ data });

  //return the data
  return data;
};


//add event listener to the add todo button
$("#addTodo").on("click", async () => {
  
  //get the value of the input field
  const text = $("#newTask").val();
  // console.log(text);

  if (!text) {
    alert("Please enter a todo");
    return;
  }

  //add the todo to the server
  try {
    await addTodo( text);
   
  } catch (error) {
    console.log(error);
  } finally {
    //clear the input field regardless of the outcome
    $("#newTask").val("");
  } 
});

async function renderTasks() {

  //get the table element
  const showTable = document.getElementById("showTable")

  // set the table html
  showTable.innerHTML = "";
  for (const task of tasks) {
   // console.log(task)
    const row = document.createElement("tr")
    row.innerHTML =
      `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.completed}</td>
        <td>${task.createdAt}</td>
        <td><button id="btn-Delete" class="btn btn-danger">Delete</button>
       
    `
    // find delete button with query selector and add event listener to delete the row
    row.querySelector("#btn-Delete").addEventListener("click", async () => {
      const response = await fetch("http://localhost:3000/tasks/" + task.id, { method: "DELETE" });
            
      const data = await response.json();


      //update the state(short term memory)

      const indexTodelete = tasks.indexOf(task);
      tasks.splice(indexTodelete, 1);

      // re-render
   
      renderTasks();


    })
    showTable.appendChild(row)
   
  }

}



//call the fetch function

getTasks();



