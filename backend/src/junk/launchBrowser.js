import puppeteer from "puppeteer";

const browser = async (req, res, next) => {
  const b = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const newPage = await b.newPage();
  req.page = newPage;
  next();
};

export default browser;
