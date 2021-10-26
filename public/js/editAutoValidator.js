const qs = function (element){
    return document.querySelector(element);
}
window.addEventListener('load',function(){
    
    let editAuto = qs('#editAuto');
    let marca = qs('#marca');
    let modelo = qs('#modelo');
    let anio = qs('#anio');
    let color = qs('#color');
    let sucursal = qs('#sucursal');
    let imagen = qs('#inputFile')
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;


    marca.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorMarca.innerHTML = "El campo del marca es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value.length <= 2:
                errorMarca.innerHTML = "El campo marca debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorMarca.innerHTML = ""  // lo vacio
                break;
        }
    })
    modelo.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorModelo.innerHTML = "El campo del Modelo es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value.length <= 2:
                errorModelo.innerHTML = "El campo Modelo debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorModelo.innerHTML = ""  // lo vacio
                break;
        }
    })
    anio.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorAnio.innerHTML = "El campo del Año es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value.length !== 4:
                errorAnio.innerHTML = "Ingrese un valor de 4 dígitos";
                this.classList.add('is-invalid')
                break;
            case this.value > 2021:
                errorAnio.innerHTML = "Ingrese un año válido";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorAnio.innerHTML = ""  // lo vacio
                break;
        }
    })
    color.addEventListener('blur', function(){
        switch (true) {
            case this.value.length == 0:
                errorColor.innerHTML = "El campo del Color es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value.length <= 2:
                errorColor.innerHTML = "El campo Color debe tener al menos 3 caracteres";
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                errorColor.innerHTML = ""  // lo vacio
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
    /* editAuto.addEventListener('submit',function(event){
        let error = false
        event.preventDefault()
    
        let elementosFormE = editAuto.elements
        
        for (let index = 0; index < elementosFormE.length-1; index++) {
            if(elementosFormE[index].value == ""){
                elementosFormE[index].classList.add('is-invalid');
                msgError.innerHTML = "Los campos señalados son obligatorios para editar productos";
                error =true
            }
        }
        if(!error){
            console.log("Todo Perfecto en la edición!!");
            alert("Producto modificado correctamente")
            editAuto.submit()
        }
        
    }) */
    editAuto.addEventListener('submit',function(event){
        event.preventDefault()
        let error = false
        switch(true){
        case marca.value.length == 0:
            errorMarca.innerHTML = "El campo no puede ir vacio";
            marca.clasList.add('is-invalid')
            error = true
            break;
        case modelo.value.length == 0:
            errorModelo.innerHTML = "El campo no puede ir vacio";
            modelo.classList.add('is-invalid');
            error = true
            break;
        case anio.value.length == 0:
            errorAnio.innerHTML = "El campo no puede ir vacio";
            anio.classList.add('is-invalid');
            error = true
            break;
        case color.value.length == 0:
            errorColor.innerHTML = "El campo no puede ir vacio";
            color.classList.add('is-invalid');
            error = true
            break;
        default:
            error = false
       }
        if(!error){
            alert("Auto editado correctamente")
                editAuto.submit()
                
            }
    })
})