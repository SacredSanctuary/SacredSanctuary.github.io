(function(){

	var ss = {};
	ss.displayMap = {};
	ss.displayMap.map = {};
	ss.displayMap.type = '';
	ss.displayMap.boundingbox = [];
	ss.displayMap.pins = [];
	ss.displayMap.pinNum = 0;
	ss.displayMap.flyout = {};

	ss.displayMap.locations = [
		{
			'name': 'Sacred Sanctuary - A Spiritual Center in Olde Town Arvada',
			'address': {
				'street': '7505 Grandview Ave',
				'city': 'Arvada',
				'state': 'C0',
				'postal': '80002'
			},
			'geocode': {
				'lat': 39.7993985,
				'lng': -105.0806048
			}
		}
	];

	ss.displayMap.initialize = function() {
		ss.displayMap.map = new google.maps.Map( document.getElementById( 'ajaxMap' ), {
			center: new google.maps.LatLng( ss.displayMap.locations[0].geocode.lat, ss.displayMap.locations[0].geocode.lng ),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		ss.displayMap.boundingbox = new google.maps.LatLngBounds();

		for ( var i = 0; i < ss.displayMap.locations.length; i++ ) {
			var LatLng = new google.maps.LatLng( ss.displayMap.locations[i].geocode.lat, ss.displayMap.locations[i].geocode.lng );
			ss.displayMap.boundingbox.extend( LatLng );

			ss.displayMap.addPins();
		}

// 		ss.displayMap.map.fitBounds( ss.displayMap.boundingbox );
	};

	ss.displayMap.addPins = function() {
		var LatLng = new google.maps.LatLng( ss.displayMap.locations[ ss.displayMap.pinNum ].geocode.lat, ss.displayMap.locations[ ss.displayMap.pinNum ].geocode.lng );

		var marker = new google.maps.Marker({
			position: LatLng,
			map: ss.displayMap.map,
			draggable: false,
			title: ss.displayMap.locations[ ss.displayMap.pinNum ].name,
			datetime: ss.displayMap.locations[ ss.displayMap.pinNum ].datetime,
			animation: google.maps.Animation.DROP
		});

		ss.displayMap.pins.push( marker );

		google.maps.event.addListener( marker, 'click', function() {
			if ( ss.displayMap.flyout.close ) {
				ss.displayMap.flyout.close();
			}

			var windowContent = '<a target=\'new\' href=\'https://www.google.com/maps/place/Sacred+Sanctuary+Conscious+Gift+Store+%26+Spiritual+Center/@39.799686,-105.0814577,17z/data=!4m7!1m4!3m3!1s0x876b862cf19a1775:0x7b55826ce88e884d!2s5626+Olde+Wadsworth+Blvd,+Arvada,+CO+80002!3b1!3m1!1s0x876b862cf183867b:0x96f177d7f7f47b22\'>' + marker.title + '</a>';
			windowContent = '<h4>' + windowContent + '</h4>';

			ss.displayMap.flyout = new google.maps.InfoWindow({
				content: windowContent
			});
			ss.displayMap.flyout.open( ss.displayMap.map, marker );
		});

		ss.displayMap.pinNum++;
	};

	$( window ).load( function() {
		ss.displayMap.initialize();
	});

})();
