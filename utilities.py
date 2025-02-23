import re

import requests
from lxml import html

LI_JOB_VIEW_XPATHS = [# Title
    "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h1//text()", # Company
    "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[1]/a//text()", # Location
    "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[2]//text()", # Description
    '//div[contains(@class, "show-more-less-html__markup show-more-less-html__markup--clamp-after-5")]//text()']


def scrapeJobListing(url, xpaths):
    response = requests.get(url)
    tree = html.fromstring(response.content)

    title = tree.xpath(xpaths[0])[0].strip()

    company = tree.xpath(xpaths[1])[0].strip()

    location = tree.xpath(xpaths[2])[0].strip()

    description = tree.xpath(xpaths[3])
    description = "\n".join(description).encode("latin1").decode("utf-8").strip()

    wage = " - ".join(sorted(re.findall(r"(\$\d+.\d{2}|\$\d+)", description))[:2])

    print(title, company, location, wage, description[:80] + "...", sep="\n")
    return description


def scrapeLinkedInProfile(url):
    pass


def writeToDataset():
    pass


def readFromDataset():
    pass


def generateMessage():
    pass


def recruiterSearch():
    # input LinkedIn tags to url
    #  cURL the content, then scrape for profiles
    pass


def editOnDataset():
    pass
