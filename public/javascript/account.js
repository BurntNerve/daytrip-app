handleAccountPage = () => {
  console.log('loaded!');

  $.ajax({
    type: 'GET',
    url: '/data/current/agendas',
    success: function(res) {
      console.log(res);
    }
  });
};

$(() => {
  handleAccountPage();
});
