const handleGenerateResume = async () => {
  const email = localStorage.getItem("userEmail"); // get from login
  if (!email) {
    alert("Please log in first!");
    return;
  }

  const resumeData = {
    // collect your resume fields here
    personalInfo,
    education,
    skills,
    certifications,
    projects,
    internships,
    achievements
  };

  try {
    const response = await fetch("http://localhost:5000/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resumeData }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Resume saved successfully:", data);
      // Trigger your PDF generation here
    } else {
      console.error(data.message || "Failed to save resume");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
