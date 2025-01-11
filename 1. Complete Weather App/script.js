const url = 'https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&sort=latest&page=1';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ce3a5141e4mshaee3ad3cd2ccde3p18c9eajsn3637c3e250bf',
		'x-rapidapi-host': 'ott-details.p.rapidapi.com'
	}
};

const getMovie = async () => {

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

getMovie()