handleYelp = () => {
  let lengthOfTrip;
  let priceOfTrip;
  let activityOfTrip;
  let locationOfTrip;

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handlePriceChoice = () => {
    $('.js-priceChoice').on('click', function(event) {
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

        let searchTerms = {
          term: 'restaurants',
          location: locationOfTrip,
          price: priceOfTrip,
          limit: 20
        };

        let activity = {
          term: activityOfTrip,
          location: locationOfTrip,
          price: priceOfTrip,
          limit: 20
        };

        //Need to make different amount of calls depending on whether the user chose Culture/Active or Balance.
        //Calls need to be for different amounts of things depending on trip order.

        handleApiCalls = () => {
          //This bit if for the Scout Trip and all the possible choices the user can make.
          if (lengthOfTrip === 3) {
            $.post('/data', searchTerms, food => {
              const numberOfFood = food.length - 1;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }
              return food;
            }).then(_food => {
              if (activityOfTrip === 'Active Life') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 2;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(0, 0, event[0]);
                  _food.splice(2, 0, event[1]);

                  const agenda = _food;
                  console.log(_food);
                });
              } else if (activityOfTrip === 'Arts & Entertainment') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 2;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(0, 0, event[0]);
                  _food.splice(2, 0, event[1]);

                  const agenda = _food;
                  console.log(agenda);
                });
              } else if (activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.post('/data', activity, event => {
                  let numberOfEvent = event.length - 1;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  event.splice(1, 0, _food[0]);
                  return event;
                }).then(partialAgenda => {
                  activity.term = 'Arts & Entertainment';
                  $.post('/data', activity, event => {
                    let numberOfEvent = event.length - 1;
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    partialAgenda.splice(2, 0, event[0]);
                    console.log(partialAgenda);
                  });
                });
              }
            });
          } else if (lengthOfTrip === 5) {
            $.post('/data', searchTerms, food => {
              const numberOfFood = food.length - 2;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }
              return food;
            }).then(_food => {
              food = _food;
              if (activityOfTrip === 'Active Life') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 3;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(0, 0, event[0]);
                  _food.splice(2, 0, event[1]);
                  _food.splice(3, 0, event[2]);

                  const agenda = _food;
                  console.log(_food);
                });
              } else if (activityOfTrip === 'Arts & Entertainment') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 3;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(0, 0, event[0]);
                  _food.splice(2, 0, event[1]);
                  _food.splice(3, 0, event[2]);

                  const agenda = _food;
                  console.log(agenda);
                });
              } else if (activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.post('/data', activity, event => {
                  let numberOfEvent = event.length - 1;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  event.splice(1, 0, _food[0]);
                  event.splice(2, 0, _food[1]);
                  return _food;
                }).then(partialAgenda => {
                  activity.term = 'Arts & Entertainment';
                  $.post('/data', activity, event => {
                    let numberOfEvent = event.length - 2;
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    partialAgenda.splice(2, 0, event[0]);
                    partialAgenda.splice(3, 0, event[1]);
                    console.log(partialAgenda);
                  });
                });
              }
            });
          } else if (lengthOfTrip === 7) {
            $.post('/data', searchTerms, food => {
              const numberOfFood = food.length - 3;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }
              return food;
            }).then(_food => {
              food = _food;
              if (activityOfTrip === 'Active Life') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 4;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(1, 0, event[0]);
                  _food.splice(2, 0, event[1]);
                  _food.splice(4, 0, event[2]);
                  _food.splice(5, 0, event[3]);

                  const agenda = _food;
                  console.log(agenda);
                });
              } else if (activityOfTrip === 'Arts & Entertainment') {
                $.post('/data', activity, event => {
                  const numberOfEvent = event.length - 4;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  _food.splice(1, 0, event[0]);
                  _food.splice(2, 0, event[1]);
                  _food.splice(4, 0, event[2]);
                  _food.splice(5, 0, event[3]);

                  const agenda = _food;
                  console.log(agenda);
                });
              } else if (activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.post('/data', activity, event => {
                  let numberOfEvent = event.length - 2;
                  shuffleArray(event);
                  for (let i = 0; i < numberOfEvent; i++) {
                    event.splice(event.length - 1, 1);
                  }
                  event.splice(0, 0, _food[0]);
                  event.splice(3, 0, _food[1]);
                  event.splice(4, 0, _food[2]);
                  return _food;
                }).then(partialAgenda => {
                  activity.term = 'Arts & Entertainment';
                  $.post('/data', activity, event => {
                    let numberOfEvent = event.length - 2;
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    partialAgenda.splice(4, 0, event[0]);
                    partialAgenda.splice(5, 0, event[1]);
                    console.log(partialAgenda);
                  });
                });
              }
            });
          }
        };

        /*$.post('/data', searchTerms, data => {}).then(_foods => {
                  foods = _foods;
                  console.log(foods);
                  foodsCounter = foods.length - 4;
                  shuffleArray(foods);
                  console.log(foods);
                  for (let i = 0; i < foodsCounter; i++) {
                    console.log(foods);
                    foods.splice(foods.length - 1, 1);
                  }
                  $.post('/data', activity, data => {
                    //console.log(data);
                    const agenda = data.concat(foods);
                    //console.log(agenda);
                  });
                });*/
        handleApiCalls();
      }
    });
  };
  handlePriceChoice();
  handleLengthChoice();
  handleActivityChoice();
  handleLocationPlan();
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
    deleteDelay: 1500,
    loop: true
  });
});
