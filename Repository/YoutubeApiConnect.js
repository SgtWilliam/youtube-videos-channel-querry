const YouTube = require('youtube-node');
const youtube = new YouTube();

youtube.setKey('You api key Here');

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
                    channelId: "ChannelID Here"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
};


async function createLoop() {

    while (nextPageToken !== null) {
        const result = await YoutubeApiConnect.queryChannelVideos(nextPageToken);
        if(result.nextPageToken == null){
            break
        } else {
            nextPageToken = result.nextPageToken;
            //console.log(`https://www.youtube.com/watch?v=${result.items[i].id.videoId}`)
        }
        //console.log(nextPageToken)
    }
}
//console.log(nextPageToken)
createLoop();


module.exports = YoutubeApiConnect;

// YoutubeApiConnect.queryChannelVideos().then(r => console.log(r));


