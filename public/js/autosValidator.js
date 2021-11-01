const qs = function (element){
    return document.querySelector(element);
}
window.addEventListener('load',function(){
    
    let cargaAuto = qs('#auto');
    let marca = qs('#marca');
    let modelo = qs('#modelo');
    let anio = qs('#anio');
    let color = qs('#color');
    let sucursal = qs('#sucursal');
    let imagen = qs('#inputFile')
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let errores;


    marca.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorMarca.innerHTML = "El campo del marca es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length <= 2:
                errorMarca.innerHTML = "El campo marca debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorMarca.innerHTML = ""  // lo vacio
                errores = false;
                break;
        }
    })
    modelo.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorModelo.innerHTML = "El campo del Modelo es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length <= 2:
                errorModelo.innerHTML = "El campo Modelo debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorModelo.innerHTML = ""  // lo vacio
                errores = false;
                break;
        }
    })
    anio.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorAnio.innerHTML = "El campo del Año es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length !== 4:
                errorAnio.innerHTML = "Ingrese un valor de 4 dígitos";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value > 2021:
                errorAnio.innerHTML = "Ingrese un año válido";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorAnio.innerHTML = ""
                errores = false;
                break;
        }
    })
    color.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorColor.innerHTML = "El campo del Color es obligatorio";
                this.classList.add('is-invalid')
                errores = true;
                break;
            case this.value.length <= 2:
                errorColor.innerHTML = "El campo Color debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorColor.innerHTML = ""  // lo vacio
                errores = false;
                break;
        }
    })
    sucursal.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorSucursal.innerHTML = "Seleccione una sucursal";
                this.classList.add('is-invalid')
                errores = true;
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorSucursal.innerHTML = ""  // lo vacio
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
    cargaAuto.addEventListener('submit',function(event){
        event.preventDefault()
        switch(true){
            case marca.value.length == 0:
                errorMarca.innerHTML = "El campo no puede ir vacio";
                marca.classList.add('is-invalid');
                errores = true
                break;
            case marca.value.length <= 2:
                errorMarca.innerHTML = "El campo marca debe tener al menos 3 caracteres";
                marca.classList.add('is-invalid')
                errores = true;
                break;
            case modelo.value.length == 0:
                errorModelo.innerHTML = "El campo no puede ir vacio";
                modelo.classList.add('is-invalid');
                errores = true
                break;
            case modelo.value.length <= 2:
                errorModelo.innerHTML = "El campo Modelo debe tener al menos 3 caracteres";
                modelo.classList.add('is-invalid')
                errores = true;
                break;
            case anio.value.length == 0:
                errorAnio.innerHTML = "El campo no puede ir vacio";
                anio.classList.add('is-invalid');
                errores = true
                break;
            case anio.value.length !== 4:
                errorAnio.innerHTML = "Ingrese un valor de 4 dígitos";
                anio.classList.add('is-invalid')
                errores = true;
                break;
            case color.value.length == 0:
                errorColor.innerHTML = "El campo no puede ir vacio";
                color.classList.add('is-invalid');
                errores = true
                break;
            case color.value.length <= 2:
                errorColor.innerHTML = "El campo Color debe tener al menos 3 caracteres";
                color.classList.add('is-invalid')
                errores = true;
                break;
            case sucursal.value.length == 0:
                errorSucursal.innerHTML = "Tienes que seleccionar una sucursal";
                sucursal.classList.add('is-invalid');
                errores = true
                break;
            default:
                if(!errores){
                alert("Auto creado correctamente")
                errores = false;
                cargaAuto.submit()
                
            }
        }
        console.log(errores);
    })
})