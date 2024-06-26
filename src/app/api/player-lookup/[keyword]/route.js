import cheerio from "cheerio";

export async function GET(req, res) {
    const url = req.url.split("/");
    const keyword = url[url.length - 1];
    const data = await fetch(`https://usatt.simplycompete.com/userAccount/s2?q=${keyword}&displayColumns=First+Name&displayColumns=Last+Name&displayColumns=Location&displayColumns=Tournament+Rating&pageSize=1000`);
    const html = await data.text();
    const $ = cheerio.load(html);

    const players = [];

    $(".list-view > .row > table > tbody > tr").each((index, element) => {
        const player = {};
        $(element).children("td.list-column").each((index, element) => {
            if (index === 1) {
                player["firstName"] = $(element).children("a").first().text();
            } else if (index === 2) {
                player["lasttName"] = $(element).children("a").first().text();
            } else if (index === 3) {
                player["location"] = $(element).text();
            } else if (index === 4) {
                player["rating"] = $(element).text();
            };
        });
        players.push(player);
    });

    return new Response(JSON.stringify(players));
};