handleYelp = () => {
  let lengthOfTrip;
  let priceOfTrip;
  let activityOfTrip;
  let locationOfTrip;
  let loggedOut;

  //Function with event listener for when user clicks 'Log Out' button.
  handleLogOut = () => {
    $('.logOut').on('click', function() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');

      $('.accountLink').text('');
      $('.accountLink').css('display', 'none');
      $('.login').css('display', 'block');
      $('.logOut').css('display', 'none');
      $('.signUp').css('background-color', 'white');
      $('.signUp').css('color', '#333');
      $('.signUp').css('border', '1.5px solid #333');
      $('.signUp').text('Sign Up');
      $('.logInUsername').val('');
      $('.logInPassword').val('');
      handleSignUp();
    });
  };

  //Coniditional loop to keep user logged in if they leave the page and haven't logged out.
  if (localStorage.getItem('username') !== null) {
    $('.accountLink').text(localStorage.getItem('username'));
    $('.accountLink').css('display', 'inline-block');
    $('.login').css('display', 'none');
    $('.logOut').css('display', 'block');

    handleLogOut();
  }

  //Function with event listener for when user clicks 'Sign Up' button.
  handleSignUp = () => {
    $('.signUp').on('click', function() {
      $('.signUpPage').slideDown('slow');
      $('.signUpConfirm').on('click', function() {
        if ($('.username').val() === '') {
          $('.username').attr('placeholder', 'Enter a username.');
        } else if ($('.password').val() === '') {
          $('.password').attr('placeholder', 'Enter a password.');
        } else if ($('.confirmPassword').val() === '') {
          $('.confirmPassword').attr('placeholder', 'Confirm your password.');
        } else if ($('.confirmPassword').val() !== $('.password').val()) {
          $('.confirmPassword').val('');
          $('.confirmPassword').attr('placeholder', 'Must match.');
        } else {
          $.ajax({
            type: 'POST',
            url: '/users',
            data: {
              username: $('.username').val(),
              password: $('.password').val()
            },
            success: function(response) {
              $.fn.fullpage.moveTo(2);
              localStorage.setItem('username', $('.username').val());
              $('.login').css('display', 'none');
              $('.logOut').css('display', 'block');
              $('.signUp').css('background-color', '#2fd3ff');
              $('.signUp').css('color', 'white');
              $('.signUp').css('border', '0');
              $('.signUp').text('Signed Up');
              $('.accountLink').text($('.username').val());
              $('.accountLink').css('display', 'inline-block');
              $('.signUpPage').slideUp('slow');
              $('.username').val('');
              $('.password').val('');
              $('.confirmPassword').val('');
              $('.accountLink').unbind('click');
            }
          });
        }
      });
    });
  };

  //Function with event listener for when user clicks 'Log In' button.
  handleLogIn = () => {
    $('.login').on('click', function() {
      $('.logInPage').slideDown('slow');
      $('.logInConfirm').on('click', function() {
        if ($('.logInUsername').val() === '') {
          $('.logInUsername').attr('placeholder', 'Enter a username.');
        } else if ($('.logInPassword').val() === '') {
          $('.logInPassword').attr('placeholder', 'Enter a password.');
        } else {
          $.ajax({
            type: 'POST',
            url: '/auth/login',
            headers: {
              Authorization:
                'Basic ' +
                btoa(
                  $('.logInUsername').val() + ':' + $('.logInPassword').val()
                )
            },
            success: function(response) {
              const AuthToken = response.authToken;
              localStorage.setItem('token', AuthToken);
              localStorage.setItem('username', $('.logInUsername').val());
              $.ajax({
                type: 'POST',
                url: '/auth/refresh',
                headers: {
                  Authorization: 'Bearer ' + AuthToken
                },
                success: function(success) {
                  $.fn.fullpage.moveTo(2);
                  $('.login').css('display', 'none');
                  $('.logOut').css('display', 'block');
                  $('.accountLink').text($('.logInUsername').val());
                  $('.accountLink').css('display', 'inline-block');
                  $('.logInPage').slideUp('slow');
                  $('.accountLink').unbind('click');
                }
              });
            }
          });
        }
      });
    });
  };

  $('.planLink').bind('click', function(e) {
    e.preventDefault();
  });
  $('.currentLocationPlan').bind('click', function(e) {
    e.preventDefault();
  });

  $('.secondPage').on('click', function(event) {
    $.fn.fullpage.moveTo(2);
  });

  // Function used when user clicks 'Get Current Location' option.
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  function showPosition(position) {
    const currentLocation =
      position.coords.latitude + ' ' + position.coords.longitude;
    locationOfTrip = currentLocation;
    const options = {
      price: priceOfTrip,
      length: lengthOfTrip,
      activity: activityOfTrip,
      location: locationOfTrip
    };
    $.ajax({
      type: 'POST',
      url: '/data/options',
      data: options,
      success: function() {
        location.assign('../html/agenda.html');
      }
    });
  }

  //Function with event listener that assigns user's choice to 'priceOfTrip' variable for later use.
  handlePriceChoice = () => {
    $('.js-priceChoice').on('click', function(event) {
      $.fn.fullpage.moveTo(3);
      $('.js-priceChoice').removeClass('picked');
      $(this).addClass('picked');
      priceOfTrip = $(this)
        .find('h1')
        .text();
      if (priceOfTrip === 'Save') {
        priceOfTrip = '1, 2';
      } else if (priceOfTrip === 'Spend') {
        priceOfTrip = '2, 3';
      } else if (priceOfTrip === 'Splurge') {
        priceOfTrip = '3, 4';
      }
    });
  };

  //Function with event listener that assigns user's choice to 'lengthOfTrip' variable for later use.
  handleLengthChoice = () => {
    $('.js-lengthChoice').on('click', function(event) {
      $.fn.fullpage.moveTo(4);
      $('.js-lengthChoice').removeClass('picked');
      $(this).addClass('picked');
      lengthOfTrip = $(this)
        .find('h1')
        .text();
      if (lengthOfTrip === 'Scout') {
        lengthOfTrip = 3;
      } else if (lengthOfTrip === 'Pioneer') {
        lengthOfTrip = 5;
      } else if (lengthOfTrip === 'Settler') {
        lengthOfTrip = 7;
      }
    });
  };

  //Function with event listener that assigns user's choice to 'activityOfTrip' variable for later use.
  handleActivityChoice = () => {
    $('.js-activityChoice').on('click', function(event) {
      $.fn.fullpage.moveTo(5);
      $('.js-activityChoice').removeClass('picked');
      $(this).addClass('picked');
      activityOfTrip = $(this)
        .find('h1')
        .text();
      if (activityOfTrip === 'Culture') {
        activityOfTrip = 'Arts & Entertainment';
      } else if (activityOfTrip === 'Active') {
        activityOfTrip = 'Active Life';
      }
    });
  };

  //Function with event listener that assigns user's choice to 'locationOfTrip' variable for later use.
  handleLocationPlan = () => {
    $('.locationSearchSpecial').keyup(function(event) {
      if (event.keyCode == 13) {
        if ($('.locationSearchSpecial').val() === '') {
          $('.locationSearchSpecial').attr('placeholder', 'Enter a location.');
        } else if (priceOfTrip === undefined) {
          $.fn.fullpage.moveTo(2);
        } else if (lengthOfTrip === undefined) {
          $.fn.fullpage.moveTo(3);
        } else if (activityOfTrip === undefined) {
          $.fn.fullpage.moveTo(4);
        } else {
          locationOfTrip = $('.locationSearchSpecial').val();

          const options = {
            price: priceOfTrip,
            length: lengthOfTrip,
            activity: activityOfTrip,
            location: locationOfTrip
          };

          $.ajax({
            type: 'POST',
            url: '/data/options',
            data: options,
            success: function() {
              location.assign('../html/agenda.html');
            }
          });
        }
      }
    });

    //Event listener with conditional logic to send user back to any missed choices.
    $('.js-planTrip').on('click', function() {
      if ($('.locationSearchSpecial').val() === '') {
        $('.locationSearchSpecial').attr('placeholder', 'Enter a location.');
      } else if (priceOfTrip === undefined) {
        $.fn.fullpage.moveTo(2);
      } else if (lengthOfTrip === undefined) {
        $.fn.fullpage.moveTo(3);
      } else if (activityOfTrip === undefined) {
        $.fn.fullpage.moveTo(4);
      } else {
        locationOfTrip = $('.locationSearchSpecial').val();

        const options = {
          price: priceOfTrip,
          length: lengthOfTrip,
          activity: activityOfTrip,
          location: locationOfTrip
        };
        $.ajax({ type: 'POST', url: '/data/options', data: options });
        $('.planLink').unbind('click');
      }
    });
  };

  //Function with event listener to acquire user's current location.
  handleCurrentLocation = () => {
    $('.js-currentLocation').on('click', function(event) {
      if (priceOfTrip === undefined) {
        $.fn.fullpage.moveTo(2);
      } else if (lengthOfTrip === undefined) {
        $.fn.fullpage.moveTo(3);
      } else if (activityOfTrip === undefined) {
        $.fn.fullpage.moveTo(4);
      } else {
        getLocation();
      }
    });
  };
  handleLogIn();
  handleLogOut();
  handleSignUp();
  handlePriceChoice();
  handleLengthChoice();
  handleActivityChoice();
  handleLocationPlan();
  handleCurrentLocation();
};

$(() => {
  handleYelp();
  //jQuery plugin for fullpage scrolling.
  $('#fullpage').fullpage({
    anchors: ['section1', 'section2', 'section3', 'section4']
  });

  //jQuery plugin for auto-typing text on landing page.
  $('.typedText').typeIt({
    strings: [
      'A romantic getaway with that special someone.',
      'The time of your life with some friends.',
      'The memory that makes you feel warm inside.'
    ],
    speed: 100,
    deleteSpeed: 30,
    autoStart: true,
    lifeLike: true,
    cursor: false,
    breakLines: false,
    deleteDelay: 4000,
    loop: true
  });
});
