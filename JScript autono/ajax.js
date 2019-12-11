var user = user || {};

user.drawDataTable = function(){
    $.ajax({
        url :"linkcanlayDATA",
        method : "GET",
        dataType : "json",
     
        success : function (data){
            if(data.code===1){
                var response = data.response;
                // xóa bản đi vẻ lại ... tránh trùng dữ liệu
                $('#idNoiMinhMuonDoDuLieu').empty();
                $.each(response, function(index,value){
                    $('#idNoiMinhMuonDoDuLieu').append(`
                        <tr> 
                            <td>${value.thuộctinh}</td> 
                            <td>${value.thuộctinh}</td> 
                            <td>${value.thuộctinh}</td> 
                            <td>${value.thuộctinh}</td> 
                            <td>
                                <a herf='javascript:void(0); onclick='${user.showEditModel(value.id)}'><i class='fas fa-edit'></i></a>
                                <a herf='javascript:void(0); onclick='${user.delete(value.id)}'><i class='fas fa-trash-alt'></i></a>
                            </td> 
                            <td>${value.thuộctinh}</td> 
                        </tr>
                    `);   
                });
            }
        }
    })
}

// truyền dữ liệu vào thẻ select

user.initSelect = function(){
    $.ajax({
        url :"linkcanlayDATA",
        method : "GET",
        dataType : "json",
        contentType: 'application/json',
        success : function (data){
            // trong controler trả về json và code = 1 ( thành công )
            if(data.code===1){
                var response = data.response;
                $.each(response, function(index,value){
                    $('idOfSelect').append(`
                        <option value="">HỒ CHÍ MINH</option>
                        <option value="">HUÊ</option>
                    `);   
                });
            }
        }
    })
}

user.save = function (){
    var userObj = {};    // dùng 1 object để lưu 
    userObj["userName"] = $('#UserName').val();  // gán object = val() của id ô input
    $.ajax({
        url :"linkcanlayDATA",
        method : "GET",
        dataType : "json",
        data : JSON.stringify(userObj), // part obj về thành json
        contentType: 'application/json',
        success : function (data){
            // trong controler trả về json và code = 1 ( thành công )
            if(data.code===1){
                $('#addEditModal').modal('hide'); // đóng modal
                user.drawDataTable(); // vẽ lại data
            }
        }
    })
}

user.showModal = function (){
    $('#addEditModal').modal('show');
}

// reset form 
user.resetFrom = function(){

}
// edit 
user.showEditModel() = function(){

}

user.init=function(){
    user.initSelect();
    user.drawDataTable();
}

// js tự động load ready trước 
$(document).ready(function(){
    user.init();
})