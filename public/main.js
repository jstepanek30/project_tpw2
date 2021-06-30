import { articleJs } from './articles.js'
import { registerJs } from './register.js'

(function (){
    if(window.location.pathname.includes('/articles/read')){
        articleJs();
    }
    if(window.location.pathname.includes('/register')){
        registerJs();
    }
    
})();

