var lat = 10.78;
var lng = 106.7;
var icon;
function initMap(){
	var uluru = {lat: lat, lng: lng};
	var map = new google.maps.Map(document.getElementById('map'),{
		zoom: 12,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

function loadDT(){
	var city = document.getElementById('city').value;
	var myUrl = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=04c2a992d7e5dd7bcebb428de1c00e90";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(response){
		if(this.readyState == 4 && this.status == 200){
			response = JSON.parse(this.response);
			lat = response.coord.lat;
			lng = response.coord.lon;
			icon = response.weather[0].icon;
			city = response.name;
			country = response.sys.country;
			temp = response.main.temp;
			main = response.weather[0].main;
			description = response.weather[0].description;
			document.getElementById('imageWeather').src= "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
			document.getElementById('displayInfo').innerHTML = "<b>" + city + ", " + country + "</b><br>" + "Degree: " + temp + "&deg;F" + "<br>" + "Main weather: " + main + "<br>" + "Main descrition: " + description;
			initMap();
		}
	};
	xhttp.open("GET", myUrl, true);
	xhttp.send();
}
