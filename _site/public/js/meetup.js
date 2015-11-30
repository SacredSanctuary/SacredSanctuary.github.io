(function(){

	var ss = {};
	ss.meetup = {};
	ss.meetup.endpoint = 'https://api.meetup.com/2/';
	ss.meetup.key = '65557b272b2e302051116d2e4c5468d';
	ss.meetup.group = 'ilovepracticalspirituality';
	ss.meetup.events = [];

	ss.meetup.initialize = function() {
		ss.meetup.getEvents();
	};

	ss.meetup.getEvents = function () {
		var urlMeetup = ss.meetup.endpoint + 'events?&group_urlname=' + ss.meetup.group + '&key=' + ss.meetup.key + '&sign=true';

		$.ajax({
			method: 'get',
			dataType: 'jsonp',
			url: urlMeetup,
			success: function( xhr ) {
				ss.meetup.events = xhr.results;

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();


	$('#calendar').fullCalendar({
		header: {
			left: 'title',
			center: '',
			right: 'month,agendaWeek today prev,next'
		},
		editable: false,
		dayClick: function( day, e, bar ) {
			console.log( 'a day has been clicked! ' + day );
			console.log(  bar );
		},
		events: [
			{
				title: 'All Day Event foo',
				start: new Date(1446681600000)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		]
	});

//				$( '#calendar' ).loadTemplate( $( '#template' ),
//					{
//						author: 'Joe Bloggs',
//						date: '25th May 2013',
//						post: 'This is the contents of my post'
//					}
//				);


			$('#calendar pre').html( JSON.stringify( ss.meetup.events ) );
// 			console.log( JSON.stringify( ss.meetup.events ) );
			},
			error: function( error ) {
				console.log( error );
			}
		});

	};


	$( window ).load( function() {
		ss.meetup.initialize();
	});

})();
