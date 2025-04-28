import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/google.svg";
import { signInWithGoogle } from "../../utils/getGoogleUrl";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";

const signupSchema = object({
  name: string().min(1, "Name is required"),
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
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/profile";

  const {
    setRequestLoading,
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
    try {
      setRequestLoading(true);
      const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

      const res = await fetch(`${endpoint}/auth/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) throw result;

      loginWithToken(result.token);
      navigate('/profile');
    } catch (error: any) {
      setRequestLoading(false);

      if (error?.error) {
        error.error.forEach((e: any) =>
          toast.error(e.message, { position: "top-right" })
        );
        return;
      }

      toast.error(error.message || "Something went wrong", {
        position: "top-right",
      });
    } finally {
      setRequestLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignupInput> = (values) => {
    signupUser(values);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative bg-white">
      <div className="flex flex-col justify-center items-center border rounded-[49px] shadow-md md:w-[1039.58px] md:px-[80px] px-[20px] bg-white z-10 mb-[200px] mt-[100px]">
        <div className="flex justify-center items-center gap-6 mt-[50px]">
          <div>
            <svg width="153" height="153" viewBox="0 0 154 156" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.201 28.5342C153.201 12.8016 140.404 0 124.672 0C108.94 0 96.1433 12.8016 96.1433 28.5342C96.1433 44.2668 108.942 57.0684 124.672 57.0684C128.323 57.0684 131.803 56.3537 135.016 55.0971C139.05 65.4837 145.023 88.0868 132.383 110.347C122.047 128.547 100.814 138.945 76.5557 138.769L76.5499 151.81C76.7372 151.81 78.2931 151.81 78.4804 151.81C107.309 151.81 131.072 139.063 143.721 116.785C160.352 87.496 150.809 58.4892 145.98 47.4398C150.458 42.3993 153.201 35.7881 153.201 28.5313V28.5342ZM109.182 28.5342C109.182 19.9921 116.132 13.0408 124.672 13.0408C133.212 13.0408 140.162 19.9921 140.162 28.5342C140.162 37.0763 133.215 44.0276 124.672 44.0276C116.129 44.0276 109.182 37.0792 109.182 28.5342Z" fill="#361BD0"/>
              <path d="M1.03154 128.062C1.36001 143.792 14.4242 156.323 30.1509 155.994C45.8775 155.666 58.4058 142.599 58.0773 126.866C57.7488 111.137 44.6846 98.6059 28.9551 98.9345C25.3044 99.0123 21.8381 99.7991 18.6541 101.122C14.4012 90.8218 7.9584 68.3512 20.1294 45.8288C30.0817 27.416 52.2886 16.6115 76.547 16.2772V3.23352C76.3597 3.2364 73.34 3.23928 73.1527 3.24217C44.3302 3.84738 20.8411 17.0871 8.65858 39.6268C-7.35619 69.2561 2.79207 98.0612 7.85179 109.004C3.48072 114.137 0.875941 120.806 1.02865 128.062H1.03154ZM45.039 127.14C45.2176 135.679 38.4147 142.775 29.8771 142.953C21.3396 143.132 14.2456 136.328 14.0669 127.789C13.8883 119.246 20.6884 112.154 29.2288 111.975C37.7693 111.797 44.8604 118.598 45.039 127.14Z" fill="#361BD0"/>
              <path d="M76.547 102.505C91.2336 102.505 103.139 90.5971 103.139 75.9077C103.139 61.2183 91.2336 49.3102 76.547 49.3102C61.8605 49.3102 49.9547 61.2183 49.9547 75.9077C49.9547 90.5971 61.8605 102.505 76.547 102.505Z" fill="#361BD0"/>
            </svg>
          </div>

          <p className="text-[3.5rem] font-bold text-[#3A3A3A]">gestiona</p>
        </div>

        <p className="text-[2.5rem] font-bold text-primary mt-[47px]">¡Crea tu cuenta!</p>

        <input
          type="text"
          placeholder="Nombre completo*"
          className="w-full h-[103px] bg-secondary rounded-[30px] mt-[32px] p-7 text-2xl"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xl mt-2">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Correo electrónico*"
          className="w-full h-[103px] bg-secondary rounded-[30px] mt-[32px] p-7 text-2xl"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xl mt-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Contraseña*"
          className="w-full h-[103px] bg-secondary rounded-[30px] mt-[32px] p-7 text-2xl"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xl mt-2">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirmar contraseña*"
          className="w-full h-[103px] bg-secondary rounded-[30px] mt-[32px] p-7 text-2xl"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xl mt-2">{errors.confirmPassword.message}</p>
        )}

        <div className="flex flex-row w-full gap-3 justify-between items-center mt-[32px]">
          <label className="text-2xl font-bold flex items-center gap-2">
            <input type="checkbox" className="w-6 h-6 accent-primary"/>
            Mostrar Contraseña
          </label>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-primary text-white text-2xl font-bold rounded-[54px] w-full h-[103px] mt-[76px]"
        >
          Registrarse
        </button>

        <div className="flex items-center w-full mt-8 mb-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-ct-grey text-xl">o</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-4 border-2 border-gray-300 text-2xl font-bold rounded-[54px] w-full h-[103px] hover:bg-gray-50 transition-colors"
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-8 h-8" />
          Continuar con Google
        </button>

        <p className="text-ct-grey text-2xl mt-[47.5px] mb-[62.5px] font-bold">
          ¿Ya tienes una cuenta? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/login')}>Inicia sesión</span>
        </p>
      </div>

      <div className="flex h-[454px] justify-center items-center bg-primary w-full text-white absolute bottom-0 z-0">
        <div className="md:w-[1039.58px] pt-[180px] w-full flex justify-center">
          <p className="text-2xl font-bold text-white">¿Ya tienes cuenta? Inicia sesión aquí.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;