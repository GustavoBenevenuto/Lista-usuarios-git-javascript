import api from './api';

class App {
    constructor() {
        this.users = [];

        this.formEl = document.querySelector('#users-form');
        this.listEl = document.querySelector('#users-list');
        this.inputEl = document.querySelector('input[name=users]')

        this.registerHandlers();
    }

    //Registrar os eventos
    registerHandlers() {
        this.formEl.onsubmit = (event) => {
            this.addUsers(event);
        }
    }

    async addUsers(event) {
        event.preventDefault();

        const usersInput = this.inputEl.value;

        if (usersInput.length === 0) return;

        this.setLoadding();
        try {
            const response = await api.get(`/users/${usersInput}`);

            const { name: nome, bio, avatar_url, html_url } = response.data;

            if (nome === null) {
                this.inputEl.value = '';
                alert('Usuário incomun');
                this.setLoadding(false);
                return;
            }


            this.users.push({
                nome: nome,
                bio,
                avatar_url,
                html_url
            });

            this.inputEl.value = '';
            this.render();
        } catch (e) {
            alert('Usuário não existe');
        }
        this.setLoadding(false);
    }

    setLoadding(loadding = true) {
        if (loadding === true) {
            const loaddingEl = document.createElement('span');
            loaddingEl.appendChild(document.createTextNode('Carregando...'));
            loaddingEl.setAttribute('id', 'loadding');

            this.formEl.appendChild(loaddingEl);
        } else {
            document.querySelector('#loadding').remove();
        }
    }

    render() {
        this.listEl.innerHTML = '';

        this.users.forEach(users => {
            this.listEl.innerHTML += `
            <div class="card mb-3">
                <div>
                    <img src="${users.avatar_url}" class="card-img-top rounded mx-auto d-block" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${users.nome}</h5>
                    <p class="card-text">${users.bio}</p>
                    <a href="${users.html_url}" target="_blank" >Acessar</a>
                </div>
            </div>
            `
        });
    }
}

new App();