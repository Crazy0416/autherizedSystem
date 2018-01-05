function submitRegister() {
    $.ajax({
        type:"POST",
        url:"/users/register",
        data : {
            id : $('#id').val(),
            password : MD5($('#password').val()),
            name : $('#name').val()
        },
        success: function(result){
            console.log(result);
            window.location.replace('http://localhost:3000/?alertMessage=로그인 성공');
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
};