const monsterCard = document.querySelector('#monster-container')
const monsterForm = document.querySelector('#monster-form')
const back = document.querySelector('#back')
const forward = document.querySelector('#forward')
let counter = 1

//READ
document.addEventListener('DOMContentLoaded', () =>{
    console.log("I should show monsters")
  monsterFetch()
})
//CREATE
monsterForm.addEventListener('click', function(evt){
    evt.preventDefault()

    let monsterName = document.querySelector("#name")
    let monsterAge = document.querySelector("#age")
    let monsterDescription = document.querySelector("#description")

    // console.log('i was clicked', evt.target.id)
    if (evt.target.id === 'monster-create'){
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "applcation/json"
            },
            body: JSON.stringify({
                name: monsterName.value,
                age: monsterAge.value,
                description: monsterDescription.value
            })
        })
        .then(res => res.json())
        .then(responseObject => {
            slapMonster(responseObject)
                monsterName.value = ""
                monsterAge.value = ""
                monsterDescription = ""
        })
    } 

})

//Forward
forward.addEventListener("click", (evt)=>{
    
    counter++
    monsterCard.innerHTML = ""
    monsterFetch()
})
//back
back.addEventListener("click", (evt)=>{
    
    if (counter === 1){

    }else {
    counter--
    monsterCard.innerHTML = ""
    monsterFetch()
    }
})

function slapMonster(monster){
    monsterCard.innerHTML += 
    `<div id="monster-card-${monster.id}"->
    <h2> ${monster.name}</h2>
    <p> ${monster.age}</p>
    <p> ${monster.description}</p>
    <button data-id=${monster.id}>delete button</button>
    </div>`
}

function monsterFetch(){
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
    .then(response => response.json())
    .then(monsterObjects => {
        console.log(monsterObjects)
        monsterObjects.forEach((monster) => {
            slapMonster(monster)
        })
    })
}

//delete fetch
monsterCard.addEventListener("click", function(evt) {
    evt.preventDefault
    console.log(evt.target, "was clicked!!!")
    let id = evt.target.dataset.id
    let monCard = document.querySelector(`#monster-card-${id}`)
    console.log(monCard)
    fetch(`http://localhost:3000/monsters/${id}`,{
        method: "DELETE"
    })
    .then(res => {
        monCard.remove()
    })

})