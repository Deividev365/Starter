import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formElement = document.getElementById('repo-form');
        this.inputElement = document.querySelector('input[name=repository]');
        this.listElement = document.getElementById('repo-list');

        this.registerHandlers();
    }
    // all the 'events' from the user is going to be here
    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode("Loading..."));
            loadingEl.setAttribute("id", 'loading');

            this.formElement.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

   async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputElement.value;

        if(repoInput.length === 0)
            return;

        this.setLoading();

        try{
        const response = await api.get(`/users/${repoInput}`);

        const { name, bio, html_url, avatar_url } = response.data;

        this.repositories.push({
            name,
            bio,
            avatar_url,
            html_url
        });

        this.inputElement.value = '';



        this.render();
        }catch(err) {
            alert("O repositório não existe");
        }

        this.setLoading(false);
    }

    render() {
        this.listElement.innerHTML = "";

        this.repositories.forEach(repo => {

            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);


            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));


            let bioEl = document.createElement('p');
            bioEl.appendChild(document.createTextNode(repo.bio));


            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar'));


            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(bioEl);
            listItemEl.appendChild(linkEl);

            this.listElement.appendChild(listItemEl);


        });
    }
}
// running the function
new App();