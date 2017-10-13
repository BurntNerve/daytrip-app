handleYelp = () => {
  let lengthOfTrip;
  let priceOfTrip;
  let activityOfTrip;
  let locationOfTrip;

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
              console.log(response);
              $.fn.fullpage.moveTo(2);

              $('.signUp').css('background-color', '#2fd3ff');
              $('.signUp').css('color', 'white');
              $('.signUp').css('border', '0');
              $('.signUp').text('Signed Up');
              $('.login').css('background-color', '#f26060');
              $('.login').css('color', 'white');
              $('.login').css('border', '0');
              $('.login').text('Logged In');
              $('.accountLink').text($('.username').val());
              $('.accountLink').css('display', 'inline-block');
              $('.signUpPage').slideUp('slow');
              $('.username').val('');
              $('.password').val('');
              $('.confirmPassword').val('');
            },
            error: function(err) {
              console.log(err);
            }
          });
        }
      });
    });
  };

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
              $.ajax({
                type: 'POST',
                url: '/auth/refresh',
                headers: {
                  Authorization: 'Bearer ' + AuthToken
                },
                success: function(success) {
                  $.fn.fullpage.moveTo(2);
                  $('.login').css('background-color', '#f26060');
                  $('.login').css('color', 'white');
                  $('.login').css('border', '0');
                  $('.login').text('Logged In');
                  $('.accountLink').text($('.logInUsername').val());
                  $('.accountLink').css('display', 'inline-block');
                  $('.logInPage').slideUp('slow');
                  $('.username').val('');
                  $('.password').val('');
                },
                error: function(err) {
                  console.log(err);
                }
              });
            },
            error: function(err) {
              console.log(err);
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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(locationOfTrip);
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
      console.log(priceOfTrip);
    });
  };

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
      console.log(lengthOfTrip);
    });
  };

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
      console.log(activityOfTrip);
    });
  };

  handleLocationPlan = () => {
    $('.locationSearch').keyup(function(event) {
      if (event.keyCode == 13) {
        if ($('.locationSearch').val() === '') {
          $('.locationSearch').attr('placeholder', 'Enter a location.');
        } else if (priceOfTrip === undefined) {
          $.fn.fullpage.moveTo(2);
        } else if (lengthOfTrip === undefined) {
          $.fn.fullpage.moveTo(3);
        } else if (activityOfTrip === undefined) {
          $.fn.fullpage.moveTo(4);
        } else {
          locationOfTrip = $('.locationSearch').val();
          console.log(locationOfTrip);

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
    $('.js-planTrip').on('click', function() {
      if ($('.locationSearch').val() === '') {
        $('.locationSearch').attr('placeholder', 'Enter a location.');
      } else if (priceOfTrip === undefined) {
        $.fn.fullpage.moveTo(2);
      } else if (lengthOfTrip === undefined) {
        $.fn.fullpage.moveTo(3);
      } else if (activityOfTrip === undefined) {
        $.fn.fullpage.moveTo(4);
      } else {
        locationOfTrip = $('.locationSearch').val();
        console.log(locationOfTrip);

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
  handleSignUp();
  handleLogIn();
  handlePriceChoice();
  handleLengthChoice();
  handleActivityChoice();
  handleLocationPlan();
  handleCurrentLocation();
};

$(() => {
  handleYelp();
  $('#fullpage').fullpage({
    anchors: ['section1', 'section2', 'section3', 'section4']
  });
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
