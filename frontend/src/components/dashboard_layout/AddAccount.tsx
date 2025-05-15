import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPluse from "../common/ButtonPlus";
import { ChileLogo } from "../icons";
import { useAppStore } from "../../store";

declare global {
  interface Window {
    belvoSDK?: any;
  }
}

const AddAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");

   const {
    getUser,
  } = useAppStore.authStore.getState();

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.language) {
      const locale = navigator.language; // e.g., "en-US"
      const code = locale.split("-")[1] || "US"; // fallback to 'US' if not found
      setCountryCode(code);

      // Optional: Convert code to full country name (using Intl.DisplayNames)
      if (typeof Intl.DisplayNames === "function") {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        const fullName = regionNames.of(code) || "Unknown Country";
        setCountryName(fullName);
      }
    }
  }, []);

  console.log(countryName, countryCode);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.belvo.io/belvo-widget-1-stable.js";
    script.async = true;

    script.onload = () => {
      console.log("Belvo script loaded successfully.");
    };

    script.onerror = () => {
      setError("Failed to load Belvo script.");
    };

    document.body.appendChild(script);
  }, []);

  const handleBankAccountClick = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;
      const token = getUser(); // assuming getUser() returns the token
      const { data } = await axios.get(`${endpoint}/api/belvo/link`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        withCredentials: true // if you want to include cookies as well
      });
      const access_token = data.access;

      if (!window.belvoSDK) {
        setError("Belvo SDK not loaded.");
        return;
      }

      const widget = window.belvoSDK.createWidget(access_token, {
        locale: "es",
        access_mode: "recurrent",
        callback: async (link: any, institution: any) => {
          console.log("Belvo success:", link, institution);

          try {
            const response = await fetch(`${endpoint}/api/recurring-expenses/information?link=${link}?institutionName=${institution}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
              },
            });

            const data = await response.json();
            console.log("📦 Subscription info:", data);
          } catch (apiError) {
            console.error("❌ Failed to fetch subscription info:", apiError);
          }
        },
        onEvent: (event: any) => {
          console.log("Belvo event:", event);
        },
        onExit: (data: any) => {
          console.log("Belvo exit:", data);
        },
      });

      widget.build();
    } catch (err) {
      console.error(err);
      setError("Error initializing Belvo widget.");
    } finally {
      setLoading(false);
    }
  };

  const connectGmail = () => {
    const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

    const redirectUrl = `${endpoint}/auth/google/connect/google-email`;
    window.location.href = redirectUrl;
  };



  return (
    <div className="bg-primary p-4 rounded-l-2xl w-full">
      <div id="belvo"></div>

      <div className="bg-white text-ct-grey rounded-full max-w-24 cursor-pointer flex px-4 py-1">
        <ChileLogo className="w-6 h-6" />
        Chile
      </div>

      <div className="text-white text-md font-semibold my-8">
        Agrega más cuentas
      </div>

      <div className="h-40 flex flex-col justify-between items-between">
        <ButtonPluse
          bgColor="primary"
          text="Correo electrónico"
          onClick={connectGmail}
        />
        <ButtonPluse
          bgColor="primary"
          text="Cuenta Bancaria"
          onClick={handleBankAccountClick}
        />
        <ButtonPluse
          bgColor="white"
          text="Tarjeta de Crédito"
          onClick={() => alert("Tarjeta de Crédito")}
        />
      </div>

      {loading && <div className="text-white mt-4">Cargando...</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};


export default AddAccount;