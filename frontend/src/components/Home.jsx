import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (email && password) {
      try {
        const res = await fetch(`http://localhost:5000/api/${mode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert(`${mode === 'login' ? 'Login' : 'Registration'} successful!`);
          navigate('/form', { state: { userEmail: email } });
        } else {
          setError(data.msg || 'Something went wrong');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong. Try again.');
      }
    } else {
      setError('All fields are required');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-purple-500 mb-6 text-center">
          ResumeCraft {mode === 'login' ? 'Login' : 'Register'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
          >
            {mode === 'login' ? 'Login' : 'Register'} & Build Resume
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-purple-400 hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-purple-400 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
