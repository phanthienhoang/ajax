document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');
    const URL = `http://localhost:3000/user`;
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = loginForm.querySelector('#email').value;
        const passwordInput = loginForm.querySelector('#password').value;
        var flag=false;
        $.ajax({
            type: 'GET',    
            url: URL,
            success:function(data){
                $.each(data, function(index, value) {
                    if(value.email==emailInput && value.password ==passwordInput){
                        window.location='manager.html';
                        flag = true;
                    }
                });   
                if(flag===false){
                    $("#message").html("Invalid username and password!");
                }
            }
        });
    })
});