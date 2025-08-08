import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    certifications: "",
    projects: "",
    internships: "",
    achievements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateResume = async () => {
    try {
      await axios.post("http://localhost:5000/api/resume", formData);
      navigate("/resume");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/resume", formData);
      if (response.status === 200) {
        const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.json"; // You can replace with actual PDF generation logic later
        a.click();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h2>Fill your details</h2>

        {["name", "email", "phone", "education", "skills", "certifications", "projects", "internships", "achievements"].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" name={field} value={formData[field]} onChange={handleChange} />
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="resume-btn" onClick={handleGenerateResume}>
            Generate Resume
          </button>
          <button type="button" className="pdf-btn" onClick={handleGeneratePDF}>
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
}
