handleAccountPage = () => {
  console.log('loaded!');
  console.log(localStorage.getItem('username'));

  referenceCount = 0;

  $.ajax({
    type: 'POST',
    url: '/data/current/agendas',
    data: {
      username: localStorage.getItem('username')
    },
    success: function(res) {
      console.log(res);
      const counter = res.amount;

      if (counter === 0) {
        $('.agendaContainer').append(
          `<h2 class="empty">You have no Daytrips currently.</h2>`
        );
      }

      let first = 0;
      let second = 0;
      let third = 0;

      for (let i = 0; i < counter; i++) {
        let spending;
        let events;
        let activity;
        if (res.agendas[referenceCount].info.priceOfTrip === '1, 2') {
          spending = '<span class="first">save</span> some money. ';
          first += 1;
        } else if (res.agendas[referenceCount].info.priceOfTrip === '2, 3') {
          spending = '<span class="second">spend</span> a little money. ';
          second += 1;
        } else if (res.agendas[referenceCount].info.priceOfTrip === '3, 4') {
          spending = '<span class="third">splurge</span> and treat yourself, ';
          third += 1;
        }

        if (res.agendas[referenceCount].info.lengthOfTrip === '3') {
          if (res.agendas[referenceCount].info.priceOfTrip === '1, 2') {
            events =
              'Considering you only went to <span class=first>3 locations</span>, you probably saved a good bit of cash!';
            first += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '2, 3') {
            events =
              'You ended up going to <span class="first">3 locations</span>, which likely balanced well with your spending.';
            first += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '3, 4') {
            events =
              'which was a great pairing with only <span class="first">3 locations</span>.';
            first += 1;
          }
        } else if (res.agendas[referenceCount].info.lengthOfTrip === '5') {
          if (res.agendas[referenceCount].info.priceOfTrip === '1, 2') {
            events =
              'This decision likely allowed you to do a little more at the <span class="second">5 locations</span> you visited.';
            second += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '2, 3') {
            events =
              'You also decided to go to <span class="second">5 locations</span>, meaning you really decided to spend!';
            second += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '3, 4') {
            events =
              'and you must have, considering you to <span class="second">5 locations</span>!';
            second += 1;
          }
        } else if (res.agendas[referenceCount].info.lengthOfTrip === '7') {
          if (res.agendas[referenceCount].info.priceOfTrip === '1, 2') {
            events =
              'I can only assume you knew what you were getting into though, you went to <span class="third">7 locations</span>!';
            third += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '2, 3') {
            events =
              'Which means you must <em>have</em> a little money considering you went to <span class="third">7 locations</span>.';
            third += 1;
          } else if (res.agendas[referenceCount].info.priceOfTrip === '3, 4') {
            events =
              'Which makes you royalty considering you went to <span class="third">7 different locations</span>';
            third += 1;
          }
        }

        if (res.agendas[referenceCount].info.activityOfTrip === 'Balance') {
          activity =
            'You chose to pursue a <span class="third">Balance</span> of activities, combining both active life and culture.';
          third += 1;
        } else if (
          res.agendas[referenceCount].info.activityOfTrip === 'Active Life'
        ) {
          activity =
            'You chose to partcipate in <span class="second">active</span> events which range from activities that take place outdoors to ones that just get you moving.';
          second += 1;
        } else if (
          res.agendas[referenceCount].info.activityOfTrip ===
          'Arts & Entertainment'
        ) {
          activity =
            'For activites, you decided to pursue <span class="first">cultured</span> events. This could range from concerts or movies to local events like haunted houses or escape rooms.';
          first += 1;
        }
        let AGENDA_CARD = `
          <h2 class="itemTitle">${res.agendas[referenceCount].info.name}</h2>
          <div class="agendaCard item${referenceCount}">
            <div class="itemInfo">
            <p>On this trip, you decided to ${spending} ${events} ${activity}</p>
            <p class="tag">${referenceCount}</p>
            </div>
          </div>`;
        $('.agendaContainer').append(AGENDA_CARD);
        console.log(first);
        console.log(second);
        console.log(third);
        if (first > second && first > third) {
          $(`.item${referenceCount}`).addClass('firstDominant');
          console.log('first wins');
        } else if (second > first && second > third) {
          $(`.item${referenceCount}`).addClass('secondDominant');
          console.log('second wins');
        } else if (third > first && third > second) {
          $(`.item${referenceCount}`).addClass('thirdDominant');
          console.log('third wins!');
        } else if (first === second || first == third || second == third) {
          $(`.item${referenceCount}`).addClass('equal');
          console.log('first and second tie!');
        }
        first = 0;
        second = 0;
        third = 0;
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
