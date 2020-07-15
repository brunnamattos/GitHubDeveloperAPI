// Links API Github
const GITHUB_API_URL = "https://api.github.com";
const REPOS_ENDPOINT = "/repos"
const USERS_ENDPOINT = "/users"

// Request lista de repositório
const getRepoList = () => {
    const login = getLogin();
    const url = userRepoURL(login);
    fetch(url)
        .then(data => data.json())
        .then(setContainer);
}

// Nova URL acessando o user do github
const userRepoURL = (user) => `${GITHUB_API_URL}${USERS_ENDPOINT}/${user}${REPOS_ENDPOINT}`;

// Login/user a partir do '<input>'
const getLogin = () => document.querySelector("#login").value;

// Criação do corpo da página; Tabela com as informações do usuário através da request
const setContainer = (data) => {
    const containerElement = getContainerElement();
    containerElement.innerHTML = `
        <div>
            <img src="${data[0].owner.avatar_url}">
            <h2>${data[0].owner.login}</h2>
            <p>id: ${data[0].owner.id}</p>   
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome Repositório</th>
                    <th>Link Repositório</th>
                </tr>
            </thead>
            <tbody id="containerBody">
            </tbody>
        </table>`
    const containerBody = document.querySelector("#containerBody");
    
    let tableRows = ""
    data.forEach(e => {
        tableRows += `
        <tr>
            <td>${e.name}</td>
            <td>${e.url}</td>
        </tr>
    `
  });
    console.log(data)
    containerBody.innerHTML = tableRows;
}

// Seleção do 'container'
const getContainerElement = () => {
    return document.querySelector("#container");
}