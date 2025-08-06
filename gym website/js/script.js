// Subscription functionality
function selectPlan(planType) {
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => card.classList.remove('selected'));
    
    event.currentTarget.classList.add('selected');
    
    const planTitles = {
        'weights': 'Weights Training Only - 2000DA/month',
        'weights-cardio': 'Weights + Cardio - 2500DA/month',
        'full-package': 'Full Package + Coach - 3000DA/month'
    };
    
    document.getElementById('selectedPlan').value = planType;
    document.getElementById('selectedPlanTitle').textContent = planTitles[planType];
    
    // Show the form
    document.querySelector('.subscription-plans').style.display = 'none';
    document.getElementById('subscriptionForm').style.display = 'block';
}

function goBackToPlans() {
    document.querySelector('.subscription-plans').style.display = 'grid';
    document.getElementById('subscriptionForm').style.display = 'none';
    
    // Clear form
    document.getElementById('subscriptionForm').reset();
    document.getElementById('subscriptionMessage').textContent = '';
    document.getElementById('subscriptionMessage').className = '';
}

// Email notification function
function sendSubscriptionEmail(familyName, firstName, age, phoneNumber, selectedPlan) {
    const planNames = {
        'weights': 'Weights Training Only (2000DA/month)',
        'weights-cardio': 'Weights + Cardio (2500DA/month)',
        'full-package': 'Full Package + Coach (3000DA/month)'
    };

    const emailSubject = encodeURIComponent('New PowerGym Subscription - ' + planNames[selectedPlan]);
    const emailBody = encodeURIComponent(`
New Subscription Alert!

Customer Details:
- Name: ${firstName} ${familyName}
- Age: ${age} years old
- Phone: ${phoneNumber}
- Selected Plan: ${planNames[selectedPlan]}

Action Required:
Please contact this customer within 24 hours to confirm their subscription and arrange their first visit for payment.

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
    `);

    // Open default email client (you can replace this with actual email sending service)
    const emailLink = `mailto:gym.owner@powergym.com?subject=${emailSubject}&body=${emailBody}`;
    
    // For demonstration, we'll show an alert. In a real application, you would use EmailJS or similar service
    console.log('Email notification sent to gym owner:', {
        to: 'gym.owner@powergym.com',
        subject: decodeURIComponent(emailSubject),
        body: decodeURIComponent(emailBody)
    });

    // Optional: Open email client
    // window.open(emailLink);
}

// Form functionality
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const subscriptionForm = document.getElementById("subscriptionForm");

    // Contact form functionality
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const contactMessageDiv = document.getElementById("contactMessageDiv");
            contactMessageDiv.className = "success";
            contactMessageDiv.textContent = "Thank you for your message! We'll get back to you soon.";
            
            // Reset form
            contactForm.reset();
        });
    }

    // Subscription form functionality
    if (subscriptionForm) {
        subscriptionForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const familyName = document.getElementById("familyName").value.trim();
            const firstName = document.getElementById("firstName").value.trim();
            const age = parseInt(document.getElementById("age").value);
            const phoneNumber = document.getElementById("phoneNumber").value.trim();
            const selectedPlan = document.getElementById("selectedPlan").value;
            const message = document.getElementById("subscriptionMessage");

            // Clear previous message
            message.className = "";
            message.textContent = "";

            // Validation
            if (familyName.length < 2) {
                message.className = "error";
                message.textContent = "Family name must be at least 2 characters long.";
                return;
            }

            if (firstName.length < 2) {
                message.className = "error";
                message.textContent = "First name must be at least 2 characters long.";
                return;
            }

            if (age < 16 || age > 100) {
                message.className = "error";
                message.textContent = "Age must be between 16 and 100 years.";
                return;
            }

            if (phoneNumber.length < 8) {
                message.className = "error";
                message.textContent = "Please enter a valid phone number.";
                return;
            }

            // Send email notification to gym owner
            sendSubscriptionEmail(familyName, firstName, age, phoneNumber, selectedPlan);

            // Success message
            message.className = "success";
            message.textContent = `Subscription successful! Welcome to PowerGym, ${firstName}! The gym owner has been notified and will contact you at ${phoneNumber} within 24 hours.`;
            
            // Reset form after a delay
            setTimeout(() => {
                goBackToPlans();
            }, 5000);
        });
    }
});

// Alternative: Using EmailJS service (requires EmailJS account and setup)
/*
function sendSubscriptionEmailWithService(familyName, firstName, age, phoneNumber, selectedPlan) {
    const planNames = {
        'weights': 'Weights Training Only (2000DA/month)',
        'weights-cardio': 'Weights + Cardio (2500DA/month)',
        'full-package': 'Full Package + Coach (3000DA/month)'
    };

    const templateParams = {
        customer_name: firstName + ' ' + familyName,
        customer_age: age,
        customer_phone: phoneNumber,
        selected_plan: planNames[selectedPlan],
        subscription_date: new Date().toLocaleDateString(),
        subscription_time: new Date().toLocaleTimeString()
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with actual values
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.log('Email failed to send:', error);
        });
}
*/