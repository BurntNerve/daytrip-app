handleYelpSearch = () => {
  console.log('searching');
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
});
