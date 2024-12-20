

// connect html and js(Dom)

const input = document.getElementById('input');
const button = document.getElementById('add-btn');
const todoLists = document.getElementById('taskList');
const form = document.getElementById ('form');
const error = document.getElementById('err-msg');
const modal = document.getElementById('myModal');


const url = "https://js1-todo-api.vercel.app/api/todos?apikey=7d081baa-b147-4457-b2fa-65f2043248d3"
// GET Method

const getData = async () => {

 try{
   
   const response = await fetch(url);
   const todos = await response.json();

//Clear the current list to avoid duplicates

todoLists.innerHTML = '';

   
// Create a new list item when user clicks on the "Add" button 

todos.forEach(todo => {
      let  lists = document.createElement('li')
      lists.textContent = `${todo.title}`;
      lists.setAttribute('data-id', todo._id); // Add data-id attribute(Get it from freecodecamp)
      todoLists.appendChild(lists);  

    // Adding span (Close) for each list items
      let span = document.createElement('span');
      span.innerHTML = "\u00d7"; // code for cross icon
      span.classList.add('delete-btn');
      lists.appendChild(span); 

})
    
       input.value = ''; 
       todoLists.style.display = 'block';
       
       // Hide the error message 
       error.style.display = 'none';
       console.log(todos)
  
   
 }
   catch (error) {
      console.log("Error: ", error);
   }
  
};
getData() 

// POST METHOD
// adding eventlistner to submit our input and from disapering the input when the page is loaded

 form.addEventListener('submit', function(e) {
   e.preventDefault();

// Validate the input to avoid addinig empty value and space

  let tasks = input.value.trim();

   if (tasks.length == 0) {
      error.style.display = 'block';
      error.textContent = 'You have to enter a task';
      return

   }
   const post = {

      title: tasks, 
   }
   input.value = ''

const addPost = async () => {

   try{
      const res = await fetch("https://js1-todo-api.vercel.app/api/todos?apikey=7d081baa-b147-4457-b2fa-65f2043248d3", {
         
         method: 'POST',
         
         headers: {
            
            'content-type': 'application/json; charset=UTF-8'

         },
         body: JSON.stringify (post)

   }); 
   const data = await res.json();
   getData(); // Refresh the list to include the task

   console.log(res)
   console.log(tasks)
   //return data ;   
   }
   catch(error) {
      console.log(error);
   } 
};

addPost();
});

// PUT Method

 todoLists.addEventListener('click', (e) => {
   if (e.target.tagName === 'LI' )  {
    let completed = e.target.classList.toggle("checked")
    let id = e.target.dataset.id;
   }

// Sending put request

const updatePost = async () => {


 try{

    const res = await fetch("https://js1-todo-api.vercel.app/api/todos${id}?apikey=7d081baa-b147-4457-b2fa-65f2043248d3", {

        method: 'PUT',

        headers: { 
          
          'content-type': 'application/json; charset=UTF-8'

        },

        body: JSON.stringify ({

          "completed": true,

        }),
       })
  const data = await res.json();
    
    if (res.ok) {
       console.log('sucessesful')
    };
    getData()

 }catch (error) {
    console.error('error');
    
  }
}
});

// Delete Method
// Remove the existing list

todoLists.addEventListener('click', async (e) => {
   e.preventDefault();

   if (e.target.classList.contains('delete-btn')){
   
      let listItem = e.target.parentElement; // Get the list items
      let id = listItem.dataset.id; // Get data-id ( Get it from freecode camp)
  // To remove only the checked list item 
      if (listItem.classList.contains('checked')) {
         listItem.remove()
          modal.style.display = "none"

      }
      else {
         modal.style.display = "block" // display the modal
         setTimeout(() => {
            modal.style.display = "none";
         }, 2000);
         return;
      }
   
        if(!id){
         console.error('Task Id not found.')
      }

      try{
         const res = await fetch("https://js1-todo-api.vercel.app/api/todos${id}?apikey=7d081baa-b147-4457-b2fa-65f2043248d3", {

            method: 'DELETE',

      });
      
        if(res.ok){
          console.log('Task is deleted.')
         }
           

        else {
         console.log('Failed to delete task!');
        
       }
     } catch (error) {
       console.error('error');
       
     }
   }
  
  
 });
