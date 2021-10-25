const qs = function (element){
    return document.querySelector(element);
}

window.addEventListener('load',function(){
    
    let registro = qs('#registro')
    let nombre = qs('#nombre');
    let apellido = qs('#apellido');
    let email = qs('#email');
    let pass = qs('#pass');
    let pass2 = qs('#pass2');
    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    nombre.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorNombre.innerHTML = "El campo nombre es obligatorio";  //para las etiquetas span del index.ejs (error nombre le voy a agregar el string errores.nombre)
                this.classList.add('is-invalid') //estoy agregando la clase is-invalid, si es que hay un error.
                break;
            case this.value.length <= 2: //debe tener al menos 3 letras
                errorNombre.innerHTML = "El campo nombre debe tener al menos 3 letras";
                this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid'); //sobre el mismo elemento si hubiera habido un error lo voy a remover y le voy a agregar
                this.classList.add('is-valid');
                errorNombre.innerHTML = ""  // lo vacio
                break;
        }
})
    apellido.addEventListener('blur', function(){ //reeemplazar 
        switch (true) {
            case this.value.length == 0:
                errorApellido.innerHTML = "El campo apellido es obligatorio";
                this.classList.add('is-invalid')
                break;
        case this.value.length <=2:
            errorApellido.innerHTML = "El campo apellido debe tener al menos 3 letras";
            this.classList.add('is-invalid')
            break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorApellido.innerHTML = ""  // lo vacio
                break;
        }
    })
    email.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorEmail.innerHTML = "El campo email es obligatorio";
                this.classList.add('is-invalid')
                break;
            case !regExEmail.test(this.value):
                errorEmail.innerHTML = "Debes escribir un mail válido";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorEmail.innerHTML = ""  // lo vacio
                break;
        }
    })
    pass.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == "":
                errorPass.innerHTML = "El campo contraseña es obligatorio";
                this.classList.add('is-invalid')
                break;
            case !regExPass.test(this.value):
                errorPass.innerHTML = "El campo contraseña debe tener: entre 6 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorPass.innerHTML = ""  // lo vacio
                break; 
        }
    })
    pass2.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == "":
                errorPass2.innerHTML = "El campo contraseña es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value != pass.value:
                errorPass2.innerHTML = "Las contraseñas no coinciden"
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorPass2.innerHTML = ""  // lo vacio
                break; 
        }
    })

    registro.addEventListener('submit',function(event){
        event.preventDefault()
        let error = false
        switch(true){
        case nombre.value.length == 0:
            errorNombre.innerHTML = "El campo no puede ir vacio";
            nombre.classList.add('is-invalid')
            error = true
            break;
        case apellido.value.length == 0:
            errorApellido.innerHTML = "El campo no puede ir vacio";
            apellido.classList.add('is-invalid');
            error = true
            break;
        case email.value.length == 0:
            errorEmail.innerHTML = "El campo no puede ir vacio";
            email.classList.add('is-invalid');
            error = true
            break;
        case pass.value.length == 0:
            errorPass.innerHTML = "El campo no puede ir vacio";
            pass.classList.add('is-invalid');
            error = true
            break;
        case pass2.value.length == 0:
            errorPass2.innerHTML = "El campo no puede ir vacio";
            pass2.classList.add('is-invalid');
            error = true
            break;
        default:
            error = false
    }
        if(!error){
            alert("Te registraste correctamente, ahora logueate!!!")
                registro.submit()
                
            }
    })
})