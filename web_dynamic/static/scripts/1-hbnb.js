$(function () {
    const am_dict = {};
    $('div.amenities li input').change(function () {
	if($(this).is(':checked')){
	    am_dict[$(this).attr('data-name')] = $(this).attr('data-id');
	} else if ($(this).is(':not(:checked)')) {
	    delete am_dict[$(this).attr('data-name')];
	}
	const names = Object.keys(am_dict);
	$('.amenities h4').html(names.sort().join(', '));
    });
});
