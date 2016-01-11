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
		ss.meetup.checkLogin();
	};

	ss.getUrlVars = function () {
		var vars = [],
			hash,
			hashes = window.location.hash.substring( 1 ).split( '&' );

		for ( var i = 0; i < hashes.length; i++ ) {
			hash = hashes[ i ].split( '=' );
			vars.push( hash[ 0 ] );
			vars[ hash[ 0 ] ] = hash[ 1 ];
		}
		return vars;
	};

	ss.meetup.checkLogin = function () {
		ss.queryString = ss.getUrlVars();

		if ( ss.queryString.access_token ) {
			ss.meetup.getUser( ss.queryString.access_token );
		} else {
			$( '#rsvp button' ).on( 'click', function( e ) {
				e.preventDefault();
				ss.meetup.login();
			});
			ss.meetup.getEvents();
		}
	};

	ss.meetup.login = function () {
		var urlMeetup = 'https://secure.meetup.com/oauth2/authorize';
			urlMeetup += '?client_id=ggd1jrdcj14fpaj9tpahc5gnpb';
			urlMeetup += '&response_type=token';
// 			urlMeetup += '&redirect_uri=http://sacredsanctuary.github.io/calendar.html';
			urlMeetup += '&redirect_uri=http://localhost:4000/calendar.html';

			window.location = urlMeetup;
	};

	ss.meetup.getUser = function ( token ) {
		var urlMeetup = ss.meetup.endpoint + '2/members';
			urlMeetup += '?member_id=self';
			urlMeetup += '&photo-host=public';
			urlMeetup += '&access_token=' + token;

		$.ajax({
			method: 'get',
			dataType: 'jsonp',
			url: urlMeetup,
			success: function( xhr ) {
// 				console.log( xhr.results[ 0 ].name );

				try {

					ss.meetup.getRsvps( token, xhr.results[ 0 ].name );
				} catch ( e ) {
					console.log( e );
					window.location = '//' + window.location.host + window.location.pathname;
				}

			},
			error: function( error ) {
				console.log( error );
			}
		});
	};

	ss.meetup.getRsvps = function ( token, userName ) {

		$( '.rsvps h3 span' ).html( userName + '’s <br/> RSVPs' );
		$( '#rsvp' ).html( '<div></div>' );

		var urlMeetup = ss.meetup.endpoint + 'self/events';
			urlMeetup += '?scroll=next_upcoming';
			urlMeetup += '&photo-host=public';
			urlMeetup += '&access_token=' + token;

		$.ajax({
			method: 'get',
			dataType: 'jsonp',
			url: urlMeetup,
			success: function( xhr ) {
				console.log( xhr.data );


// 				try {
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

					for ( var i = 1; i <= ss.meetup.rsvps.length; i++ ) {
						var calEvent = ss.meetup.rsvps[ i - 1 ];
						$( '#rsvp' ).append( '<div></div>' );

						$( '#rsvp div:nth-of-type( ' + ( i ) + ' )' ).loadTemplate( $( '#rsvpTemplate' ),
							{
								classTitle: calEvent.title,
								classId: calEvent.id,
								classDescription: calEvent.description,
								classLink: calEvent.url,
								classDate: moment( calEvent.start ).format( 'MMMM Do YYYY, h:mm a' ) + ' - ' + moment( calEvent.end ).format( 'h:mm a' ),
								classFee: ( calEvent.fee ) ? calEvent.fee.label + ': $' + calEvent.fee.amount : []
							}
						);
					}

					ss.meetup.getEvents();

					console.log( ss.meetup.rsvpIDs );
					console.log( JSON.stringify( ss.meetup.rsvps[ 0 ] ) );
// 				} catch ( e ) {
// 					console.log( e );
// 					window.location = '//' + window.location.host + window.location.pathname;
// 				}

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
						rsvpClass = ( $.inArray( event.id, ss.meetup.rsvpIDs ) >= 0 ) ? 'going' : 'not',
						thisEvent = {
							title: event.name,
							id: event.id,
							start: event.time + event.utc_offset,
							end: event.time + event.duration + event.utc_offset,
							url: event.event_url,
							description: event.description,
							className: [ 'classes', rsvpClass ],
							rsvp: {
								yes: event.yes_rsvp_count,
								max: event.rsvp_limit,
								you: ( $.inArray( event.id, ss.meetup.rsvpIDs ) >= 0 ) ? 'Attending' : 'RSVP'
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
								classRSVPMax: ( calEvent.rsvp.max ) ? ' / ' + calEvent.rsvp.max : '',
// 								classRSVPMax: calEvent.rsvp.max,
								classRSVPyou: calEvent.rsvp.you,
								classDate: calEvent.start.format( 'MMMM Do YYYY<br> h:mm a' ) + ( ( calEvent.end ) ? ' - ' + calEvent.end.format( 'h:mm a' ) : '' )

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
