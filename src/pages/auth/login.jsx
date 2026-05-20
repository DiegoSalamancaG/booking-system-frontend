import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import useAuthStore from "../../store/authStore";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // metodo para manejar el submit del formulario de login
  const onSubmit = async (data) => {
    try {
      // resetear error antes de hacer la petición
      setApiError(null); 

      const response = await api.post("/auth/login", data);

      const { token, user } = response.data.data;

      login(token, user);

      // redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      setApiError(error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login Barber Shop</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="correo"
            {...register("email")}
          />
          {errors.email && <p>Email requerido</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="contraseña"
            {...register("password")}
          />
          {errors.password && <p>Contraseña requerida</p>}
        </div>

        {apiError && <p style={{ color: "red" }}>{apiError}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;