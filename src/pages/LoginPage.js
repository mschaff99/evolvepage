import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/panel');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="login wrap">
        <form onSubmit={handleSubmit}>
          <div className="h1">Iniciar Sesión</div>
          {error && <div className="error-message">{error}</div>}
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario" 
            type="text" 
            autoComplete="off"
            required
          />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña" 
            type="password" 
            required
          />
          <input 
            value={loading ? "Cargando..." : "Ingresar"} 
            className="btn" 
            type="submit"
            disabled={loading}
          />
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1e1e1e;

  .login {
    width: 340px;
    height: 400px;
    background: #2c2c2c;
    padding: 47px;
    padding-bottom: 57px;
    color: #fff;
    border-radius: 17px;
    font-size: 1.3em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .login input[type="text"],
  .login input[type="password"] {
    opacity: 1;
    display: block;
    border: none;
    outline: none;
    width: 100%;
    padding: 13px 18px;
    margin: 20px 0 0 0;
    font-size: 0.8em;
    border-radius: 100px;
    background: #3c3c3c;
    color: #fff;
  }

  .login input:focus {
    animation: bounce 1s;
    -webkit-appearance: none;
  }

  .login input[type=submit],
  .login input[type=button],
  .h1 {
    border: 0;
    outline: 0;
    width: 100%;
    padding: 13px;
    margin: 40px 0 0 0;
    border-radius: 500px;
    font-weight: 600;
    animation: bounce2 1.6s;
  }

  .h1 {
    padding: 0;
    position: relative;
    top: -35px;
    display: block;
    margin-bottom: -0px;
    font-size: 1.3em;
  }

  .btn {
    background: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    color: #fff;
    padding: 16px !important;
  }

  .btn:hover {
    background: linear-gradient(144deg, #1e1e1e, 20%, #1e1e1e 50%, #1e1e1e);
    color: rgb(255, 255, 255);
    padding: 16px !important;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .login input[type=text] {
    animation: bounce 1s;
    -webkit-appearance: none;
  }

  .login input[type=password] {
    animation: bounce1 1.3s;
  }

  @media only screen and (max-width: 600px) {
    .login {
      width: 70%;
      padding: 3em;
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(-250px);
      opacity: 0;
    }
  }

  @keyframes bounce1 {
    0% {
      opacity: 0;
    }
    40% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }

  @keyframes bounce2 {
    0% {
      opacity: 0;
    }
    70% {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
`;

export default LoginPage;