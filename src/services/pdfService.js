import puppeteer from "puppeteer";
import { compileTemplate } from "../utils/compileTemplate.js";

let browser;

export async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browser;
}

export async function createPdf(data) {
  const html = await compileTemplate("report", data);
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await page.close();
  return pdf;
}
