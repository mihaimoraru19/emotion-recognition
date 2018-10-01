This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

» This is a simple project using Microsoft's Face API for emotion recognition and Imgur API to upload photos.

» Based on the results received from Face API after you upload a photo you will receive:

* visual age (how old the person looks)
* gender
* predominant emotion
* feeling 

Please note that the API is not 100% accurate. (not even close)

In order to use this project you'll have to:

1. Run `yarn install`
2. Change in App.js lines 14 and 15 with your subscription key provided for free from MS (for 7 days) and your IMGUR client ID:

            clientId: 'YOUR IMGUR CLIENT ID',
            subscriptionKey: 'YOUR MS FACE API SUBSCRIPTION KEY',
            
3. Run `yarn start`
4. Upload or drag a photo and wait for your result.