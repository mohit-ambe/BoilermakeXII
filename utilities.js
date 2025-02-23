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

    let output = `Added ${title} @ ${company} to your dashboard!`;
    return [output, title, company, location, wage, description, document.URL];
}

async function scrapeLinkedInProfiles(company) {
    const urls = [`${company} talent acquisition`, `${company} hiring`, `${company} recruiting`]
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    for (const query in queries.slice(2)) {
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            let found_links = [];
            if (data.items) {
                data.items.slice(0, 3).forEach(item => {
                    if (!found_links.includes(item.link)) {
                        writeToPeople(item.title.slice(0, item.indexOf(" - ")), company, item.link)
                        found_links.push(item.link)
                    }
                });
            } else {
                console.log('No results found.');
            }
        } catch (error) {
            console.error('Error fetching Google search results:', error);
        }
    }
}

storage = chrome.storage.local;

function writeToJobs(title, company, location, wage, description, url) {
    storage.get("jobs", function (items) {
        let jobs = items.jobs || [];

        const newJob = {
            title: title,
            company: company,
            location: location,
            wage: wage,
            description: description,
            link: url
        };

        jobs.push(newJob);

        // Save the updated jobs back to storage
        storage.set({"jobs": jobs}, function () {
            console.log("Jobs have been updated and saved");
        });
    });
}

function writeToPeople(name, company, url) {
    let people = [];
    const storedPeople = localStorage.getItem('people');
    if (storedPeople) {
        people = JSON.parse(storedPeople);
    }
    const newPerson = {
        name: name, company: company, link: url
    };
    people.push(newPerson);
    localStorage.setItem('jobs', JSON.stringify(people));
}


scrapedContent = scrapeJobListing();
writeToJobs(...scrapedContent.slice(1));
chrome.runtime.sendMessage({action: 'updatePopUp', data: scrapedContent[0]});
chrome.runtime.sendMessage({action: 'updateJobs'});
// scrapeLinkedInProfiles(scrapedContent[2]);
delete scrapedContent;