
/**
 * test for jquery/javascript
 * alert("hello");
 * 
 * 
 * /** 
 //fetch("https://6621c5cb27fcd16fa6c7e701.mockapi.io/tasks") //tasks api
  fetch(" https://66c61941134eb8f43496bf4b.mockapi.io")
 // fetch(" https://66c61941134eb8f43496bf4b.mockapi.io")
 fetch(" https://66c61941134eb8f43496bf4b.mockapi.io")
 fetch("https://64407795792fe886a88f6162.mockapi.io/api/todos")  //todo api
 */
 


function getTasks(){

   //create Base URL variable
   //const BASE_URL = "http://localhost:3000";
   const BASE_URL="https://66c61941134eb8f43496bf4b.mockapi.io"

   /**API Request Functions */
 
   //get all todos from DB
   const fetchTodos = async () => {
     //fetch data from the server using the fetch API
     const response = await fetch(`${BASE_URL}/tasks`);
 
     //convert the response to JSON
     const data = await response.json();
      console.log({ data });
 
     //return the data
     return data;
   };

 console.log(fetchTodos);
}

