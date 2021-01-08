$(function () {

    $("#btn").on("click", function () {
        let adresse = $("#adresse").val();
        $.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            method: "get",
            dataType: "json",
            data: {

                q: adresse,
                format: "json",
                addressdetails: 1,
                limit: 1
            }

        }).done(function (resultat) {

            map.setCenter({ lat: parseFloat(resultat[0].lat), lng: parseFloat(resultat[0].lon) });
            new google.maps.Marker({
                position: { lat: parseFloat(resultat[0].lat), lng: parseFloat(resultat[0].lon) },
                map,
            });
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather",
                method: "get",
                dataType: "json",
                data: {
                    lat: resultat[0].lat,
                    lon: resultat[0].lon,
                    appid: "77ce096b22bb8b2a6059f11e9d402d8b",
                    lang: "fr",
                    units: "metric"
                }

            }).done(function (meteo) {
                let temperature = meteo.main.temp;
                let icon = meteo.weather[0].icon;
                let description = meteo.weather[0].description;
                let image = new Image();
                image.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                $("#meteo").append("La température actuelle est de <strong>" + temperature + "°C</strong>", image);

            })
        })
    })
});

