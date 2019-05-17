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
4. Install dependencies with `npm install`
5. Ensure Redis is running
5. Start the project with `npm start`