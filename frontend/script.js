 // create function to save data in database MonGodb
 // create function to pop up in html page
 



const btn = document.querySelector('.add-item')
const inputBox = document.querySelector('.input-box')
const ulList = document.querySelector('.ul-list')

btn.addEventListener('click',saveToDataBase)


async function saveToDataBase(){
  const url = 'http://localhost:8080/api/todoitems'
 const requestOptions = {
   method: 'POST',
   body : JSON.stringify({
   title : inputBox.value,
   }),
   headers :{
   "Content-Type": "application/json"
   }
 }

 try{
const response = await fetch(url, requestOptions)
if(response.ok){
  const responseJson = await response.json()
  if(inputBox.value.trim()){
    writeInDom(responseJson)
  }else{
    alert('enter a value')
  }
  
  //console.log(responseJson)
}else{
  throw new Error('response from post fetch failed')
}
 }catch(err){
  console.log(err)
}
}



function writeInDom(jsonObj){
  
 let listItem = document.createElement('li')
 listItem.className= 'todo-item'
 listItem.id=jsonObj.id
  listItem.innerHTML=`
 
  <input class='check-box' type='checkbox'>
  <span class="todo-element">${jsonObj.title}</span>
  <i class=" edit far fa-edit"></i>
  <i class="remove far fa-trash-alt"></i>
  `
   ulList.prepend(listItem)
   
   inputBox.value="";

listItem.querySelector('.check-box').addEventListener('click',completeItem)
  listItem.querySelector('.remove').addEventListener('click',deleteItem)
  if(jsonObj.completed ===true){
    
    listItem.querySelector('.check-box').checked = true;
  }
 }

async function deleteItem(e){


const requestOptions ={
  method : 'DELETE',
  headers :{
    "Content-Type": "application/json"
  }
}
const url = `http://localhost:8080/api/todoitems/${e.target.parentElement.id}`
try{
const response = await fetch(url,requestOptions)
if(response.ok){
  e.target.parentElement.remove()
  const responseJon= await response.json()
const text =responseJon.message='Item deleted'
alert(text)
}
}catch(err){
  console.log(err)
}
}



const getData = async ()=>{
  const url= 'http://localhost:8080/api/todoitems'
try{
const response = await fetch(url)
if(response.ok){
  const responseJson = await response.json()

for(i in responseJson){
  writeInDom(responseJson[i])
}
}else{
  throw new Error('response to get fetch failed')
}
}catch(err){
  console.log(err)
}
}
getData()


async function completeItem(e){
  const requestOptions = {
    method :'PUT',
    body :JSON.stringify({
      completed :true
    }),
    headers:{
      "Content-Type": "application/json"
    }
  }
  const url= `http://localhost:8080/api/todoitems/${e.target.parentElement.id}`
  try{
const response = await fetch(url,requestOptions)
if(response.ok){
  const responseJson = await response.json()
  
  console.log(responseJson)
}
  }catch(err){
    console.log(err)
  }
}