class Job { 

    status = ["Not Applied", "Submitted", "Applied", "Interview Requested", "Interviewed", "Offered", "Accepted", "Rejected", "Deleted"];

    constructor(title = "", company = "", location = "", description = "", wage = "", status = "") { 
        this.title = title; 
        this.company = company;
        this.location = location;
        this.status = status || this.status[0];
        this.description = description;
        this.wage = wage;
        this.recruiters=[];
        
        console.log("Job Created: ", title, company)
    }

    getRecruiters() { 
        return this.recruiters;
    }

    setRecruiters(recruiters) {
        this.recruiters = recruiters; 
    } 

    addRecruiter(recruiter) {
        this.recruiters.push(recruiter);
    }

    removeRecruiter(recruiter) {
        const index = this.recruiters.indexOf(recruiter);
        if (index > -1) {
            this.recruiters.splice(index, 1);
        }
    }

    getRecruiter(index) {
        return this.recruiters[index] || null;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getCompany() {
        return this.company;
    }

    setCompany(company) {
        this.company = company;
    }

    getLocation() {
        return this.location;
    }

    setLocation(location) {
        this.location = location;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        if (this.status.includes(status)) {
            this.status = status;
        }
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getWage() {
        return this.wage;
    }

    setWage(wage) {
        this.wage = wage;
    }
}
