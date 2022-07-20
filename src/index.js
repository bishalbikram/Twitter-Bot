require('dotenv').config({path: './config/.env'})
const Twit = require('twit')

const T = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

function twitterBot() {
	// Search query 
	const params = {
		q: '#Web3',
		result_type: 'recent',
		lang: 'en',
		count: 20
	}

	// Get recent tweets based on Search query   
	T.get('search/tweets', params, function(err, data, response) {
		if(err) {
			console.log(err)
		}

		// Get single tweet from list
		let tweet = data.statuses[0]

		// Get tweet ID
		let tweetId = tweet.id_str

		// Get user ID
		let userId = tweet.user.id_str
		

		// Like
		T.post('favorites/create', { id: tweetId }, function(err ,response) {
			if(err) {
				console.log(err.message)
			}
			console.log('Liked!')
		})

		// Retweet 
		T.post('statuses/retweet/:id', { id: tweetId }, function(err, response) {
			if(err) {
				console.log(err.message)
			}
			console.log('Retweeted!')
		})

		// Follow
		T.post('friendships/create', { user_id: userId, follow: 'true' }, function(err, response) {
			if(err) {
				console.log(err.message)
			}
			console.log('Followed!')
		})
	})
}

// Like, Follow and Retweet a tweet as soon as program is running 
twitterBot()

// Like, Follow and Retweet a tweet in every 60 minutes
setInterval(twitterBot, 3600000)
