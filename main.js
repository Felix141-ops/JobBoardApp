   // Array of job objects, each containing job details such as title, company, category, location, etc.
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        category: 'technology',
        location: 'remote',
        description: 'We are looking for an experienced frontend developer with 5+ years of experience in React, Vue.js, and modern JavaScript. Must have strong UI/UX skills and experience with responsive design.',
        salary: 'KSH 180,000 - KSH 250,000',
        requirements: ['5+ years experience', 'React & Vue.js', 'UI/UX skills', 'Responsive design'],
        benefits: ['Health Insurance', 'Annual Bonus', 'Flexible Hours', 'Remote Work'],
        featured: true
    },
    {
        id: 2,
        title: 'Marketing Manager',
        company: 'Brand Solutions',
        category: 'marketing',
        location: 'onsite',
        description: 'Leading marketing initiatives and campaigns for major clients. Experience in digital marketing and team management required.',
        salary: 'KSH 150,000 - KSH 200,000',
        requirements: ['Digital Marketing', 'Team Management', 'Campaign Planning', 'Analytics'],
        benefits: ['Performance Bonus', 'Lunch Allowance', 'Training Budget'],
        featured: true
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        category: 'design',
        location: 'hybrid',
        description: 'Design beautiful and functional user interfaces for web and mobile applications.',
        salary: 'KSH 120,000 - KSH 180,000',
        requirements: ['Adobe Suite', 'Figma', 'User Research', 'Prototyping'],
        benefits: ['Design Tools Provided', 'Creative Environment', 'Healthcare'],
        featured: false
    },
    {
        id: 4,
        title: 'Backend Developer',
        company: 'Fintech Solutions',
        category: 'technology',
        location: 'remote',
        description: 'Develop and maintain scalable backend systems for financial applications.',
        salary: 'KSH 200,000 - KSH 300,000',
        requirements: ['Node.js', 'Python', 'AWS', 'Microservices'],
        benefits: ['Stock Options', 'Remote Work', '13th Month Pay'],
        featured: true
    },
    {
        id: 5,
        title: 'Sales Executive',
        company: 'Growth Corp',
        category: 'sales',
        location: 'hybrid',
        description: 'Drive business growth through B2B sales and relationship management.',
        salary: 'KSH 100,000 + Commission',
        requirements: ['B2B Sales', 'CRM Experience', 'Networking Skills'],
        benefits: ['High Commission', 'Car Allowance', 'Phone Allowance'],
        featured: false
    },
    {
        id: 6,
        title: 'Content Manager',
        company: 'Digital Media Ltd',
        category: 'marketing',
        location: 'onsite',
        description: 'Manage content strategy and team of writers for digital platforms.',
        salary: 'KSH 140,000 - KSH 180,000',
        requirements: ['Content Strategy', 'SEO Knowledge', 'Team Management'],
        benefits: ['Gym Membership', 'Healthcare', 'Training Budget'],
        featured: false
    }
];

