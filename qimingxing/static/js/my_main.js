

$('#welcome_username').html( localStorage.username )

function exit(){
	$.get('http://10.0.0.10/admin-logout',function(res){
		if (res.code == 200) {
			console.log(123)
		};
	})
}