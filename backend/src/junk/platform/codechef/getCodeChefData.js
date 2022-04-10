import axios from "axios";
import * as cheerio from "cheerio";

export const getCodeChefData = async (req, res) => {
  try {
    const url = "https://www.codechef.com/users/rohit21je2k";
    const response = await axios({
      method: "GET",
      withCredentials: true,
      gzip: true,
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      url: url,
    });
    const $ = await cheerio.load(response);
    const rank = $(
      "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-ranks > ul > li:nth-child(1) > a > strong"
    );
    console.log(rank);
    res.send("success");
  } catch (err) {
    console.log(err);
    res.send("failed");
  }
};
