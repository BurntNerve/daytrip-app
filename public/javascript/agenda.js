handleAgendaPage = () => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  $.ajax({
    type: 'GET',
    url: '/data/options',
    success: function(options) {
      const agendaOptions = {
        priceOfTrip: options.price,
        lengthOfTrip: Number(options.length),
        activityOfTrip: options.activity,
        locationOfTrip: options.location
      };

      let searchTerms = {
        term: 'restaurants',
        location: agendaOptions.locationOfTrip,
        price: agendaOptions.priceOfTrip,
        limit: 20
      };

      let activity = {
        term: agendaOptions.activityOfTrip,
        location: agendaOptions.locationOfTrip,
        price: agendaOptions.priceOfTrip,
        limit: 20
      };

      handleApiCalls = () => {
        //This bit if for the Scout Trip and all the possible choices the user can make.
        console.log('called!');
        console.log(agendaOptions);
        if (agendaOptions.lengthOfTrip === 3) {
          $.ajax({
            type: 'POST',
            url: '/data',
            data: searchTerms,
            success: function(food) {
              const numberOfFood = food.length - 1;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }

              if (
                agendaOptions.activityOfTrip === 'Active Life' ||
                agendaOptions.activityOfTrip === 'Arts & Entertainment'
              ) {
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(event) {
                    const numberOfEvent = event.length - 2;
                    shuffleArray(event);
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    food.splice(0, 0, event[0]);
                    food.splice(2, 0, event[1]);

                    const agenda = food.reduce(function(acc, cur, i) {
                      acc[i] = cur;
                      return acc;
                    }, {});

                    console.log(agenda);

                    $.ajax({
                      type: 'POST',
                      url: '/data/agenda',
                      data: agenda
                    });
                  }
                });
              } else if (agendaOptions.activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(partialAgenda) {
                    let numberOfEvent = partialAgenda.length - 1;
                    shuffleArray(partialAgenda);
                    for (let i = 0; i < numberOfEvent; i++) {
                      partialAgenda.splice(partialAgenda.length - 1, 1);
                    }
                    partialAgenda.splice(1, 0, food[0]);

                    activity.term = 'Arts & Entertainment';
                    $.ajax({
                      type: 'POST',
                      url: '/data',
                      data: activity,
                      success: function(event) {
                        let numberOfEvent = event.length - 1;
                        shuffleArray(event);
                        for (let i = 0; i < numberOfEvent; i++) {
                          event.splice(event.length - 1, 1);
                        }
                        partialAgenda.splice(2, 0, event[0]);

                        const agenda = partialAgenda.reduce(function(
                          acc,
                          cur,
                          i
                        ) {
                          acc[i] = cur;
                          return acc;
                        }, {});

                        console.log(agenda);
                        $.ajax({
                          type: 'POST',
                          url: '/data/agenda',
                          data: agenda
                        });
                      }
                    });
                  }
                });
              }
            }
          });
        } else if (agendaOptions.lengthOfTrip === 5) {
          $.ajax({
            type: 'POST',
            url: '/data',
            data: searchTerms,
            success: function(food) {
              const numberOfFood = food.length - 2;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }

              if (
                agendaOptions.activityOfTrip === 'Active Life' ||
                agendaOptions.activityOfTrip === 'Arts & Entertainment'
              ) {
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(event) {
                    const numberOfEvent = event.length - 3;
                    shuffleArray(event);
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    food.splice(0, 0, event[0]);
                    food.splice(2, 0, event[1]);
                    food.splice(3, 0, event[2]);

                    const agenda = food.reduce(function(acc, cur, i) {
                      acc[i] = cur;
                      return acc;
                    }, {});

                    console.log(agenda);

                    $.ajax({
                      type: 'POST',
                      url: '/data/agenda',
                      data: agenda
                    });
                  }
                });
              } else if (agendaOptions.activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(partialAgenda) {
                    let numberOfEvent = partialAgenda.length - 1;
                    shuffleArray(partialAgenda);
                    for (let i = 0; i < numberOfEvent; i++) {
                      partialAgenda.splice(partialAgenda.length - 1, 1);
                    }
                    partialAgenda.splice(1, 0, food[0]);
                    partialAgenda.splice(2, 0, food[1]);
                    activity.term = 'Arts & Entertainment';

                    $.ajax({
                      type: 'POST',
                      url: '/data',
                      data: activity,
                      success: function(event) {
                        let numberOfEvent = event.length - 2;
                        shuffleArray(event);
                        for (let i = 0; i < numberOfEvent; i++) {
                          event.splice(event.length - 1, 1);
                        }
                        event.splice(2, 0, partialAgenda[2]);
                        event.splice(0, 0, partialAgenda[0]);
                        event.splice(1, 0, partialAgenda[1]);
                        const agenda = event.reduce(function(acc, cur, i) {
                          acc[i] = cur;
                          return acc;
                        }, {});

                        console.log(agenda);
                        $.ajax({
                          type: 'POST',
                          url: '/data/agenda',
                          data: agenda,
                          dataType: 'json'
                        });
                      }
                    });
                  }
                });
              }
            }
          });
        } else if (agendaOptions.lengthOfTrip === 7) {
          $.ajax({
            type: 'POST',
            url: '/data',
            data: searchTerms,
            success: function(food) {
              const numberOfFood = food.length - 3;
              shuffleArray(food);
              for (let i = 0; i < numberOfFood; i++) {
                food.splice(food.length - 1, 1);
              }
              if (
                agendaOptions.activityOfTrip === 'Active Life' ||
                agendaOptions.activityOfTrip === 'Arts & Entertainment'
              ) {
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(event) {
                    const numberOfEvent = event.length - 4;
                    shuffleArray(event);
                    for (let i = 0; i < numberOfEvent; i++) {
                      event.splice(event.length - 1, 1);
                    }
                    food.splice(1, 0, event[0]);
                    food.splice(2, 0, event[1]);
                    food.splice(4, 0, event[2]);
                    food.splice(5, 0, event[3]);

                    const agenda = food.reduce(function(acc, cur, i) {
                      acc[i] = cur;
                      return acc;
                    }, {});

                    console.log(agenda);

                    $.ajax({
                      type: 'POST',
                      url: '/data/agenda',
                      data: agenda
                    });
                  }
                });
              } else if (agendaOptions.activityOfTrip === 'Balance') {
                activity.term = 'Active Life';
                $.ajax({
                  type: 'POST',
                  url: '/data',
                  data: activity,
                  success: function(partialAgenda) {
                    let numberOfEvent = partialAgenda.length - 2;
                    shuffleArray(partialAgenda);
                    for (let i = 0; i < numberOfEvent; i++) {
                      partialAgenda.splice(partialAgenda.length - 1, 1);
                    }
                    partialAgenda.splice(0, 0, food[0]);
                    partialAgenda.splice(3, 0, food[1]);
                    partialAgenda.splice(4, 0, food[2]);

                    activity.term = 'Arts & Entertainment';
                    $.ajax({
                      type: 'POST',
                      url: '/data',
                      data: activity,
                      success: function(event) {
                        let numberOfEvent = event.length - 2;
                        shuffleArray(event);
                        for (let i = 0; i < numberOfEvent; i++) {
                          event.splice(event.length - 1, 1);
                        }
                        partialAgenda.splice(4, 0, event[0]);
                        partialAgenda.splice(5, 0, event[1]);
                        console.log(partialAgenda);
                      }
                    });
                  }
                });
              }
            }
          });
        }
      };
      handleApiCalls();
    }
  });
};

$(() => {
  handleAgendaPage();
});
