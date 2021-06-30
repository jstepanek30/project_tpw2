export function registerJs(){
    const form = document.querySelector('form')
    const pass = document.querySelector('#pwd');
    const passCheck = document.querySelector('#pwd-check');
    const button = document.querySelector('button');
    const passDiv = document.querySelector('.passwordError');

    button.addEventListener('click', (e)=>{
        if(pass.value!==passCheck.value){
            e.preventDefault();
            passDiv.innerHTML = 'Passwords must match!';
            passDiv.style.color = 'rgb(223, 71, 89)';
            passDiv.style.fontWeight = 'bold'
            pass.value = '';
            passCheck.value = '';
            return ;
        }else{
            form.submit()
            return;
        }
    })   
}