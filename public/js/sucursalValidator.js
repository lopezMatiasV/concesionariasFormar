const qs = function (element){
    return document.querySelector(element);
}
window.addEventListener('load',function(){
    let form = qs('#form')
    let nombre = qs('#inputName');
    let direccion = qs('#inputAddress');
    let telefono = qs('#inputTel');
    let imagen = qs('#inputFile')
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let errores;

    nombre.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorNombre.innerHTML = "El campo del nombre es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length <= 2:
                errorNombre.innerHTML = "El campo nombre debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorNombre.innerHTML = ""
                errores = false;
                break;
        }
    })
    direccion.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorDireccion.innerHTML = "El campo direccion es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length <= 6:
                errorDireccion.innerHTML = "El campo direccion debe tener al menos 6 caracteres";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorDireccion.innerHTML = ""
                errores = false;
                break;
        }
    })
    telefono.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorTelefono.innerHTML = "El campo del Telefono es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length < 8:
                errorTelefono.innerHTML = "Ingrese un valor de 4 dígitos";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorTelefono.innerHTML = "" 
                errores = false;
                break;
        }
    })
   
    imagen.addEventListener('change',function(){
        switch (true) {
            case !regExExtensions.exec(this.value) :
                errorImagen.innerHTML = 'Archivo no permitido'
                this.classList.add('is-invalid')
                this.value = '';
                break
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorImagen.innerHTML = "";
                break
        }
    })
    form.addEventListener('submit',function(event){
        event.preventDefault()
        switch(true){
            case nombre.value.length == 0:
                errorNombre.innerHTML = "El campo no puede ir vacio";
                nombre.classList.add('is-invalid');
                errores = true
                break;
            case nombre.value.length <= 2:
                errorNombre.innerHTML = "El campo nombre debe tener al menos 3 caracteres";
                nombre.classList.add('is-invalid')
                errores = true;
                break;
            case direccion.value.length == 0:
                errorDireccion.innerHTML = "El campo no puede ir vacio";
                direccion.classList.add('is-invalid');
                errores = true
                break;
            case direccion.value.length <= 6:
                errorDireccion.innerHTML = "El campo direccion debe tener al menos 6 caracteres";
                direccion.classList.add('is-invalid')
                errores = true;
                break;
            case telefono.value.length == 0:
                errorTelefono.innerHTML = "El campo no puede ir vacio";
                telefono.classList.add('is-invalid');
                errores = true
                break;
            case telefono.value.length > 8:
                errorTelefono.innerHTML = "Ingrese un valor de 4 dígitos";
                telefono.classList.add('is-invalid')
                errores = true;
                break;
            default:
                if(!errores){
                alert("Sucursal creada correctamente")
                errores = false;
                form.submit()
            }
        }
        console.log(errores);
    })
})