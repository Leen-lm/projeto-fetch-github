import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { users } from "../js/objects/users.js"
import { screen } from "../js/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    console.log(e)
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)
    console.log(userResponse)
    if(userResponse.message === "Not Found"){
        screen.renderUserNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    console.log(repositoriesResponse)
    
    const eventsResponse = await getEvents(userName)
    

    users.setInfo(userResponse)
    users.setRepositories(repositoriesResponse)
    users.setEvents(eventsResponse)
    console.log(users)
    screen.renderUser(users)
}



