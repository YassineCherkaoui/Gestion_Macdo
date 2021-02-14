$(function(){
// GET DATA TABLES 
$.ajax({
    type:'GET',
    url:'http://localhost:8080/codepromo',
    success:function (getTables) {
        let table = $('#getPromoData');
        table.html('');

        getTables.forEach(tableRow => {
            
            table.append(`
                <tr>
                    <td id="tabl">${tableRow.code}</td>
                    <td>${tableRow.pourcentage}</td>
                    <td>${tableRow.isValid}</td>
                    <td class="text-center py-0 align-middle">
                        <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-info text-white" onclick="editTable('${tableRow._id}')"><i class="fa fa-edit"></i></a>
                            <a href="#" class="btn btn-danger text-white" onclick="deleteTable('${tableRow._id}')"><i class="fa fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
            `)
        });
    }
});

// GET PRODUCTS SELECT OPTION
$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/product',
    success: function(getProdData) {
        $.each(getProdData, function(i, prodPromo) {
            var $selectProd = $('#selectProd');
            $selectProd.append(`<option value="${prodPromo._id}">${prodPromo.code}</option>`)
        });
    },
});

});

// ADD NEW CODE PROMO 
$('#addCodePromo').on('click', function(){
var $codePromo = $('#codePromo');
var $selectProd = $('#percentage');
var $selectvisble = $('#selectvisble');

if ($codePromo.val()=="") {
    $codePromo.addClass('is-invalid');
    
} else if ($selectProd.val()=="") {
    $selectProd.addClass('is-invalid');
} else if ($selectvisble.val()=="")  {
    $selectvisble.addClass('is-invalid');
} else{
        
    $.ajax({
        method:'POST',
        url:'http://localhost:8080/codepromo/add',
        data:{
            code       :$codePromo.val(),
            pourcentage :$selectProd.val(),
            isValid :$selectvisble.val(),
        },
        timeout: 1000,
        success:function() {
            Swal.fire({
                icon:'success',
                title: '<span style="color:#e0a800">Code promo has been added<span>',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        }
    });
}
});
