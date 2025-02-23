function displayJobs() {
    const storage = chrome.storage.local;

    storage.get("jobs", function (items) {
        const jobs = items.jobs || [];  // Default to an empty array if no jobs are stored

        const jobsContainer = document.getElementById('jobsContainer');
        jobsContainer.innerHTML = '';  // Clear any previous content

        if (jobs.length === 0) {
            jobsContainer.innerHTML = '<p>No jobs saved.</p>';
            return;
        }

        const table = document.createElement('table');

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Wage</th>
        `;
        table.appendChild(headerRow);

        jobs.forEach(job => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="${job.link}">${job.title}</a></td>
                <td>${job.company}</td>
                <td>${job.location}</td>
                <td>${job.wage}</td>
            `;
            table.appendChild(row);
        });

        jobsContainer.appendChild(table);
    });
}

document.addEventListener('DOMContentLoaded', displayJobs);
