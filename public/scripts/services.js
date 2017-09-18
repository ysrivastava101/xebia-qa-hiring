var url = 'http://localhost:3000/';
// Lazy loading
cities = [];
allCities = [];
var offset = 1;
var randomCitySelect = '';
var getCities = function(country) {
  $.ajax({
    url : url+'getCities?country='+country,
    method : 'GET',
    success : function(response){
      $('#cities .table.table-striped tbody').html('');
      allCities = JSON.parse(JSON.stringify(response));
      cities = JSON.parse(JSON.stringify(response));
      populateCities(response);
    },
    error : function(error){
      console.log(error);
    }
  });
}
var populateCities = function(response){
  randomCitySelect = allCities[Math.floor(Math.random() * (allCities.length - 0) + 0)];
  $('.selectLabel').removeClass('hide');
  $('#randomCity').html(randomCitySelect);
  if(response.length != 0){
    tmpArr = f(cities);
    for(var i=0;i<tmpArr.length;i++){
      $('#cities .table.table-striped tbody').append('<tr><td class="city" onclick="selectCity(this)">'+tmpArr[i]+'</td></tr>');
    }
  }
  else{
    $('#cities .table.table-striped tbody').html('<tr><td>No records found</td></tr>')
  }
}
function f(array){
  var i,j,temparray,chunk = 8;
  for (i=0,j=array.length; i<j; i+=chunk) {
    temparray = array.slice(i,i+chunk);
    return temparray;
  }
}
$('#cities').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            offset = offset+1;
            cities = cities.splice(8,cities.length);
             tmpArr = f(cities);
             for(var i=0;i<tmpArr.length;i++){
               $('#cities .table.table-striped tbody').append('<tr><td class="city" onclick="selectCity(this)">'+tmpArr[i]+'</td></tr>');
             }
        }
    });


function checkSelected(){
  var selectedCity = $('.selected').html();
  var cityPresent = false;
  for(var i=0;i<allCities.length;i++){
    if(allCities[i] == selectedCity){
      cityPresent = true;
    }
  }
  if(cityPresent == true){
    next();
  }
  else{
    $('.help-block').removeClass('hide');
  }
}

function selectCity(elem){
  $('.help-block').addClass('hide');
  if(randomCitySelect == elem.innerHTML){
    $(elem).addClass('selected');
  }
  else{
    $('.help-block').removeClass('hide');
  }
}
// Lazy loading
