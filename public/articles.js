export function articleJs(){
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const numberOfArticles =  document.querySelector('.numberOfArticles');
    const max = Math.ceil(Number(numberOfArticles.textContent.slice(20))/5);
    
    if(prev.getAttribute('href').slice(15)<2) prev.remove();
    if(Number(next.getAttribute('href').slice(15))===max) next.remove();
        
    prev.addEventListener('click', (e)=>{
        let id = prev.getAttribute('href').slice(15);
        id--;
        prev.setAttribute('href',`/articles/read/${id}`);
    })
    next.addEventListener('click', (e)=>{
        let id = next.getAttribute('href').slice(15);
        id++;
        next.setAttribute('href',`/articles/read/${id}`);
    })
}
