const do_conversion = (s) => {
  let ans = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= 0 && s[i] <= 9) {
      ans += s[i];
    }
  }
  return ans;
};

export const getcodechefProfile = async (req, res) => {
  try {
    const browser = req.browser;

    const { userId } = req.params;
    console.log(userId);

    const url = "https://www.codechef.com/users/" + userId;
    const page = await browser.newPage();

    await page.goto(url);

    //   wait for submission
    await page.waitForSelector("body > main");

    let data = await page.evaluate(() => {
      const total_rating = document.querySelector(
        "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-header.text-center > div.rating-number"
      ).innerHTML;
      let div = document.querySelector(
        "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-header.text-center > div:nth-child(2)"
      ).innerHTML;
      const global_rank = document.querySelector(
        "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-ranks > ul > li:nth-child(1) > a > strong"
      ).innerHTML;
      const country_rank = document.querySelector(
        "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-ranks > ul > li:nth-child(2) > a > strong"
      ).innerHTML;
      const fully_solved = document.querySelector(
        "body > main > div > div > div > div > div > section.rating-data-section.problems-solved > div > h5:nth-child(1)"
      ).innerHTML;
      const partially_solved = document.querySelector(
        "body > main > div > div > div > div > div > section.rating-data-section.problems-solved > div > h5:nth-child(3)"
      ).innerHTML;
      return {
        total_rating,
        div,
        global_rank,
        country_rank,
        fully_solved,
        partially_solved,
      };
    });

    await page.close();

    data.username = userId;
    data.fully_solved = do_conversion(data.fully_solved);
    data.partially_solved = do_conversion(data.partially_solved);
    data.div = do_conversion(data.div);

    console.log(data);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};
