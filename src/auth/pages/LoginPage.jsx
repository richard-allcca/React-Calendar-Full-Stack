import { useFrom } from '../../hooks/useForm';
import './login.css';
import { useAuthStore } from './../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useFrom(loginFormFields);
  const {
    registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange
  } = useFrom(registerFormFields);

  const { errorMessage, startLogin, startRegister } = useAuthStore();

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email:loginEmail, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if(registerPassword !== registerPassword2){
      Swal.fire( 'Error en registro' , 'Las contraseñas deben ser iguales', 'error');
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  };

  useEffect(() => {
    if(errorMessage != undefined){
      Swal.fire( 'Error en la autenticación' ,errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">

        {/* SECTION - lOGIN */ }

        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit} >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        {/* SECTION - REGISTRO */ }

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit} >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
                />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
                />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
