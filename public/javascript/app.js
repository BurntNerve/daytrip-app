handleYelp = () => {
  let lengthOfTrip;
  let priceOfTrip;
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
  handlePriceChoice();
  handleLengthChoice();
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
  const searchTerms = {
    //term: prompt('What do you want to search for?'),
    location: 'Haymarket', //prompt('Where do you want to go?'),
    limit: 15
  };
  const activity = {
    term: 'Things to do',
    location: searchTerms.location,
    limit: 15
  };
  let foods;
  console.log(searchTerms);
  $.post('/data', searchTerms, data => {}).then(_foods => {
    foods = _foods;
    foodsCounter = foods.length - 4;
    for (let i = 0; i < foodsCounter; i++) {
      foods.splice(Math.floor(Math.random() * foods.length), 1);
      console.log(foods);
    }
    $.post('/data', activity, data => {
      //console.log(data);
      const agenda = data.concat(foods);
      //console.log(agenda);
    });
  });
};

$(() => {
  handleYelp();
  $('#fullpage').fullpage();
});
