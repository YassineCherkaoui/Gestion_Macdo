$(function(){

    // GET DATA TABLES 
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/table',
        success:function (getTables) {
            let table = $('#GetDataTableService');
            table.html('');
    
            getTables.forEach(tableRow => {
                var $tabSts=[];
                if (tableRow.isOcuped==true) {
                    $tabSts= '<span class="badge badge-success">Available</span>';
                } else if(tableRow.isOcuped==false){
                    $tabSts= '<span class="badge badge-danger">Unavailable</span>';
                }else{
                    $tabSts= '<span class="badge badge-secondary">Null</span>';
                }
                table.append(`
                    <tr>
                        <td id="tabl">${tableRow.numTable}</td>
                        <td>${$tabSts}</td>
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
    
    
    });
    
    // ADD NEW SERVICE TABLE 
    $('#addTable').on('click', function(){
    var $tableMatricul = $('#tableMatricul');
    var $tableStatus = $('#tableStatus');
    var $helpTable = $('#helpTableMatricul');
    
    if ($tableMatricul.val()=="") {
        $tableMatricul.addClass('is-invalid');
        $helpTable.html('This field is required!!')
    } else {
            
        $.ajax({
            method:'POST',
            url:'http://localhost:8080/table/add',
            data:{
                numTable       :$tableMatricul.val(),
                isOcuped:$tableStatus.val()
            },
            timeout: 1000,
            success:function() {
                Swal.fire({
                    icon:'success',
                    title: '<span style="color:#e0a800">Table has been added<span>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    location.reload();
                });
            }
        });
    }
    });
    
    // DELETE TABLE 
    function deleteTable(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/table/delete/'+id,
        success:function() {
            Swal.fire({
                icon: 'success',
                title: '<span style="color:#e0a800">Table has been deleted<span>',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                location.reload();
            });
        },
        timeout: 1000
    });
    };
    
    // EDIT TABLE STATUS 
    function editTable(id) {
    let modelEdit = $('#modelEdit')
    modelEdit.html('<input type="text"  ')
    
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/table/'+id,
        success:function(request){
            console.log(request)        
        },
        timeout: 1000
    })
    }