// DOM Elements
const jobsList = document.getElementById('jobsList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const searchBtn = document.getElementById('searchBtn');
const postJobBtn = document.getElementById('postJobBtn');
const postJobModal = document.getElementById('postJobModal');
const applicationModal = document.getElementById('applicationModal');
const closeModals = document.querySelectorAll('.close');
const jobPostForm = document.getElementById('jobPostForm');
const applicationForm = document.getElementById('applicationForm');
const salaryFilter = document.getElementById('salaryFilter');
//Displays featured jobs in the UI.
function displayFeaturedJobs() {
    const featuredJobsContainer = document.querySelector('.featured-jobs .jobs-container');
    const featuredJobs = jobs.filter(job => job.featured);
    
    featuredJobsContainer.innerHTML = '';
    featuredJobs.forEach(job => {
        const jobCard = createJobCard(job, true);
        featuredJobsContainer.appendChild(jobCard);
    });
}

function createJobCard(job, isFeatured = false) {
    const jobCard = document.createElement('div');
    jobCard.className = `job-card ${isFeatured ? 'featured' : ''}`;
    
    if (isFeatured) {
        jobCard.innerHTML = `<span class="featured-badge">Featured</span>`;
    }
    
    jobCard.innerHTML += `
        <h3>${job.title}</h3>
        <div class="job-meta">
            <p><strong>${job.company}</strong></p>
            <p><i class="fas fa-tag"></i> ${job.category} | <i class="fas fa-map-marker-alt"></i> ${job.location}</p>
            <p><i class="fas fa-money-bill-wave"></i> ${job.salary}</p>
        </div>
        <div class="job-description">
            <p>${job.description}</p>
        </div>
        <div class="job-requirements">
            <h4>Requirements:</h4>
            <ul>
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        <div class="job-benefits">
            <h4>Benefits:</h4>
            <ul>
                ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
        <button class="apply-btn" onclick="openApplicationForm(${job.id})">Apply Now</button>
        <button class="save-btn" onclick="saveJob(${job.id})"><i class="far fa-bookmark"></i> Save Job</button>
    `;
    return jobCard;
}

function displayJobs(jobsToDisplay = jobs) {
    jobsList.innerHTML = '';
    jobsToDisplay.forEach(job => {
        const jobCard = createJobCard(job);
        jobsList.appendChild(jobCard);
    });
}

function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const locationValue = locationFilter.value;
    const salaryValue = parseInt(salaryFilter.value) || 0;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryValue || job.category === categoryValue;
        const matchesLocation = !locationValue || job.location === locationValue;
        const matchesSalary = salaryValue === 0 || 
                             parseInt(job.salary.replace(/[^0-9]/g, '')) >= salaryValue;

        return matchesSearch && matchesCategory && matchesLocation && matchesSalary;
    });

    displayJobs(filteredJobs);
}

function saveJob(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        alert('Job saved successfully!');
    } else {
        alert('Job already saved!');
    }
}

function openApplicationForm(jobId) {
    const job = jobs.find(j => j.id === jobId);
    document.getElementById('applicationJobTitle').textContent = job.title;
    document.getElementById('applicationCompany').textContent = job.company;
    applicationModal.style.display = 'block';
}

applicationForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);
    // Here you would typically send this data to a server
    console.log('Application submitted:', Object.fromEntries(formData));
    alert('Application submitted successfully!');
    applicationModal.style.display = 'none';
    applicationForm.reset();
};

postJobBtn.onclick = () => postJobModal.style.display = 'block';
closeModals.forEach(closeBtn => {
    closeBtn.onclick = () => {
        postJobModal.style.display = 'none';
        applicationModal.style.display = 'none';
    };
});
//
window.onclick = (event) => {
    if (event.target === postJobModal || event.target === applicationModal) {
        postJobModal.style.display = 'none';
        applicationModal.style.display = 'none';
    }
};

jobPostForm.onsubmit = (e) => {
    e.preventDefault();
    // Add form handling logic here
    alert('Job posted successfully!');
    postJobModal.style.display = 'none';
};

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        newsletterForm.reset();
    });
}

searchBtn.addEventListener('click', filterJobs);
searchInput.addEventListener('input', filterJobs);
categoryFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);
salaryFilter.addEventListener('change', filterJobs);

document.getElementById('resumeMethod').addEventListener('change', (e) => {
    const manualInput = document.getElementById('manualResumeInput');
    const fileUpload = document.getElementById('resumeUpload');
    const driveLink = document.getElementById('driveLinkInput');
    
    manualInput.style.display = 'none';
    fileUpload.style.display = 'none';
    driveLink.style.display = 'none';
    
    switch(e.target.value) {
        case 'manual':
            manualInput.style.display = 'block';
            break;
        case 'upload':
            fileUpload.style.display = 'block';
            break;
        case 'drive':
            driveLink.style.display = 'block';
            break;
    }
});

function setupJobAlerts() {
    const alertPreferences = {
        jobTypes: [],
        locations: [],
        salaryRange: '',
        frequency: 'daily'
    };
   
    alert('Job alerts feature coming soon! We\'ll notify you of new opportunities.');
}

function openQuickApply() {
    alert('Quick apply feature coming soon! Apply to multiple jobs with one click.');
}

function filterByCategory(category) {
    categoryFilter.value = category.toLowerCase();
    filterJobs();
}

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h4').textContent;
        filterByCategory(category);
    });
});

displayFeaturedJobs();
displayJobs();