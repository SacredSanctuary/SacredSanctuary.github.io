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

				var calendarEvents = [];

				for ( var n in ss.meetup.events ) {
					var event = ss.meetup.events[ n ],
						thisEvent = {
							title: event.name,
							start: event.time + event.utc_offset,
							end: event.time + event.duration + event.utc_offset,
							url: event.event_url,
							description: event.description,
							className: [ 'classes', 'foo','bar'],
							rsvp: {
								yes: event.rsvp_limit,
								max: event.yes_rsvp_count
							},
							fee: event.fee
						};
					calendarEvents.push( thisEvent );
				}

				$('#calendar').fullCalendar({
					header: {
						left: 'title',
						center: '',
						right: 'month,agendaWeek today prev,next'
					},
					editable: false,
// 					dayClick: function( day, e, calView ) {
// 						console.log( 'a day has been clicked! ' + day );
// 						console.log( calView );
// 					},
// 					eventRender: function( calEvent, element ) {
// 						console.log( calEvent );
// 						console.log( element );
// 					},
					eventClick: function( calEvent, e ) {
						e.preventDefault();

						$( '#classModal .modal-content' ).loadTemplate( $( '#classTemplate' ),
							{
								classTitle: calEvent.title,
								classDescription: calEvent.description,
								classLink: calEvent.url,
								classFee: ( calEvent.fee ) ? calEvent.fee.label + ': $' + calEvent.fee.amount : [],
// 								classFee: calEvent.fee.label + ': $' + calEvent.fee.amount,
								classRSVP: ( calEvent.rsvp.yes ) ? calEvent.rsvp.yes : 0,
								classRSVPMax: calEvent.rsvp.max,
								classDate: calEvent.start.format( 'MMMM Do YYYY, h:mm a' ) + ' - ' + calEvent.end.format( 'h:mm a' )
							}
						);

						$( '#classModal' ).modal( 'show' );

						return false;

					},
					events: calendarEvents
				});

// 				console.log( JSON.stringify( ss.meetup.events[ 0 ] ) );
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
