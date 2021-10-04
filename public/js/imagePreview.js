function fileValidation(){
    var fileInput = document.getElementById('inputFile');
    /*Validaciones de archivos*/
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    }else{
    /* Vista previa*/
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'" width="200px" height="200px"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    /*Fin de vista previa */
    }
    
}