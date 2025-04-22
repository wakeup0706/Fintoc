import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppStore } from "../store";
import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = object({
  first_name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const store = useAppStore.authStore();
  const API_BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT;

  const extractErrorMessages = (error: any): string[] => {
    if (Array.isArray(error?.error)) {
      return error.error.map((e: any) => e.message);
    }
    if (error?.message) return [error.message];
    return ["Something went wrong"];
  };

  const registerUser = async (data: RegisterInput) => {
    const param = {
      email: data.email,
      first_name: data.first_name,
      password: data.password,
    };

    try {
      store?.setRequestLoading?.(true);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(param),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw await response.json();
      }

      toast.success("Account created successfully", { position: "top-right" });
      store.setRequestLoading(false);
      navigate("/signin");
    } catch (error: any) {
      store.setRequestLoading(false);
      extractErrorMessages(error).forEach((msg) =>
        toast.error(msg, { position: "top-right" })
      );
    }
  };

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <section className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-6">
              <input
                type="text"
                autoComplete="name"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Name"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="email"
                autoComplete="email"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                autoComplete="new-password"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                autoComplete="new-password"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Confirm Password"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={store?.requestLoading}
              className={`inline-block px-7 py-4 ${
                store?.requestLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium text-sm leading-snug uppercase rounded shadow-md focus:shadow-lg focus:outline-none active:shadow-lg transition duration-150 ease-in-out w-full`}
            >
              {store?.requestLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
