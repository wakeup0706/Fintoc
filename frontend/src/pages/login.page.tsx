import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google.svg";
import { signInWithGoogle } from "../utils/getGoogleUrl";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../store";
import { toast } from "react-toastify";

const loginSchema = object({
  email: string().min(1, "Email is required").email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Must be at least 8 characters")
    .max(32, "Must be under 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
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
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginUser = async (data: LoginInput) => {
    try {
      setRequestLoading(true);
      const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

      const res = await fetch(`${endpoint}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) throw result;

      loginWithToken(result.token);
      navigate(from);
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

  const onSubmit: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <section className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email address"
                className="form-control w-full px-4 py-5 text-sm text-gray-700 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="form-control w-full px-4 py-5 text-sm text-gray-700 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 focus:outline-none transition"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className="text-gray-800">Remember me</label>
              </div>
              <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-medium uppercase rounded shadow hover:bg-blue-700 transition"
            >
              Sign in
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-sm font-semibold">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                signInWithGoogle();
              }}
              className="w-full py-2 flex justify-center items-center bg-[#3b5998] text-white rounded hover:bg-[#334d84] transition"
            >
              <img src={GoogleLogo} alt="Google" className="h-8 pr-2" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
