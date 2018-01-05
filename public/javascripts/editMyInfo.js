function submitEditer() {
    $.ajax({
        type:"POST",
        url:"/users/edit",
        data : {
            password : MD5($('#password').val()),
            name : $('#name').val()
        },
        success: function(result){
            console.log(result);
            window.location.replace('http://localhost:3000/');
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
};