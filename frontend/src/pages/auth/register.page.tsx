import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/google.svg";
import { signInWithGoogle } from "../../utils/getGoogleUrl";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const signupSchema = object({
  first_name: string().min(1, "Name is required"),
  email: string().min(1, "Email is required").email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Must be at least 8 characters")
    .max(32, "Must be under 32 characters"),
  confirmPassword: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type SignupInput = TypeOf<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [requestLoading, setRequestLoading] = useState(false);

  const {
    loginWithToken,
  } = useAppStore.authStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const signupUser = async (data: SignupInput) => {
    const signupData = {
      first_name: data.first_name,
      email: data.email,
      password: data.password
    }
    try {
      setRequestLoading(true);
      const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;
      const res = await fetch(`${endpoint}/auth/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(signupData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) throw result;

      loginWithToken(result.token);
      navigate('/permission');
    } catch (error: any) {
      setRequestLoading(false);
      if (error?.error) {
        error.error.forEach((e: any) =>
          toast.error(e.message, { position: "top-right" })
        );
        return;
      }
      toast.error(error.message || "Algo salió mal", {position: "top-right"});
    } finally {
      setRequestLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignupInput> = (values) => {
    signupUser(values);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 relative">
      <div className="w-full max-w-[700px] flex flex-col justify-center items-center mt-[10px] mb-[75px] border rounded-[24px] sm:rounded-[49px] shadow-md px-4 sm:px-8 md:px-[80px] py-8 sm:py-3 bg-white z-20 relative sm:mt-[30px] md:mb-[110px]">
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-0 sm:mt-5">
          <div className="w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]">
            <svg width="100%" height="100%" viewBox="0 0 154 156" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.201 28.5342C153.201 12.8016 140.404 0 124.672 0C108.94 0 96.1433 12.8016 96.1433 28.5342C96.1433 44.2668 108.942 57.0684 124.672 57.0684C128.323 57.0684 131.803 56.3537 135.016 55.0971C139.05 65.4837 145.023 88.0868 132.383 110.347C122.047 128.547 100.814 138.945 76.5557 138.769L76.5499 151.81C76.7372 151.81 78.2931 151.81 78.4804 151.81C107.309 151.81 131.072 139.063 143.721 116.785C160.352 87.496 150.809 58.4892 145.98 47.4398C150.458 42.3993 153.201 35.7881 153.201 28.5313V28.5342ZM109.182 28.5342C109.182 19.9921 116.132 13.0408 124.672 13.0408C133.212 13.0408 140.162 19.9921 140.162 28.5342C140.162 37.0763 133.215 44.0276 124.672 44.0276C116.129 44.0276 109.182 37.0792 109.182 28.5342Z" fill="#361BD0"/>
              <path d="M1.03154 128.062C1.36001 143.792 14.4242 156.323 30.1509 155.994C45.8775 155.666 58.4058 142.599 58.0773 126.866C57.7488 111.137 44.6846 98.6059 28.9551 98.9345C25.3044 99.0123 21.8381 99.7991 18.6541 101.122C14.4012 90.8218 7.9584 68.3512 20.1294 45.8288C30.0817 27.416 52.2886 16.6115 76.547 16.2772V3.23352C76.3597 3.2364 73.34 3.23928 73.1527 3.24217C44.3302 3.84738 20.8411 17.0871 8.65858 39.6268C-7.35619 69.2561 2.79207 98.0612 7.85179 109.004C3.48072 114.137 0.875941 120.806 1.02865 128.062H1.03154ZM45.039 127.14C45.2176 135.679 38.4147 142.775 29.8771 142.953C21.3396 143.132 14.2456 136.328 14.0669 127.789C13.8883 119.246 20.6884 112.154 29.2288 111.975C37.7693 111.797 44.8604 118.598 45.039 127.14Z" fill="#361BD0"/>
              <path d="M76.547 102.505C91.2336 102.505 103.139 90.5971 103.139 75.9077C103.139 61.2183 91.2336 49.3102 76.547 49.3102C61.8605 49.3102 49.9547 61.2183 49.9547 75.9077C49.9547 90.5971 61.8605 102.505 76.547 102.505Z" fill="#361BD0"/>
            </svg>
          </div>

          <p className="text-[26px] sm:text-[30px] font-bold text-[#3A3A3A]">gestiona</p>
        </div>

        <p className="text-[18px] sm:text-[22px] font-bold text-primary mt-3 sm:mt-[26px]">¡Crea tu cuenta!</p>

        <input
          type="text"
          placeholder="Nombre completo*"
          className="w-full h-[54px] sm:h-[64px] bg-secondary rounded-[10px] sm:rounded-[15px] mt-[10px] px-4 sm:p-7 text-base sm:text-xl"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 text-xl mt-2">Se requiere nombre</p>
        )}

        <input
          type="email"
          placeholder="Correo electrónico*"
          className="w-full h-[54px] sm:h-[64px] bg-secondary rounded-[15px] sm:rounded-[15px] mt-3 sm:mt-[20px] px-4 sm:p-7 text-base sm:text-xl"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xl mt-2">Se requiere correo electrónico</p>
        )}

        <input
          type="password"
          placeholder="Contraseña*"
          className="w-full h-[54px] sm:h-[64px] bg-secondary rounded-[15px] sm:rounded-[15px] mt-3 sm:mt-[20px] p-7 text-base sm:text-xl"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xl mt-2">Se requiere contraseña</p>
        )}

        <input
          type="password"
          placeholder="Confirmar contraseña*"
          className="w-full h-[54px] sm:h-[64px] bg-secondary rounded-[15px] sm:rounded-[15px] mt-3 sm:mt-[20px] p-7 text-base sm:text-xl"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xl mt-2">Confirme su contraseña</p>
        )}

        <div className="flex flex-col sm:flex-row w-full gap-3 justify-between items-start sm:items-center mt-4 sm:mt-[14px]">
          <label className="text-base sm:text-sm font-bold flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 accent-primary"/>
            Mostrar Contraseña
          </label>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className={`${requestLoading ? 'bg-disableColor' : 'bg-primary'} text-white text-base sm:text-lg font-bold rounded-[27px] sm:rounded-[54px] w-full h-[42px] sm:h-[48px] mt-6 sm:mt-[24px]`}
          disabled={requestLoading}
        >
          {requestLoading ? <LoadingSpinner /> : "Registrarse"}
        </button>
        <div className="flex items-center w-full mt-1 sm:mt-3 mb-1 sm:mb-3">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-ct-grey text-xl">o</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-4 border-2 border-grey-300 text-base font-bold rounded-[27px] sm:rounded-[54px] w-full h-[42px] sm:h-[48px] hover:bg-gray-50 transition-colors"
          disabled={requestLoading}
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-7 h-7" />
          Continuar con Google
        </button>

        <p className="text-ct-grey text-sm sm:text-lg mt-4 sm:mt-[28px] mb-4 sm:mb-[15px] font-bold text-center">
          ¿Ya tienes una cuenta? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/signin')}>Inicia sesión</span>
        </p>
      </div>
      <div className="flex h-[120px] md:h-[180px] justify-center items-center bg-primary w-full text-white absolute bottom-0 z-0">
        <div className="md:w-[1040px] pt-[25px] md:pt-[60px] w-full flex justify-center">
          <p className="text-1xl sm:text-lg font-bold text-white">¿Ya tienes cuenta? Inicia sesión aquí.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;