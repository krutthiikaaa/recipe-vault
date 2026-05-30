import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const success = await login({ email, password });
    if (!success) {
      setError('Invalid email or password.');
      return;
    }

    setInfo('Login successful! Redirecting to home...');
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        background: 'radial-gradient(circle at top, rgba(255,127,80,0.14), transparent 35%), linear-gradient(180deg, #121217 0%, #0b0b0f 100%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 999,
              background: 'rgba(255,127,80,0.15)',
              border: '1px solid rgba(255,127,80,0.22)',
              color: '#ffb86c',
              fontWeight: 700,
              letterSpacing: 1.8,
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            <ChefHat size={20} />
            Recipe Vault
          </div>
          <h1 style={{ color: '#f9f7f1', margin: '22px 0 10px', fontSize: '2.6rem', lineHeight: 1.05 }}>
            Welcome back
          </h1>
          <p style={{ color: '#b3b3b8', margin: 0, fontSize: '1rem' }}>
            Login to access your saved recipes, favorites, and personalized vault.
          </p>
        </div>

        <div
          style={{
            borderRadius: 26,
            backgroundColor: 'rgba(24,24,26,0.9)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.25)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '28px 28px 20px',
              background: 'rgba(255,127,80,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p style={{ margin: 0, color: '#ffb86c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.6, fontSize: 12 }}>
              Secure sign in
            </p>
          </div>

          <div style={{ padding: 30 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#dcd7c9', fontSize: 14 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: '#121214',
                    color: '#f7f7f9',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#dcd7c9', fontSize: 14 }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: '#121214',
                    color: '#f7f7f9',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
                  }}
                />
              </div>

              {error && (
                <p style={{ color: '#f06c6c', marginBottom: 18, fontSize: 14 }}>{error}</p>
              )}
              {info && (
                <p style={{ color: '#8bc34a', marginBottom: 18, fontSize: 14 }}>{info}</p>
              )}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px 0',
                  borderRadius: 16,
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff8f59, #ff5d37)',
                  color: '#111',
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 18px 30px rgba(255,95,55,0.18)',
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <p style={{ color: '#b3b3b8', marginTop: 18, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link to="/signup" style={{ color: '#ffb86c', textDecoration: 'none', fontWeight: 700 }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;