$(document).ready(function(){
	$('.delete-item').on('click',function(e){
		$target=$(e.target);
		const id=$target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:id,
			success: function(response){
				alert('Deleting Article');
				window.location.href='/';
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})