// Fetch and display existing job listings on page load
fetch('http://localhost:3000/job-listings')
    .then(response => response.json())
    .then(data => {
        const jobListingsDiv = document.getElementById('job-listings');
        jobListingsDiv.innerHTML = data.map(job => 
            `<div>
                <strong>${job.title}</strong>
                <p>${job.description}</p>
            </div>`
        ).join('');
    })
    .catch(err => console.error('Fetch error:', err));

// Handle form submission to add a new job listing
document.getElementById('job-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const employer_id = document.getElementById('employer_id').value;

    // Send a POST request to add the new job listing
    fetch('http://localhost:3000/job-listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            employer_id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Job listing added:', data);
        // Optionally, refresh the job listings after adding
        fetchJobListings();
        // Reset form fields
        document.getElementById('job-form').reset();
    })
    .catch(err => console.error('Error adding job listing:', err));
});

// Function to fetch and display job listings
function fetchJobListings() {
    fetch('http://localhost:3000/job-listings')
        .then(response => response.json())
        .then(data => {
            const jobListingsDiv = document.getElementById('job-listings');
            jobListingsDiv.innerHTML = data.map(job => 
                `<div>
                    <strong>${job.title}</strong>
                    <p>${job.description}</p>
                </div>`
            ).join('');
        })
        .catch(err => console.error('Fetch error:', err));
}
