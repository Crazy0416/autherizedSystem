function submitLogin() {
    $.ajax({
        type:"POST",
        url:"/users/login",
        data : {
            uid : $('#uid').val(),
            password : MD5($('#password').val())
        },
        success: function(result){
            window.location.replace('http://localhost:3000/'+ "/?" + result['msg']);
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
};