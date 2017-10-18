handleSaveLoad = () => {
  const culture = '#56daff';
  const active = '#63ff82';
  const food = '#f26060';

  formatPhoneNumber = phoneNumber => {
    if (phoneNumber === '') {
      return 'Phone number not provided.';
    }
    let splitNumber = phoneNumber.split('');
    splitNumber.shift();
    splitNumber.shift();
    if (splitNumber === '[]') {
      return 'Phone number not provided.';
    }
    splitNumber.splice(0, 0, '(');
    splitNumber.splice(4, 0, ')');
    splitNumber.splice(5, 0, '-');
    splitNumber.splice(9, 0, '-');
    const newNumber = splitNumber.join('');
    return newNumber;
  };

  renderInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/data/saved',
      success: function(tempAgenda) {
        $('.agendaTitle').text(tempAgenda.info.name);
        handleSaveChanges = () => {
          $('.saveChanges').on('click', function() {
            const changes = {
              id: tempAgenda.info.id,
              title: $('.agendaTitle').text(),
              user: localStorage.getItem('username')
            };
            $.ajax({
              type: 'POST',
              url: '/data/saved/changes',
              data: changes,
              success: function(res) {}
            });
          });
        };
        handleSaveChanges();
        handleDelete = () => {
          $('.deleteAgenda').on('click', function() {
            $.ajax({
              type: 'POST',
              url: '/data/saved/delete',
              data: {
                id: tempAgenda.info.id,
                user: localStorage.getItem('username')
              },
              success: function(res) {
                location.assign('../html/account.html');
              }
            });
          });
        };
        handleDelete();
        agendaOptions = tempAgenda.info;

        if (agendaOptions.lengthOfTrip >= 3) {
          $('.scoutItem').css('display', 'block');

          $('.itemNameOne').text(tempAgenda['0'].name);
          if (tempAgenda['0'].image_url === '') {
            $('.itemOnePicture').css('display', 'none');
            $('.itemOneNoPicture').css('display', 'block');
          } else {
            $('.itemOnePicture').attr('src', tempAgenda['0'].image_url);
          }

          $('.itemOneGenre').text(tempAgenda['0'].categories[0].title);
          $('.itemOneFirstAddress').text(
            tempAgenda['0'].location.display_address[0]
          );
          $('.itemOneSecondAddress').text(
            tempAgenda['0'].location.display_address[1]
          );
          $('.itemOneThirdAddress').text(
            tempAgenda['0'].location.display_address[2]
          );
          $('.itemOnePhone').text(formatPhoneNumber(tempAgenda['0'].phone));
          if (tempAgenda['0'].is_closed === 'false') {
            $('.itemOneOpen').text('Currently Open');
          } else {
            $('.itemOneOpen').text('Currently Closed');
          }

          $('.itemNameTwo').text(tempAgenda['1'].name);
          if (tempAgenda['1'].image_url === '') {
            $('.itemTwoPicture').css('display', 'none');
            $('.itemTwoNoPicture').css('display', 'block');
          } else {
            $('.itemTwoPicture').attr('src', tempAgenda['1'].image_url);
          }
          $('.itemTwoGenre').text(tempAgenda['1'].categories[0].title);
          $('.itemTwoFirstAddress').text(
            tempAgenda['1'].location.display_address[0]
          );
          $('.itemTwoSecondAddress').text(
            tempAgenda['1'].location.display_address[1]
          );
          $('.itemTwoThirdAddress').text(
            tempAgenda['1'].location.display_address[2]
          );
          $('.itemTwoPhone').text(formatPhoneNumber(tempAgenda['1'].phone));
          if (tempAgenda['1'].is_closed === 'false') {
            $('.itemTwoOpen').text('Currently Open');
          } else {
            $('.itemTwoOpen').text('Currently Closed');
          }

          $('.itemNameThree').text(tempAgenda['2'].name);
          if (tempAgenda['2'].image_url === '') {
            $('.itemThreePicture').css('display', 'none');
            $('.itemThreeNoPicture').css('display', 'block');
          } else {
            $('.itemThreePicture').attr('src', tempAgenda['2'].image_url);
          }

          $('.itemThreeGenre').text(tempAgenda['2'].categories[0].title);
          $('.itemThreeFirstAddress').text(
            tempAgenda['2'].location.display_address[0]
          );
          $('.itemThreeSecondAddress').text(
            tempAgenda['2'].location.display_address[1]
          );
          $('.itemThreeThirdAddress').text(
            tempAgenda['2'].location.display_address[2]
          );
          $('.itemThreePhone').text(formatPhoneNumber(tempAgenda['2'].phone));
          if (tempAgenda['2'].is_closed === 'false') {
            $('.itemThreeOpen').text('Currently Open');
          } else {
            $('.itemThreeOpen').text('Currently Closed');
          }

          $('.itemTwo').css('background-color', food);
          $('.itemTwoNoPicture h2').css('color', food);

          if (agendaOptions.activityOfTrip === 'Arts & Entertainment') {
            $('.itemOne').css('background-color', culture);
            $('.itemOneNoPicture h2').css('color', culture);
            $('.itemThree').css('background-color', culture);
            $('.itemThreeNoPicture h2').css('color', culture);
          } else if (agendaOptions.activityOfTrip === 'Active Life') {
            $('.itemOne').css('background-color', active);
            $('.itemOneNoPicture h2').css('color', active);
            $('.itemThree').css('background-color', active);
            $('.itemThreeNoPicture h2').css('color', active);
          } else if (agendaOptions.activityOfTrip === 'Balance') {
            $('.itemOne').css('background-color', active);
            $('.itemOneNoPicture h2').css('color', active);
            $('.itemThree').css('background-color', culture);
            $('.itemThreeNoPicture h2').css('color', culture);
          }

          if (agendaOptions.lengthOfTrip >= 5) {
            $('.pioneerItem').css('display', 'block');

            $('.itemNameFour').text(tempAgenda['3'].name);
            if (tempAgenda['3'].image_url === '') {
              $('.itemFourPicture').css('display', 'none');
              $('.itemFourNoPicture').css('display', 'block');
            } else {
              $('.itemFourPicture').attr('src', tempAgenda['3'].image_url);
            }
            $('.itemFourGenre').text(tempAgenda['3'].categories[0].title);
            $('.itemFourFirstAddress').text(
              tempAgenda['3'].location.display_address[0]
            );
            $('.itemFourSecondAddress').text(
              tempAgenda['3'].location.display_address[1]
            );
            $('.itemFourThirdAddress').text(
              tempAgenda['3'].location.display_address[2]
            );
            $('.itemFourPhone').text(formatPhoneNumber(tempAgenda['3'].phone));
            if (tempAgenda['3'].is_closed === 'false') {
              $('.itemFourOpen').text('Currently Open');
            } else {
              $('.itemFourOpen').text('Currently Closed');
            }

            $('.itemNameFive').text(tempAgenda['4'].name);
            if (tempAgenda['4'].image_url === '') {
              $('.itemFivePicture').css('display', 'none');
              $('.itemFiveNoPicture').css('display', 'block');
            } else {
              $('.itemFivePicture').attr('src', tempAgenda['4'].image_url);
            }
            $('.itemFiveGenre').text(tempAgenda['4'].categories[0].title);
            $('.itemFiveFirstAddress').text(
              tempAgenda['4'].location.display_address[0]
            );
            $('.itemFiveSecondAddress').text(
              tempAgenda['4'].location.display_address[1]
            );
            $('.itemFiveThirdAddress').text(
              tempAgenda['4'].location.display_address[2]
            );
            $('.itemFivePhone').text(formatPhoneNumber(tempAgenda['0'].phone));
            if (tempAgenda['4'].is_closed === 'false') {
              $('.itemFiveOpen').text('Currently Open');
            } else {
              $('.itemFiveOpen').text('Currently Closed');
            }

            $('.itemTwo').css('background-color', food);
            $('.itemTwoNoPicture h2').css('color', food);
            $('.itemFive').css('background-color', food);
            $('.itemFiveNoPicture h2').css('color', food);

            if (agendaOptions.activityOfTrip === 'Arts & Entertainment') {
              $('.itemOne').css('background-color', culture);
              $('.itemOneNoPicture h2').css('color', culture);
              $('.itemThree').css('background-color', culture);
              $('.itemThreeNoPicture h2').css('color', culture);
              $('.itemFour').css('background-color', culture);
              $('.itemFourNoPicture h2').css('color', culture);
            } else if (agendaOptions.activityOfTrip === 'Active Life') {
              $('.itemOne').css('background-color', active);
              $('.itemOneNoPicture').css('color', active);
              $('.itemThree').css('background-color', active);
              $('.itemThreeNoPicture h2').css('color', active);
              $('.itemFour').css('background-color', active);
              $('.itemFourNoPicture h2').css('color', active);
            } else if (agendaOptions.activityOfTrip === 'Balance') {
              $('.itemOne').css('background-color', active);
              $('.itemOneNoPicture h2').css('color', active);
              $('.itemThree').css('background-color', culture);
              $('.itemThreeNoPicture h2').css('color', culture);
              $('.itemFour').css('background-color', culture);
              $('.itemFourNoPicture h2').css('color', culture);
            }

            if (agendaOptions.lengthOfTrip >= 7) {
              $('.settlerItem').css('display', 'block');

              $('.itemNameSix').text(tempAgenda['5'].name);
              if (tempAgenda['5'].image_url === '') {
                $('.itemSixPicture').css('display', 'none');
                $('.itemSixNoPicture').css('display', 'block');
              } else {
                $('.itemSixPicture').attr('src', tempAgenda['5'].image_url);
              }
              $('.itemSixGenre').text(tempAgenda['5'].categories[0].title);
              $('.itemSixFirstAddress').text(
                tempAgenda['5'].location.display_address[0]
              );
              $('.itemSixSecondAddress').text(
                tempAgenda['5'].location.display_address[1]
              );
              $('.itemSixThirdAddress').text(
                tempAgenda['5'].location.display_address[2]
              );
              $('.itemSixPhone').text(formatPhoneNumber(tempAgenda['5'].phone));
              if (tempAgenda['5'].is_closed === 'false') {
                $('.itemSixOpen').text('Currently Open');
              } else {
                $('.itemSixOpen').text('Currently Closed');
              }

              $('.itemNameSeven').text(tempAgenda['6'].name);
              if (tempAgenda['6'].image_url === '') {
                $('.itemSevenPicture').css('display', 'none');
                $('.itemSevenNoPicture').css('display', 'block');
              } else {
                $('.itemSevenPicture').attr('src', tempAgenda['6'].image_url);
              }
              $('.itemSevenGenre').text(tempAgenda['6'].categories[0].title);
              $('.itemSevenFirstAddress').text(
                tempAgenda['6'].location.display_address[0]
              );
              $('.itemSevenSecondAddress').text(
                tempAgenda['6'].location.display_address[1]
              );
              $('.itemSevenThirdAddress').text(
                tempAgenda['6'].location.display_address[2]
              );
              $('.itemSevenPhone').text(
                formatPhoneNumber(tempAgenda['6'].phone)
              );
              if (tempAgenda['6'].is_closed === 'false') {
                $('.itemSevenOpen').text('Currently Open');
              } else {
                $('.itemSevenOpen').text('Currently Closed');
              }

              $('.itemOne').css('background-color', food);
              $('.itemOneNoPicture h2').css('color', food);
              $('.itemFour').css('background-color', food);
              $('.itemFourNoPicture h2').css('color', food);
              $('.itemSeven').css('background-color', food);
              $('.itemSevenNoPicture h2').css('color', food);

              if (agendaOptions.activityOfTrip === 'Arts & Entertainment') {
                $('.itemTwo').css('background-color', culture);
                $('.itemTwoNoPicture h2').css('color', culture);
                $('.itemThree').css('background-color', culture);
                $('.itemThreeNoPicture h2').css('color', culture);
                $('.itemFive').css('background-color', culture);
                $('.itemFiveNoPicture h2').css('color', culture);
                $('.itemSix').css('background-color', culture);
                $('.itemSixNoPicture h2').css('color', culture);
              } else if (agendaOptions.activityOfTrip === 'Active Life') {
                $('.itemTwo').css('background-color', active);
                $('.itemTwoNoPicture h2').css('color', active);
                $('.itemThree').css('background-color', active);
                $('.itemThreeNoPicture h2').css('color', active);
                $('.itemFive').css('background-color', active);
                $('.itemFiveNoPicture h2').css('color', active);
                $('.itemSix').css('background-color', active);
                $('.itemSixNoPicture h2').css('color', active);
              } else if (agendaOptions.activityOfTrip === 'Balance') {
                $('.itemTwo').css('background-color', active);
                $('.itemTwoNoPicture h2').css('color', active);
                $('.itemThree').css('background-color', active);
                $('.itemThreeNoPicture h2').css('color', active);
                $('.itemFive').css('background-color', culture);
                $('.itemFiveNoPicture h2').css('color', active);
                $('.itemSix').css('background-color', culture);
                $('.itemSixNoPicture h2').css('color', active);
              }
            }
          }
        }
      }
    });
  };
  renderInfo();
};

$(() => {
  handleSaveLoad();
});
