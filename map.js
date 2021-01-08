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
                    lat: "-34.397",
                    lon: "150",
                    appid: "77ce096b22bb8b2a6059f11e9d402d8b",
                    lang: "fr",
                    units: "metric"
                }

            }).done(function (meteo) {
                console.log(meteo);
            })
        })
    })
});

