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

  async function rewriteSection(field) {
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, text: form[field] }),
    });
    const { rewritten } = await res.json();
    setForm(prev => ({ ...prev, [field]: rewritten }));
  }

  return (
    <div className="form-wrapper">
      <form className="form-section">
        {/* Basic Info */}
        {[
          { label: 'Full Name', name: 'fullName' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone' },
          { label: 'LinkedIn', name: 'linkedin' },
          { label: 'GitHub', name: 'github' },
        ].map(({ name, label, type = 'text' }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={label}
              value={form[name]}
              onChange={e => setForm(prev => ({ ...prev, [name]: e.target.value }))}
            />
          </div>
        ))}

        {/* Resume Sections */}
        {[
          'education', 'skills', 'certifications', 'projects', 'internships', 'achievements',
        ].map(field => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <textarea
              name={field}
              placeholder={`Enter your ${field}`}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            />
            <button type="button" onClick={() => rewriteSection(field)}>
              ✨ Rewrite
            </button>
          </div>
        ))}

        {/* Actions */}
        <div className="actions">
          <button type="button">Generate Resume</button>
          <button type="button">Download PDF</button>
        </div>
      </form>

      <div className="preview">
        <p>Preview will be displayed here</p>
      </div>
    </div>
  );
}
