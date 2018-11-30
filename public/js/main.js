window.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')
    const title = document.title;

    initForms = (parent) => {
        let forms = parent.querySelectorAll('form');
        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            form.addEventListener('submit', function(e){
                e.preventDefault();
                sendForm(form, form.getAttribute('action'), function (){
                    initLinks(app);
                    initForms(app);                    
                });
            })
        }
    }

    showErrors = (form, response) => {
        if(form){
            for(let i = 0; i < form.elements.length; i++){
                input = form.elements[i];
                errors = response.errors
                for(error in errors){
                    if(errors[input.getAttribute('name')]){
                        errorSpan = document.createElement('span');
                        errorSpan.classList.add('error')
                        errorSpan.innerHTML = 'Error: '+input.getAttribute('name') +'/'+ errors[input.getAttribute('name')];
                        input.parentElement.prepend(errorSpan);
                        break
                    }
                }
            }
        }
    }

    sendForm = (form, url, callback = ()=>{}) => {
        let object = {
            method: form.getAttribute('method').toUpperCase(),
            body: new FormData(form) 
        }

        fetch('/api'+url, object)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            if(res.errors){
                console.log(res)
                app.innerHTML = res.view.html
                callback()
            } else {
                changeView(from.dataset.success, {}, function(){})
            };
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    initSearchBar = () => {
        const searchBar = document.getElementById('searchBar');
        searchBar.addEventListener('input', function(e){
            e.preventDefault();
            val = this.value
            if(val.length){
                changeView('/search/'+this.value, {}, function(){
                    initLinks(app);
                    initForms(app);
                })
            }else{
                changeView('/restore', {}, function(){
                    initLinks(app);
                    initForms(app);
                })
            }
        })
    }

    initLinks = (parent) => {
        let links = parent.querySelectorAll('a');
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if(links[i].dataset.action = 'togo') {
                link.addEventListener('click', function(e){
                    e.preventDefault();
                    changeView(this.getAttribute('href'), {}, function(){
                        initLinks(app);
                        initForms(app);
                    })
                })
            }
        }
    }

    changeView = (url, object, callback) => {
        fetch('/api'+url, object)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            app.innerHTML = res.view.html;
            callback();
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    initLinks(document);
    initForms(document);
    initSearchBar();

});