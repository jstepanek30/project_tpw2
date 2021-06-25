import { articleJs } from './articles.js'

(function (){
    if(window.location.pathname.includes('/articles/read')){
        articleJs();
    }
    
})();

