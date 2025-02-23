chrome.runtime.sendMessage(scrapeJobListing());

function scrapeJobListing() {
    const LI_JOB_VIEW_SELECTORS = {
        title: "/html/body/div[6]/div[3]/div[2]/div/div/main/div[2]/div[1]/div/div[1]/div/div/div/div[2]/div/h1",
        company: "/html/body/div[6]/div[3]/div[2]/div/div/main/div[2]/div[1]/div/div[1]/div/div/div/div[1]/div[1]/div/a",
        location: "/html/body/div[6]/div[3]/div[2]/div/div/main/div[2]/div[1]/div/div[1]/div/div/div/div[3]/div/span[1]",
        description: '/html/body/div[6]/div[3]/div[2]/div/div/main/div[2]/div[1]/div/div[4]/article/div/div[1]/div/p[1]'
    };

    let title = document.evaluate(LI_JOB_VIEW_SELECTORS.title, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.innerText.trim() || "Title not found";
    let company = document.evaluate(LI_JOB_VIEW_SELECTORS.company, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.innerText.trim() || "Company not found";
    let location = document.evaluate(LI_JOB_VIEW_SELECTORS.location, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.innerText.trim() || "Location not found";

    let descriptionElement = document.evaluate(LI_JOB_VIEW_SELECTORS.description, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let description = descriptionElement ? descriptionElement.innerText.trim() : "Description not found";

    let wageMatches = description.match(/(\$\d+\.\d{2}|\$\d+)/g);
    let wage = wageMatches ? wageMatches.slice(0, 2).sort().join(" - ") : "Wage not found";

    console.log(title, company, location, wage, description.substring(0, 80) + "...");
    return `Added ${title} @ ${company} to your dashboard!`;
}