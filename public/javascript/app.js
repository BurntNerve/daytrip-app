handleYelpSearch = () => {
  console.log('searching');
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
  handleYelpSearch();
  $('#fullpage').fullpage();
});
