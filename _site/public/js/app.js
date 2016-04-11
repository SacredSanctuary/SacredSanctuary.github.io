(function () {
	$( '.carousel a' ).on( 'click', function() {
		$( this ).blur();
	});
	$( window ).load( function() {
		if ( $( 'body' ).hasClass( 'home' ) ) {
			$( '.carousel' ).carousel( 'pause' );
			setTimeout( function() {
				this.homeAnim();
			}, 1000);
		} else if ( $( 'body' ).hasClass( 'pathworking' ) ) {
			$( '.diagram .center' ).on( 'mouseover', function () {
				$( '.diagram .glyphicon' ).addClass( 'infinite' );
			}).on( 'mouseout', function () {
				$( '.diagram .glyphicon' ).removeClass( 'infinite' );
			} );
		}
	});

	this.homeAnim = function () {
		$( 'body.home .logo img' ).animate({
			opacity: 1.0,
			height: '155px'
		}, 5000, function() {
			$( 'body.home > div' ).animate({
				opacity: 1.0
			}, 2000, function() {
				$('.carousel').carousel('cycle');
			});
		});
	};

	$( '#guideDoor' ).on( 'click', function( e ) {
		e.preventDefault();
// 		console.log ('wtf');
		$( '#appointmentModal' ).modal( 'show' );

	});

	$( '[ data-toggle="popover" ]' ).popover();
})();

