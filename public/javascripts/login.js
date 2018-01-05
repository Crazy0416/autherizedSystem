function submitLogin() {
    $.ajax({
        type:"POST",
        url:"/users/login",
        data : {
            id : $('#id').val(),
            password : MD5($('#password').val())
        },
        success: function(result){
            window.location.replace('http://localhost:3000/'+result);
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
};