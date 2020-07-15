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
const getLogin = () => document.querySelector("#user-input").value;

// Criação do corpo da página; Perfil do usuário; Tabela com as informações do usuário através da request
const setContainer = (data) => {
    const containerElement = getContainerElement();
    containerElement.innerHTML = `
        <div class="divUserPhoto">
            <img src="${data[0].owner.avatar_url}">
            <div class="divLegendPhoto">
                <h2 class="h2-user">${data[0].owner.login}</h2>
                <p class="id-user">#id: ${data[0].owner.id}</p>
                <p class="total-repo">Total repositories: ${data.length} </p>
            </div>
        </div>
        <div class="div-table">
            <table class="table-striped">
                <thead>
                    <tr>
                        <th>Repository Name</th>
                        <th>Repository Link</th>
                    </tr>
                </thead>
                <tbody id="containerBody">
                </tbody>
            </table>
        </div>`
    const containerBody = document.querySelector("#containerBody");
    
    let tableRows = ""
    data.forEach(e => {
        tableRows += `
        <tr>
            <td class="table-name">${e.name}</td>
            <td class="table-url"><a href="${e.html_url}">${e.html_url}</a></td>
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