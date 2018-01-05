function submitEditer(index) {
    $.ajax({
        type: "POST",
        url: "/admin/edit",
        data: {
            uid: $('#uid'+index).text(),
            name: $('#name'+index).val()
        },
        success: function (result) {
            console.log(result);
            alert(result);
        },
        error: function (xhr, status, error) {
            switch (xhr.status){
                case 400:
                    alert("DB 에러!!");
                    break;
                default:
                    alert("알수 없는 오류!");
                    break;
            }
        }
    });
}