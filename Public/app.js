const { response } = require("express");

//fetch job lisyting from the server 
fetch('http://localhost:3000/job-listings')
.then(response => {
    //check if the reponse is ok (status code 200-299)
    if(response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if the response isnt succesful

    }
    return response.json(); // parse the json response and rerturn it

})

.then(data => {
    // once the data is parsed find th div where job listing will be displayed 
    const jobListings = document.getElementById('job-listings');

    //Map through the job listings data and create a html for each job listing 
    jobListingsDiv.innerHTML = data.map(job =>
        `<div>
        <strong>${job.title}</strong> <!--Display the job title in bold-->
        <p>${job.description}</p> <!--Display the job description -->

        </div>`

    ).join(''); // Join the array of HTML strings into a single string

})
.catch(err =>{
    //catch any error that occured duing the fetch or the parsing process 
    console.error('Fetch error:', err); // log error to the console for debugging

});