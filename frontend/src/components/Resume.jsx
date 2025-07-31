import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

export default function Resume() {
  const { state } = useLocation();
  const ref = useRef();
  const r = state?.resumeData;

  if (!r) return <p className="p-6">No resume data—please start from the form.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 max-w-3xl mx-auto shadow" ref={ref}>
        <h1 className="text-primary text-4xl font-bold mb-4">{r.fullName}</h1>
        <p className="text-gray-700 mb-6">{r.contact}</p>
        {r.summary && (
          <section className="mb-6">
            <h2 className="text-2xl text-primary font-semibold mb-2">Summary</h2>
            <p>{r.summary}</p>
          </section>
        )}
        {r.experience && (
          <section className="mb-6">
            <h2 className="text-2xl text-primary font-semibold mb-2">Experience</h2>
            <p className="whitespace-pre-wrap">{r.experience}</p>
          </section>
        )}
        {r.education && (
          <section className="mb-6">
            <h2 className="text-2xl text-primary font-semibold mb-2">Education</h2>
            <p className="whitespace-pre-wrap">{r.education}</p>
          </section>
        )}
        {r.skills && (
          <section>
            <h2 className="text-2xl text-primary font-semibold mb-2">Skills</h2>
            <p>{r.skills}</p>
          </section>
        )}
      </div>

      <div className="text-center mt-6">
        <ReactToPrint
          trigger={() => (
            <button className="bg-primary text-white px-5 py-2 rounded hover:bg-primary-dark">
              Print / Download PDF
            </button>
          )}
          content={() => ref.current}
        />
      </div>
    </div>
  );
}
