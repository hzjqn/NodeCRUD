window.addEventListener('DOMContentLoaded', (e) => {

    const app = document.getElementById('app');

    const initializeInnerLinks = () => {

        let links = document.querySelectorAll('a:not(.outwards)');

        for(let i = 0; i < links.length; i++){

            links[i].addEventListener('click', function(e){

                e.preventDefault();

                if(links[i].dataset.action == 'goto'){

                    goTo(this.getAttribute('href'));

                } else if (links[i].dataset.action == 'delete') {

                    deletePerson(this.getAttribute('href'), this.dataset.id);
                }

            });
        }
    }

    
    const initializeForms = () => {

        let forms = document.querySelectorAll('form:not(.outwards)');  

        for(let i = 0; i < forms.length; i++){

            forms[i].addEventListener('submit', function(e){

                e.preventDefault();

            });
        }
    }
    
    const initializeSearchBar = () => {

        let searchBar = document.querySelector('input#searchBar');

        searchBar.addEventListener('input', function(e){

            e.preventDefault();

            search(this.value);

        });
    }
    
    const search = (value) => {

        if(value.length){

            fetch('/api/search/'+value)

            .then((res) => {

                return res.json()

            })

            .then((res) => {

                app.innerHTML = res.view;

                initializeInnerLinks();
                initializeForms();

            })

            .catch((res) => {

                console.log('Error! => '+res);

            });

        } else {

            fetch('/api/restore')

            .then((res) => {

                return res.json()

            })

            .then((res) => {

                app.innerHTML = res.view

                initializeInnerLinks();
                initializeForms();

            })

            .catch((res) => {

                console.log('Error! => '+res)

            });

        }
    }
    
    const deletePerson = (href, id) => {

        formData = new FormData()

        formData.append('id', JSON.stringify(id));

        fetch('/api'+href, {

            method: 'DELETE',

            body: formData

        })
        
        .then(res =>{

            return res.json();
        })
        
        .then(res =>{

            callback(res);

        })
        
        .catch(res =>{

            error(res);

        });
    }
    
    const goTo = (href) => {
        
        fetch('/api'+href)
        
        .then(res =>{

            return res.json();
            
        })
        
        .then(res =>{

            console.log('goto')
            app.innerHTML = res.view;
            initializeInnerLinks();
            initializeForms();

        })
        
        .catch(res =>{

            error(res);

        });
    }

    initializeInnerLinks();
    initializeSearchBar();
    initializeForms();
});