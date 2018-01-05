function submitRegister() {
    $.ajax({
        type:"POST",
        url:"/users/register",
        data : {
            uid : $('#uid').val(),
            password : MD5($('#password').val()),
            name : $('#name').val()
        },
        success: function(result){
            console.log(result);
            window.location.replace('http://localhost:3000/?alertMessage=로그인 성공');
        },
        error: function(xhr, status, error) {
            switch (xhr.status){
                case 400:
                    alert("DB 에러!!");
                    window.location.replace('http://localhost:3000/');
                    break;
                default:
                    alert("알수 없는 오류!" + error);
                    window.location.replace('http://localhost:3000/');
                    break;
            }
        }
    });
};