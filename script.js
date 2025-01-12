document.addEventListener("DOMContentLoaded", () => {
    const features = [
        'Drawing', 'Dancing', 'Singing', 'Sports', 'Video Game', 'Acting', 'Travelling', 'Gardening',
        'Animals', 'Photography', 'Teaching', 'Exercise', 'Coding', 'Electricity Components',
        'Mechanic Parts', 'Computer Parts', 'Researching', 'Architecture', 'Historic Collection',
        'Botany', 'Zoology', 'Physics', 'Accounting', 'Economics', 'Sociology', 'Geography',
        'Psychology', 'History', 'Science', 'Business Education', 'Chemistry', 'Mathematics',
        'Biology', 'Makeup', 'Designing', 'Content Writing', 'Crafting', 'Literature', 'Reading',
        'Cartooning', 'Debating', 'Astrology', 'Hindi', 'French', 'English', 'Urdu', 'Other Language',
        'Solving Puzzles', 'Gymnastics', 'Yoga', 'Engineering', 'Doctor', 'Pharmacist', 'Cycling',
        'Knitting', 'Director', 'Journalism', 'Business', 'Listening to Music'
    ];

    const featuresContainer = document.getElementById("features");
    const submitBtn = document.getElementById("submitBtn");
    const resultContainer = document.getElementById("result");
    const careerOutput = document.getElementById("career");

    // Dynamically generate feature inputs
    features.forEach(feature => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <label>
                <input type="checkbox" name="${feature}" value="1">
                ${feature}
            </label>
        `;
        featuresContainer.appendChild(wrapper);
    });

    submitBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#features input");
        const userPreferences = {};
        inputs.forEach(input => {
            userPreferences[input.name] = input.checked ? 1 : 0;
        });

        // Send data to the backend
        fetch("http://127.0.0.1:3000/career", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPreferences),
        })
            .then(response => response.json())
            .then(data => {
                resultContainer.classList.remove("hidden");
                careerOutput.textContent = data.recommendedCareer;
            })
            .catch(err => console.error("Error:", err));
    });

    // Multi-step form logic
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");

    function showStep() {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        // Update button visibility
        document.getElementById("prevBtn").style.display = currentStep === 0 ? "none" : "inline-block";
        document.getElementById("nextBtn").innerText = currentStep === steps.length - 1 ? "Submit" : "Next";
    }

    function changeStep(step) {
        if (step === 1 && currentStep === steps.length - 1) {
            submitBtn.click();
            return;
        }
        currentStep += step;
        showStep();
    }

    // Initial setup
    showStep();

    // Event listeners for navigation buttons
    document.getElementById("prevBtn").addEventListener("click", () => changeStep(-1));
    document.getElementById("nextBtn").addEventListener("click", () => changeStep(1));
});
