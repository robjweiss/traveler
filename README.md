# traveler
A travel site

## Usage
1. Obtain a [Skyscanner key from RapidAPI](https://english.api.rakuten.net/skyscanner/api/skyscanner-flight-search)
2. Create a directory `config` and a `rapidapi.json` file within it
3. Add your information to the file like so:
    ````
    {
        "X-RapidAPI-Host": <HOST>,
        "X-RapidAPI-Key": <KEY>
    }
    ````
3. Apply for access to the [Twitter API](https://developer.twitter.com/en/apply-for-access)
4. Create another file `twitter.json` within the `config` folder
5. Populate it with your keys and tokens like so:
    ````
    {
        "consumer_key": <CONSUMER_KEY>,
        "consumer_secret": <CONSUMER_SECRET>,
        "token": <TOKEN>,
        "token_secret": <TOKEN_SECRET>
    }
    ````
4. Install dependencies with `npm install`
5. Ensure Redis is running
5. Start the project with `npm start`