const $displayIncompleteResult  = document.querySelector('.displayIncompleteResult')
const $displayCompleteResult  = document.querySelector('.displayCompleteResult')
const $inputList = document.querySelector('.inputList')
const $btnAddList = document.querySelector('.btnAddList')
const $btnSend = document.querySelector('.btnSend')
const $navCompletes = document.querySelector('.navCompletes')
const $navIncompletes = document.querySelector('.navIncompletes')
const $incompleteList = document.querySelector('.incompleteList')
const $completeList = document.querySelector('.completeList')
const $messageAlert = document.querySelector('.messageAlert')

$navCompletes.addEventListener('click', navComplete)
$navIncompletes.addEventListener('click', navIncomplete)
$btnAddList.addEventListener('click', showInput)
$btnSend.addEventListener('click', addList)

$btnSend.style.display='none'

const list = []

function showInput(){
  $inputList.style.animationName='show'
  $inputList.style.display='flex';
  $btnSend.style.display='flex'
  $btnAddList.style.display='none';
}

function hideInput(){
  $inputList.style.animationName='hide'
  $inputList.style.display='none';
  $btnSend.style.display='none'
  $btnAddList.style.display='flex';
  $inputList.value = ''
}

function addList(){

  if ($inputList.value == '') {
    setTimeout(() => {
      $messageAlert.style.display = 'none'
    }, 3000)
   $messageAlert.style.display = 'flex'
   $messageAlert.style.animationName = 'alert'

  } else {
    id = Object.keys(list).length + 1
    title = $inputList.value
    data = {id: id, title: title, status: false }
    list.push(data)
    displayIncomplete()
    hideInput()
  }
}

function displayIncomplete(){
  let incompleteItems = ''
  const statusFalse = list.filter((item) => item.status == false)
  statusFalse.forEach(element => {
    let btnCheck = `<i onClick="itemCheckList(${element.id})" class="fa-solid fa-circle-check btnChecked"></i>`
    let btnRemove = `<i onClick="itemDeleteList(${element.id})" class="fa-solid fa-circle-xmark btnRemove"></i>`
    incompleteItems += `<li>${element.title}${btnCheck}${btnRemove}</li>`

    $displayIncompleteResult.innerHTML = `
    <ul class="incompleteItem">
      ${incompleteItems}
    </ul>`
  })
}

function displayComplete(){
  let completeItems = ''
  const statusTrue = list.filter((item) => item.status == true)
  statusTrue.forEach(element => {
    //let btnCheck = `<i onClick="itemCheckList(${element.id})" class="fa-solid fa-circle-check btnChecked"></i>`
    let btnRemove = `<i onClick="itemDeleteList(${element.id})" class="fa-solid fa-circle-xmark btnRemove"></i>`
    completeItems += `<li>${element.title}${btnRemove}</li>`

    $displayCompleteResult.innerHTML = `
    <ul class="completeItem">
      ${completeItems}
    </ul>`
  })
}

function itemCheckList(id){
  itemCheck = list.find((element) => element.id == id)
  itemCheck.status = true
  valStatusTrue = list.every((status) => status.status == true)

  if(valStatusTrue == true){
    $displayIncompleteResult.innerHTML = ''
  }
  displayComplete()
  displayIncomplete()
}

function itemDeleteList(id){

  itemRemove = list.findIndex((element) => element.id == id)
  newList = list.splice(itemRemove, 1)
 
  displayComplete()
  displayIncomplete()

  if(list.length === 0){
    $displayIncompleteResult.innerHTML = ''
    $displayCompleteResult.innerHTML = ''
  }
}

function navComplete(){
  console.log('complete')
  $navCompletes.style.color = 'var(--tertiary-color)'
  $navIncompletes.style.color = 'var(--primary-color)'

  $completeList.style.display = 'flex'
  $incompleteList.style.display = 'none'

  $navIncompletes.style.borderRight = '0.2rem solid var(--quaternary-color)'
  $navIncompletes.style.borderBottom = '0.2rem solid var(--quaternary-color)'
  $navCompletes.style.border = 'none'
}
function navIncomplete(){
  $navCompletes.style.color = 'var(--primary-color)'
  $navIncompletes.style.color = 'var(--tertiary-color)'
 
  $completeList.style.display = 'none'
  $incompleteList.style.display = 'flex'

  $navCompletes.style.borderLeft = '0.2rem solid var(--quaternary-color)'
  $navCompletes.style.borderBottom = '0.2rem solid var(--quaternary-color)'
  $navIncompletes.style.border = 'none'
}
