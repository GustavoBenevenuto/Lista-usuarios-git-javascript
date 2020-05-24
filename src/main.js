import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.querySelector('#repo-form');
        this.listEl = document.querySelector('#repo-list');
        this.inputEl = document.querySelector('input[name=repository]')

        this.registerHandlers();
    }

    //Registrar os eventos
    registerHandlers() {
        this.formEl.onsubmit = (event) => {
            this.addRepository(event);
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0) return;

        this.setLoadding();
        try {
            const response = await api.get(`/users/${repoInput}`);

            const { name: nome, bio, avatar_url, html_url } = response.data;

            console.log(nome);

            this.repositories.push({
                nome: nome,
                bio,
                avatar_url,
                html_url
            });

            this.inputEl.value = '';
            this.render();
        }catch(e){
            alert('Usuário não existe');
        }
        this.setLoadding(false);
    }

    setLoadding(loadding = true){
        if(loadding === true){
            const loaddingEl = document.createElement('span');
            loaddingEl.appendChild(document.createTextNode('Carregando...'));
            loaddingEl.setAttribute('id','loadding');

            this.formEl.appendChild(loaddingEl);
        }else{
            document.querySelector('#loadding').remove();            
        }
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.nome));

            let bioEl = document.createElement('p');
            bioEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode("Acessar"));

            let listaItemEl = document.createElement('li');
            listaItemEl.appendChild(imgEl);
            listaItemEl.appendChild(titleEl);
            listaItemEl.appendChild(bioEl);
            listaItemEl.appendChild(linkEl);

            this.listEl.appendChild(listaItemEl);
        });
    }
}

new App();