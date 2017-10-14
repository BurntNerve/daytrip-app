handleAccountPage = () => {
  console.log('loaded!');

  referenceCount = 0;

  $.ajax({
    type: 'GET',
    url: '/data/current/agendas',
    success: function(res) {
      console.log(res);
      const counter = res.amount;

      if (counter === 0) {
        $('.agendaContainer').append(
          `<h2 class="empty">You have no Daytrips currently.</h2>`
        );
      }

      for (let i = 0; i < counter; i++) {
        let AGENDA_CARD = `
          <h2 class="itemTitle">${res.agendas[referenceCount].info.name}</h2>
          <div class="agendaCard item">
          <div class="pictureDisplay">
            <img src="" alt="" class="picture">
            <div class="itemOneNoPicture noPicture">

            </div>
          </div>
          <div class="itemInfo">
            <h3 class="itemPriceRange">${res.agendas[referenceCount].info
              .priceOfTrip}</h3>
            <h4 class="itemActivity">${res.agendas[referenceCount].info
              .activityOfTrip}</h4>
            <h4 class="itemLength">${res.agendas[referenceCount].info
              .lengthOfTrip}</h4>
            <h4 class="itemOneThirdAddress itemAddress"></h4>
            <h4 class="itemOnePhone itemPhone"></h4>
            <h4 class="itemOneOpen itemOpen"></h4>
            <p class="tag">${referenceCount}</p>
          </div>
        </div>`;
        $('.agendaContainer').append(AGENDA_CARD);
        referenceCount += 1;
      }

      $('.agendaCard').on('click', function() {
        const agendaNumber = $(this)
          .find('.tag')
          .text();
        const newOptions = {
          price: res.agendas[agendaNumber].info.priceOfTrip,
          length: res.agendas[agendaNumber].info.lengthOfTrip,
          activity: res.agendas[agendaNumber].info.activityOfTrip,
          location: res.agendas[agendaNumber].info.locationOfTrip
        };
        $.ajax({
          type: 'POST',
          url: '/data/saved',
          data: res.agendas[agendaNumber],
          success: function() {
            console.log('weeeee');
            location.assign('../html/saved.html');
          }
        });
      });
    }
  });
};

$(() => {
  handleAccountPage();
});
