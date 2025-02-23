const puppeteer = require('puppeteer');

const LI_JOB_VIEW_XPATHS = {
    title: '/html/body/main/section[1]/div/section[2]/div/div[1]/div/h1',
    company: '/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[1]/a',
    location: '/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[2]',
    description: '//div[contains(@class, "show-more-less-html__markup show-more-less-html__markup--clamp-after-5")]'
};

async function scrapeJobListing(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract job details using document.evaluate
    const jobDetails = await page.evaluate((xpaths) => {
        function getTextFromXPath(xpath) {
            const result = document.evaluate(xpath, document, null, XPathResult.STRING_TYPE, null);
            return result.stringValue.trim() || null;
        }

        const title = getTextFromXPath(xpaths.title);
        const company = getTextFromXPath(xpaths.company);
        const location = getTextFromXPath(xpaths.location);

        const descriptionNodes = document.evaluate(xpaths.description, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let description = "";
        for (let i = 0; i < descriptionNodes.snapshotLength; i++) {
            description += descriptionNodes.snapshotItem(i).textContent.trim();
        }

        // Extract wage using regex
        const wageMatches = description.match(/(\$\d+\.\d{2}|\$\d+)/g) || [];
        const wage = wageMatches.length >= 2 ? `${wageMatches[0]} - ${wageMatches[1]}` : "Not listed";

        return { title, company, location, wage, description };
    }, LI_JOB_VIEW_XPATHS);

    await browser.close();

    console.log(jobDetails.title, jobDetails.company, jobDetails.location, jobDetails.wage, jobDetails.description.slice(0, 80) + '...', '\n');
    return jobDetails;
    return new job()
}

function giggle (args) {
    console.log(args);
}