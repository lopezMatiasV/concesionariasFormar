let qs = function(selector) {
    return document.querySelector(selector)
}

window.addEventListener('load', function() {
    let login = qs('#login')
    let email = qs('#email')
    let pass = qs('#pass')
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    let errores;
    email.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorEmail.innerHTML = "El campo email es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case !regExEmail.test(this.value):
                errorEmail.innerHTML = "Debes escribir un mail válido";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorEmail.innerHTML = ""  // lo vacio
                errores = false
                break;
        }
    })
    pass.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == "":
                errorPass.innerHTML = "El campo contraseña es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case !regExPass.test(this.value):
                errorPass.innerHTML = "El campo contraseña debe tener: entre 6 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorPass.innerHTML = ""  // lo vacio
                errores = false
                break; 
          }
      })
      login.addEventListener('submit',function(event){
        event.preventDefault()
        switch(true){
            case email.value.length == 0:
                errorEmail.innerHTML = "El campo email es obligatorio";
                email.classList.add('is-invalid')
                errores = true;
                break;
            case pass.value.length == 0:
                errorPass.innerHTML = "El campo contraseña es obligatorio";
                pass.classList.add('is-invalid')
                errores = true;
                break;
            default:
                if(!errores){
                    login.submit()
                    errores = false
                }else{
                    errores = true;
                }
          }
        console.log(errores)
    })
})