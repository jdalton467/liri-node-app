




var command = process.argv[2];//setting a command as the third argument
// var Twitter = require('twitter');
var song = process.argv; //setting up a 4th argument for when movie or spotify commands are used

function reset(){
	var fs = require('fs'); //calling node filesystem for reading and writing files
	fs.readFile("random.txt", "utf8", function(err, content){
		if(err){
			return console.log(err);
		}
	    // console.log(content);
	    var contentArr = content.split(",");
	    // console.log(contentArr[0]);
	    // console.log(contentArr[1]);
		command = contentArr[0];
		song = contentArr[1];

        switch(command){
        	case contentArr[0]:
        		spotify();
        		break;
        }
        function spotify(){ // if the spotify function is triggered
          var Spotify = require('node-spotify-api'); //calling the node spotify npm package

          var keys = require("./keys.js");
          var spotify = new Spotify(keys.spotifyKeys);

          if(song){
          spotify.search({type: 'track', query: song, limit:1}, function(err, data){
	           if(err){
		          return console.log('Error occured: ' + err);
	             }
	           console.log("artist: " + " " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2)); //prints the artist name
	           console.log("song: " + " " + JSON.stringify(data.tracks.items[0].name, null, 2)); //prints the song name
	           console.log("album: " + " " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); //prints the album name
	           console.log("preview: " + " " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)); //p

        });

    }
   }
 });
}


var song_movie = "";
var sep = "";

for(var i = 3; i < song.length; i++){
	song_movie += sep + song[i];

	sep = " ";
}





switch(command){ // setting up a switch case that goes through eash :"scenario commands that are allowed"
	case "my-tweets"://in case of "my-tweets"
		twitter();//execute the twitter function;
		break;
	case "spotify-this-song":
		spotify();
		break;
	case "movie-this":
		movie();
		break;
	case "do-what-it-says":
		reset();
		break;
}

function twitter(){
var Twitter = require('twitter');// using the require key word to access the npm twitter package
 
var keys = require("./keys.js"); // importing a module containing authorization keys to access the twitter api

var client = new Twitter(keys.twitterKeys); // storing the imported keys in object client
 
var params = {screen_name: 'DailyShowJon', count:21}; // setting the count up to 21
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for(i = 1; i < params.count; i++){ //looping through the count parameter to print out the 20 most recent tweets
    console.log(i + "." + " " + tweets[i].text); //rendering the text of the status
    console.log("created at" + " " + tweets[i].created_at);//rendering the time the status was created
    console.log("");// creating a line space underneath
    
    }
  }
});

}

function spotify(){ // if the spotify function is triggered
var Spotify = require('node-spotify-api'); //calling the node spotify npm package

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotifyKeys);

if(song_movie){
spotify.search({type: 'track', query: song_movie, limit:1}, function(err, data){
	if(err){
		return console.log('Error occured: ' + err);
	}
	console.log("artist: " + " " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2)); //prints the artist name
	console.log("song: " + " " + JSON.stringify(data.tracks.items[0].name, null, 2)); //prints the song name
	console.log("album: " + " " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); //prints the album name
	console.log("preview: " + " " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)); //prints a preview link the to song
	// console.log(JSON.stringify(data, null, 2));
	// console.log(data);
	});
   }else{ //if no song title is entered, then the function will defaut to The Sign, By Ace of bass
spotify.search({type: 'track', query: 'The Sign', limit:5}, function(err, data){
	if(err){
		return console.log('Error occured: ' + err);
	}
	console.log("artist: " + " " + JSON.stringify(data.tracks.items[4].album.artists[0].name, null, 2)); //Ace of Bass
	console.log("song: " + " " + JSON.stringify(data.tracks.items[4].name, null, 2)); //'The Sign'
	console.log("album: " + " " + JSON.stringify(data.tracks.items[4].album.name, null, 2)); //'The Sign'
	console.log("preview: " + " " + JSON.stringify(data.tracks.items[4].preview_url, null, 2)); //prints a preview link the to song
	// console.log(JSON.stringify(data, null, 2));
	// console.log(data);
	});
   }
}

function movie(){
	var request = require('request');
	if(song_movie){
	request('http://www.omdbapi.com/?t='+song_movie+'&y=&plot=short&tomatoes=true&apikey=40e9cece', function (error, response, body) {
    if(error){
    	return console.log(error);;
    }
    if(!error && response.statusCode == 200){
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('Title:', JSON.parse(body).Title); // Print the HTML for the Google homepage.
    console.log('Year Released:', JSON.parse(body).Year); 
    console.log('IMDB Rating:', JSON.parse(body).imdbRating); 
    console.log('Country:', JSON.parse(body).Country); 
    console.log('Language(s):', JSON.parse(body).Language);
   	console.log('Plot:', JSON.parse(body).Plot);
   	console.log('Starring:', JSON.parse(body).Actors);
   	console.log('Rotten Tomatoes:', JSON.parse(body).tomatoURL);
   		}
	});
	}else{
		song_movie = "Mr.Nobody";
		request('http://www.omdbapi.com/?t='+song_movie+'&y=&plot=short&tomatoes=true&apikey=40e9cece', function (error, response, body) {
    if(error){
    	return console.log(error);;
    }
    if(!error && response.statusCode == 200){
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('Title:', JSON.parse(body).Title); // Print the HTML for the Google homepage.
    console.log('Year Released:', JSON.parse(body).Year); 
    console.log('IMDB Rating:', JSON.parse(body).imdbRating); 
    console.log('Country:', JSON.parse(body).Country); 
    console.log('Language(s):', JSON.parse(body).Language);
   	console.log('Plot:', JSON.parse(body).Plot);
   	console.log('Starring:', JSON.parse(body).Actors);
   	console.log('Rotten Tomatoes:', JSON.parse(body).tomatoURL);
   		}
	});
	}
}



