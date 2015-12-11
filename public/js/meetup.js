(function(){

	var ss = {};
	ss.meetup = {};
	ss.meetup.endpoint = 'https://api.meetup.com/';
	ss.meetup.key = '65557b272b2e302051116d2e4c5468d';
	ss.meetup.group = 'ilovepracticalspirituality';
	ss.meetup.events = [];
	ss.meetup.rsvps = [];
	ss.meetup.rsvpIDs = [];

	ss.meetup.initialize = function() {

// 		ss.meetup.getRsvps();
		ss.meetup.getEvents();
	};

// https://api.meetup.com/self/events?&sign=true&photo-host=public&scroll=next_upcoming&page=20
// https://api.meetup.com/self/events?&sign=true&scroll=next_upcoming&key=65557b272b2e302051116d2e4c5468d
// https://api.meetup.com/self/events?scroll=next_upcoming&photo-host=public&sig_id=83070352&sig=f83597a3980abb985f16e83267dc3ad943bd64a5

	ss.meetup.getRsvps = function () {
		var urlMeetup = ss.meetup.endpoint + 'self/events';
			urlMeetup += '?scroll=next_upcoming';
// 			urlMeetup += '&group_urlname=' + ss.meetup.group;
			urlMeetup += '&photo-host=public';
			urlMeetup += '&sig_id=83070352';
			urlMeetup += '&sig=f83597a3980abb985f16e83267dc3ad943bd64a5';
// 			urlMeetup += '&key=' + ss.meetup.key;

		$.ajax({
			method: 'get',
			dataType: 'jsonp',
			url: urlMeetup,
			success: function( xhr ) {
				console.log( xhr );

				for ( var n in xhr.data ) {
					var event = xhr.data[ n ];
					if ( event.group.urlname === ss.meetup.group ) {
						ss.meetup.rsvpIDs.push( event.id );
						var thisEvent = {
							title: event.name,
							id: event.id,
							start: event.time + event.utc_offset,
							end: event.time + event.duration + event.utc_offset,
							url: event.event_url,
							fee: event.fee
						};
						ss.meetup.rsvps.push( thisEvent );
					}
				}

				$( '#rsvp pre' ).text( JSON.stringify( ss.meetup.rsvps ) );

				for ( n in ss.meetup.rsvps ) {
					var calEvent = ss.meetup.rsvps[ n ];
					$( '#rsvp' ).append( '<div></div>' );
					$( '#rsvp div:nth-of-type( ' + n + ' )' ).loadTemplate( $( '#rsvpTemplate' ),
						{
							classTitle: calEvent.title,
							classDescription: calEvent.description,
							classLink: calEvent.url,
							classFee: ( calEvent.fee ) ? calEvent.fee.label + ': $' + calEvent.fee.amount : []
// 							classDate: calEvent.start.format( 'MMMM Do YYYY, h:mm a' ) + ' - ' + calEvent.end.format( 'h:mm a' )
						}
					);
				}




				console.log( ss.meetup.rsvpIDs );
				console.log( JSON.stringify( ss.meetup.rsvps[ 0 ] ) );
			},
			error: function( error ) {
				console.log( error );
			}
		});
	};


	ss.meetup.getEvents = function () {
		var urlMeetup = ss.meetup.endpoint + '2/events?sign=true';
			urlMeetup += '&group_urlname=' + ss.meetup.group;
			urlMeetup += '&key=' + ss.meetup.key;

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
							id: event.id,
							start: event.time + event.utc_offset,
							end: event.time + event.duration + event.utc_offset,
							url: event.event_url,
							description: event.description,
							className: [ 'classes', 'foo','bar' ],
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
					eventClick: function( calEvent, e ) {
						e.preventDefault();

						$( '#classModal .modal-content' ).loadTemplate( $( '#classTemplate' ),
							{
								classTitle: calEvent.title,
								classDescription: calEvent.description,
								classLink: calEvent.url,
								classFee: ( calEvent.fee ) ? calEvent.fee.label + ': $' + calEvent.fee.amount : [],
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
