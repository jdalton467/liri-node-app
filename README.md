# liri-node-app

A neat terminal application that lets users skim information about their favorite movie, song , or Twitter account.

This app requests information from the Twitter, Spotify, and OMDb APIs and displays it to the user from the terminal.

If the user wants to find out info about their favorite song, then they can simply type node liri.js 'spotify-this-song' 'livin on a prayer'

Want to find out who directed the Titanic? Just type node liri.js movie-this Titanic

Recieve the latest 20 tweets from your favorite celebrity by writing node liri.js my-tweets

It's a fun app that can display a wealth of information! This was an exercise in performing GET requests with Ajax calls and learing how to work with different APIs

# APIs
* Twitter
* Spotify
* OMDb

# Example
  
    node liri.js my-tweets

# Sample Code
Based on the node command, a function will be called that will make a GET request to a particular API



    switch (command) { // setting up a switch case that goes through eash :"scenario commands that are allowed"
        case "my-tweets": //in case of "my-tweets"
            twitter(); //execute the twitter function;
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

    function twitter() {
        var Twitter = require('twitter'); // using the require key word to access the npm twitter package


        var client = new Twitter(keys.twitterKeys); // storing the imported keys in object client

        var params = {
            screen_name: 'neiltyson',
            count: 21
        }; // setting the count up to 21
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (i = 1; i < params.count; i++) { //looping through the count parameter to print out the 20 most recent tweets
                    console.log(i + "." + " " + tweets[i].text); //rendering the text of the status
                    console.log("created at" + " " + tweets[i].created_at); //rendering the time the status was created
                    console.log(""); // creating a line space underneath

                }
            }
        });

    }


# my-tweets
![screenshot 38](https://user-images.githubusercontent.com/21977931/29149634-7c7cf8dc-7d43-11e7-8080-2075091e1940.png)

# movie-this
![screenshot 36](https://user-images.githubusercontent.com/21977931/29147289-04708908-7d34-11e7-8042-6b655ca4b647.png)

# spotify-this-song
![screenshot 37](https://user-images.githubusercontent.com/21977931/29147335-5a9770bc-7d34-11e7-94a9-b07b5c3b0a32.png)
