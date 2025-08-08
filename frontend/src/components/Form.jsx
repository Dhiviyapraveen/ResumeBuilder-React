import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Form() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    education: "",
    skills: "",
    certifications: "",
    projects: "",
    internships: "",
    achievements: "",
  });

  const navigate = useNavigate();
  const loggedInEmail = localStorage.getItem("userEmail"); // ✅ Get email from login

  async function rewriteSection(field) {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, text: form[field] }),
    });
    const { rewritten } = await res.json();
    setForm((prev) => ({ ...prev, [field]: rewritten }));
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        email: loggedInEmail || form.email, // ✅ Force logged-in email
      };

      const response = await fetch("http://localhost:5000/api/resume/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/resume", { state: { resumeData: payload } });
      } else {
        console.error("Failed to submit resume");
      }
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  const handleGeneratePDF = () => {
    const resumeElement = document.getElementById("resume-preview");
    if (!resumeElement) {
      alert("No resume preview found!");
      return;
    }
    import("html2pdf.js").then((html2pdf) => {
      html2pdf
        .default()
        .from(resumeElement)
        .set({
          margin: 1,
          filename: "resume.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    });
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-10">
      {/* FORM */}
      <form className="form-section flex-1 space-y-4">
        {/* Basic Info */}
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone" },
          { label: "LinkedIn", name: "linkedin" },
          { label: "GitHub", name: "github" },
        ].map(({ name, label, type = "text" }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={label}
              value={form[name]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [name]: e.target.value }))
              }
            />
          </div>
        ))}

        {/* Resume Sections */}
        {[
          "education",
          "skills",
          "certifications",
          "projects",
          "internships",
          "achievements",
        ].map((field) => (
          <div key={field} className="form-group">
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <textarea
              name={field}
              placeholder={`Enter your ${field}`}
              value={form[field]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
            <button type="button" onClick={() => rewriteSection(field)}>
              ✨ Rewrite
            </button>
          </div>
        ))}

        {/* Buttons */}
        <div className="actions flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate Resume
          </button>
          <button
            type="button"
            onClick={handleGeneratePDF}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Generate PDF
          </button>
        </div>
      </form>

      {/* LIVE PREVIEW */}
      <div
        id="resume-preview"
        className="preview flex-1 bg-white shadow p-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold text-purple-700">
          {form.fullName || "Your Name"}
        </h1>
        <p className="text-gray-700">
          {loggedInEmail || form.email} | {form.phone}
        </p>
        <p className="text-gray-700">
          <a href={form.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href={form.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>

        {[
          { label: "Education", value: form.education },
          { label: "Skills", value: form.skills },
          { label: "Certifications", value: form.certifications },
          { label: "Projects", value: form.projects },
          { label: "Internships", value: form.internships },
          { label: "Achievements", value: form.achievements },
        ].map(
          (section) =>
            section.value && (
              <section key={section.label} className="mt-4">
                <h2 className="text-xl font-semibold text-purple-600">
                  {section.label}
                </h2>
                <p className="whitespace-pre-wrap text-gray-800">
                  {section.value}
                </p>
              </section>
            )
        )}
      </div>
    </div>
  );
}
