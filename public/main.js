import { articleJs } from './articles.js'
import { registerJs } from './register.js'
import { newArticle } from './newArticle.js'
import { editArticle } from './editArticle.js'

(function (){
    if(window.location.pathname.includes('/articles/read')){
        articleJs();
    }
    if(window.location.pathname.includes('/articles/new')){
        newArticle();
    }
    if(window.location.pathname.includes('/articles/edit')){
        editArticle();
    }
    if(window.location.pathname.includes('/register')){
        registerJs();
    }

    
})();

