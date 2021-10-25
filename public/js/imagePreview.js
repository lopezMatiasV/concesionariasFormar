//alert('hola')
function fileValidation(){
    let fileInput = document.querySelector('#inputFile');
    /*Validaciones de archivos*/
    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif only.');
        errorImagen.innerHTML = 'Archivo no permitido'
        fileInput.value = '';
        return false;
    }else{
    /* Vista previa*/
        if (fileInput.files && fileInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'" width="200px" height="200px"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    /*Fin de vista previa */
    }
    
}