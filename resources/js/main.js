window.addEventListener('DOMContentLoaded', () => {


    initForms = (parent) => {
        let forms = parent.querySelectorAll('form');
        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            form.addEventListener('submit', function(e){
                e.preventDefault();
                changeView(this.getAttribute('action'), {
                    form: this
                }, function(){
                    initLinks(app);
                    initForms(app);
                })
            })
        }
    }

    initSearchBar = () => {
        const searchBar = document.getElementById('searchBar');
        searchBar.addEventListener('input', function(e){
            e.preventDefault();
            val = this.value
            console.log(val)
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
        console.log(links)
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
        if(object.form){
            object = {
                method: object.form.getAttribute('method').toUpperCase(),
                body: new FormData(object.form) 
            }

            console.log(object.form.entries)
        }

        fetch('/api'+url, object)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            app.innerHTML = res.view;
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