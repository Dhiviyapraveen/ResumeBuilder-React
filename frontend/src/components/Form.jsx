import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    education: '',
    skills: '',
    certifications: '',
    projects: '',
    internships: '',
    achievements: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="form-wrapper">
      <div className="container">
        {/* Left Side: Form */}
        <form className="form-section">
          <h2 className="section-title">Personal Information</h2>

          {[
            { name: 'fullName', placeholder: 'Full Name' },
            { name: 'email', placeholder: 'Email Address', type: 'email' },
            { name: 'phone', placeholder: 'Phone Number' },
            { name: 'linkedin', placeholder: 'LinkedIn Profile URL' },
            { name: 'github', placeholder: 'GitHub Profile URL' },
          ].map(({ name, placeholder, type = 'text' }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
            />
          ))}

          {[
            'education',
            'skills',
            'certifications',
            'projects',
            'internships',
            'achievements',
          ].map((field) => (
            <div key={field}>
              <h2 className="section-title">{field.charAt(0).toUpperCase() + field.slice(1)}</h2>
              <textarea
                name={field}
                placeholder={`Enter your ${field}...`}
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="actions">
            <button>Generate Resume</button>
            <button>Download PDF</button>
          </div>
        </form>

        {/* Right Side: Preview */}
        <div className="preview">
          <p>Your resume preview will appear here.</p>
        </div>
      </div>
    </div>
  );
}
