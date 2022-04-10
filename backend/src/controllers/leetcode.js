import puppeteer from "puppeteer";

// https://api.github.com/repos/sjsakib/cfviz
// https://api.github.com/users/rohit21je2k
const MODE = "notdev";

export const getLeetCodeProfile = async (req, res) => {
  try {
    const browser = req.browser;

    const { userId } = req.params;
    console.log(userId);
    const url = `https://leetcode.com/${userId}/`;
    const page = await browser.newPage();

    await page.goto(url);

    //   wait for submission
    await page.waitForTimeout(5000);

    let data = await page.evaluate(() => {
      const rank = document.querySelector(
        "span.ttext-label-1.dark\\:text-dark-label-1.font-medium"
      ).innerHTML;

      const totalSolved = document.querySelector(
        "body > div > div > div > div.w-full > div.flex.w-full.flex-col.lg\\:flex-row.space-x-0.space-y-4.lg\\:space-y-0.lg\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.xl\\:mx-8 > div.mr-8.mt-6.flex.min-w-\\[100px\\].justify-center > div > div > div > div.text-\\[24px\\].font-medium.text-label-1.dark\\:text-dark-label-1"
      ).innerHTML;

      const easy = document.querySelector(
        "body > div > div > div > div.w-full > div.flex.w-full.flex-col.lg\\:flex-row.space-x-0.space-y-4.lg\\:space-y-0.lg\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.xl\\:max-w-\\[228px\\] > div:nth-child(1) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1"
      ).innerHTML;

      const medium = document.querySelector(
        "body > div > div > div > div.w-full > div.flex.w-full.flex-col.lg\\:flex-row.space-x-0.space-y-4.lg\\:space-y-0.lg\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.xl\\:max-w-\\[228px\\] > div:nth-child(2) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1"
      ).innerHTML;

      const hard = document.querySelector(
        "body > div > div > div > div.w-full > div.flex.w-full.flex-col.lg\\:flex-row.space-x-0.space-y-4.lg\\:space-y-0.lg\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.xl\\:max-w-\\[228px\\] > div:nth-child(3) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1"
      ).innerHTML;

      const totalSubmission = document.querySelector(
        "body > div > div > div > div.w-full > div:nth-child(4) > div > div.flex.flex-col.flex-wrap.space-y-2.md\\:flex-row.md\\:items-center.md\\:space-y-0 > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.md\\:text-xl"
      ).innerHTML;

      // recent submissions
      const allrecent = document.querySelector(
        "body > div > div > div > div.w-full > div:nth-child(5) > div > div > div.flex.flex-col"
      );
      const subarr = Array.from(allrecent.children);
      let recent5 = [];

      for (let i = 0; i < 5; i++) {
        recent5.push(subarr[i].firstChild.firstChild.innerHTML);
      }

      // languages
      const languagesContainer = document.querySelector(
        "body > div > div > div > div:nth-child(1) > div > div.mt-4.flex.flex-col.space-y-3"
      );
      const langEls = Array.from(languagesContainer.children);
      let langs = [];
      langEls.forEach((node) => {
        langs.push(node.firstChild.firstChild.innerHTML);
      });

      const contestRating = document.querySelector(
        "body > div > div > div > div.w-full > div:nth-child(2) > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.mt-4.flex.h-\\[200px\\].w-full.min-w-\\[200px\\].p-4.lg\\:mt-0.xl\\:hidden > div > div.relative.min-h-\\[53px\\].text-xs > div > div:nth-child(1) > div.text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl"
      ).innerHTML;
      const contestAttented = document.querySelector(
        "body > div > div > div > div.w-full > div:nth-child(2) > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.mt-4.flex.h-\\[200px\\].w-full.min-w-\\[200px\\].p-4.lg\\:mt-0.xl\\:hidden > div > div.relative.min-h-\\[53px\\].text-xs > div > div:nth-child(3) > div.text-label-1.dark\\:text-dark-label-1.font-medium.leading-\\[22px\\]"
      ).innerHTML;

      const globalRanking = document
        .querySelector(
          "body > div > div > div > div.w-full > div:nth-child(2) > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.mt-4.flex.h-\\[200px\\].w-full.min-w-\\[200px\\].p-4.lg\\:mt-0.xl\\:hidden > div > div.relative.min-h-\\[53px\\].text-xs > div > div:nth-child(2) > div.text-label-1.dark\\:text-dark-label-1.font-medium.leading-\\[22px\\]"
        )
        .innerHTML.split("<")[0];

      return {
        rank,
        globalRanking,
        totalSolved,
        easy,
        medium,
        hard,
        totalSubmission,
        contest: {
          rating: contestRating,
          attented: contestAttented,
        },
        langs,
        recent5,
      };
    });

    await page.close();

    console.log(data);

    data.username = userId;
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};
