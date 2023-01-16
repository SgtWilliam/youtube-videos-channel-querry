const YoutubeApiConnect = require("./Repository/YoutubeApiConnect");

YoutubeApiConnect.queryChannelVideos().then(r => {
    // console.log(r.items[0]["id"]["videoId"])

    for(let i = 0; i <= 49; i++) {
        try {
            console.log(r.items[i]["id"]["videoId"])
        } catch (e) {
            console.log(`erro no loop ${i}`)
        }
    }
    }
);
