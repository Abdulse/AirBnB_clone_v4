$(function () {
    const am_dict = {};
    const st_dict = {};
    const ct_dict = {};

    $('div.amenities li input').change(function () {
	if($(this).is(':checked')){
	    am_dict[$(this).attr('data-name')] = $(this).attr('data-id');
	} else if ($(this).is(':not(:checked)')) {
	    delete am_dict[$(this).attr('data-name')];
	}
	const names = Object.keys(am_dict);
	$('.amenities h4').html(names.sort().join(', '));
    });

    $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
	if (data.status === 'OK') {
	    $('DIV#api_status').addClass('available');
	} else {
	    $('DIV#api_status').removeClass('available');
	}
    });

    $.ajax('http://0.0.0.0:5001/api/v1/places_search', {
	data: JSON.stringify({}),
	contentType: 'application/json',
	type: 'POST',
	success: data => {
	    for (let i = 0; i < data.length; i++) {
		let place = data[i];
		$('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
	    }
	}
    });

    $('div.locations h2 > input').change(function () {
	if($(this).is(':checked')){
	    st_dict[$(this).attr('data-name')] = $(this).attr('data-id');
	} else if ($(this).is(':not(:checked)')) {
	    delete st_dict[$(this).attr('data-name')];
	}
	const names = Object.keys(st_dict).concat(Object.keys(ct_dict));
	$('div.locations h4').html(names.sort().join(', '));
    });

    $('div.locations li > input').change(function () {
	if($(this).is(':checked')){
	    ct_dict[$(this).attr('data-name')] = $(this).attr('data-id');
	} else if ($(this).is(':not(:checked)')) {
	    delete ct_dict[$(this).attr('data-name')];
	}
	const names = Object.keys(st_dict).concat(Object.keys(ct_dict));
	$('div.locations h4').html(names.sort().join(', '));
    });
    
    $('.filters > button').click(function () {
	const data = {
	    amenities: Object.values(am_dict),
	    states: Object.valuess(st_dict),
	    cities: Object.values(ct_dict)
	};
	$('.places > article').remove();
	$.ajax({
	    type: 'POST',
	    url: 'http://0.0.0.0:5001/api/v1/places_search',
	    data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
	    dataType: 'json',
	    contentType: 'application/json',
	    success: function (data) {
		for (let i = 0; i < data.length; i++) {
		    let place = data[i];
		    $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
		}
	    }
	});
    });
});
