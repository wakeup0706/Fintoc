import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";
import Header from "../../components/allow_layout/Header";
import TopSection from "../../components/allow_layout/TopSection";
import Gestiona from "../../components/allow_layout/gestiona/Gestiona";
import Faltan from "../../components/allow_layout/Faltan";
import Footer from "../../components/allow_layout/footer/Footer";

const loginSchema = object({
  email: string().min(1, "Email is required").email("Invalid email"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const AllowPage = () => {
 const navigate = useNavigate();
   const [requestLoading, setRequestLoading] = useState(false);
 
   const {
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
       navigate('/profile');
     } catch (error: any) {
       setRequestLoading(false);
       console.log("herer=>", requestLoading)
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
    <>
      <Header />
      <TopSection isRequestLoading={requestLoading} />
      <Gestiona />
      <Faltan />
      <Footer />
    </>
  );
};

export default AllowPage;