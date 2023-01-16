const YouTube = require('youtube-node');
const youtube = new YouTube();

// Put API key here
youtube.setKey('Api key here');

let nextPageToken = '';

const YoutubeApiConnect = {

    async queryChannelVideos(nextPageToken){
        return new Promise((resolve, reject) => {
            youtube.search(
                '',
                50,
                {
                    type: 'video',
                    pageToken: nextPageToken,
// Put channelId
                    channelId: "Channel ID HERE"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                        for(let i = 0; i <= 49; i++) {
                            try {
                                YoutubeApiConnect.searchVideosViewers(result.items[i].id.videoId)
                                //console.log( result.items[i].snippet.title);
                            } catch (e) {
                                console.log(`erro on loop ${i}`)
                            }
                        }
                    }
                }
            );
        });
    },

    async searchVideosViewers(videoId){
        youtube.getById(videoId,  function (error, result) {
            if (error) {
                console.log(error);
            } else {
                // const YouViewers = result.items[0].statistics.viewCount
                async function consoleFunction(){
                    await console.log(`https://www.youtube.com/watch?v=${videoId} have ${result.items[0]["statistics"].viewCount} Views`)
                }
                // filter viewers
                if(result.items[0]["statistics"].viewCount > 40000){
                    consoleFunction()
                };
            }
        })
    }
};


async function createLoop() {

    while (nextPageToken !== null) {
        const result = await YoutubeApiConnect.queryChannelVideos(nextPageToken);
        if(result.nextPageToken == null){
            break
        } else {
            nextPageToken = result.nextPageToken;
            //console.log(`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`)
        }
        //console.log(nextPageToken)
    }
}
//console.log(nextPageToken)
createLoop();


module.exports = YoutubeApiConnect;


// BY Sgt_William <3


