

require("dotenv").config();
//Set up variable
var keys = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request");

var fs = require("fs");


var command = process.argv[2];

var search = "";

searchCommand();

if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    thisSong();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "do-what-it-says") {
    doWhat();
}


function myTweets() {
    var client = new twitter(keys.twitter);
    client.get("statuses/user_timeline", { screen_name: "gmthedeveloper", count: 20 }, function (error, tweets, response) {
        if (err) {
            console.log(err);
        } else {
            if (tweets.length >= 20) {
                console.log("_____________________________________________________________");
                for (var i = 0; i < 20; i++) {
                    console.log("Tweeted " + tweets[i].text + "' on " + tweets[i].created_at);  
                    console.log("_____________________________________________________________");
                }
            } else {
                console.log("_____________________________________________________________");
                for (var i = 0; i < tweets.length; i++) {
                    console.log("Tweeted" + tweets[i].text + "' on " + tweets[i].created_at);  
                }
                console.log("_____________________________________________________________");
            };
        };

    }

    )};

function thisSong(){
    var spotify = new Spotify(keys.spotify);
    if (search === "" || search === ""){
        search = "The Sign";

    }else{

    spotify.search({ type: 'track', query: search }).then(function(response) {

    console.log("_____________________________________________________________")  

    console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
    console.log("Song: " + response.tracks.items[0].name);
    console.log("Album: " + response.tracks.items[0].album.name);
    console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);

    console.log("_____________________________________________________________")  


  });
};
};

function movieThis(){
    
    if (search === "" || search === ""){
        
        search = "Mr. Nobody";
    }else{
        var queryURL= "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
        console.log(queryURL);
        request(queryURL, function(error, response, body){
            if (!error && response.statusCode === 200) {
                var movieInfo= JSON.parse(body);
            
                console.log("_____________________________________________________________")
                console.log("*Title: " + movieInfo.Title);
                console.log("*Released: " + movieInfo.Year);
                console.log("*IMDB Rating: " + movieInfo.imdbRating);
                console.log("*Produced in: " + movieInfo.Country);
                console.log("*Language: " + movieInfo.Language);
                console.log("*Plot: " + movieInfo.Plot);
                console.log("*Actors: " + movieInfo.Actors);
                console.log("_____________________________________________________________")

            }else{
                console.log(error);
            }
        })
    }

}

function doWhat(){
    fs.readFile("random.txt", "utf8", function(err, data) {
       
        if (err) {
          return console.log(err);
        }
       var commandArray = data.split(",");
        
       command = commandArray[0];
       search = commandArray[1];
        console.log("I want to take a break");

    });
}

function searchCommand(){
    for (var i=3; i < process.argv.length; i++ ){
        search = search + " " + process.argv[i];
    };
    return search;
}


