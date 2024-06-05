import { gitHubUrlDefault } from "../variable.js"

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = 
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 💤'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 💤'}</p>
                    <div class="follows">
                        <p class="following">
                        👥Seguindo: ${user.following}
                        </p>
                        <p class="followers">
                        👥Seguidores: ${user.followers}
                        </p>
                    </div>
                </div>
            </div>
        `

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=
             `<li>
                  <a href="${repo.html_url}" target="_blank">${repo.name}<br>
                    <ul class="repository-infos">
                        <li>🍴 ${repo.forks}</li>
                        <li>⭐ ${repo.stargazers_count}</li>
                        <li>👀 ${repo.watchers}</li>
                        <li>👨‍💻 ${repo.language ?? ''}</li>
                    </ul>
                  </a>
             </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories">
              <h2>Repositórios</h2>
              <ul>${repositoriesItens}</ul>
            </div>  
            `
        }
        
        const eventsItens = user.events
               
        let eventsList = ''

         eventsItens.forEach(event => {
            if(event.type === "PushEvent"){   
                eventsList += `<li><a href="${gitHubUrlDefault}/${event.repo.name}" target="_blank">${event.repo.name}</a> <span> - ${event.payload.commits[0].message}</span> </li>`
            } else {
                eventsList += `<li><a href="${gitHubUrlDefault}/${event.repo.name}" target="_blank">${event.repo.name}</a> <span> - Sem commits para mostrar </span> </li>`
            }
        }); 


        if(eventsItens.length > 0){
            this.userProfile.innerHTML += `
            <div class="events section">
              <h2>Últimos Eventos</h2>
              <ul>${eventsList}</ul>
            </div>  
            `
        }
    },
         
    renderUserNotFound(){
        this.userProfile.innerHTML = `<h3> Usuário não encontrado </h3>`
    }
}

export { screen }