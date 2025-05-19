import { useAppStore } from "../../../store";
import axios from "axios";

const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const {
    getUser,
} = useAppStore.authStore.getState();

export const handleBankAccountClick = async (
  setLoading: (b: boolean) => void,
  setError: (e: string) => void
) => {
  try {
    setLoading(true);
    setError("");

    const token = getUser();
    const { data } = await axios.get(`${endpoint}/api/belvo/link`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const access_token = data.access;

    if (!window.belvoSDK) {
      setError("Belvo SDK not loaded.");
      return;
    }

    const widget = window.belvoSDK.createWidget(access_token, {
      locale: "es",
      access_mode: "recurrent",
      callback: async (link: string, institution: string) => {
        try {
          const res = await fetch(
            `${endpoint}/api/recurring-expenses/information?link=${link}&institutionName=${institution}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          );
          const info = await res.json();
          console.log("📦 Subscription info:", info);

          // Reload the page after successful callback
          window.location.reload();
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
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

export  const connectGmail = (  setLoading: (b: boolean) => void,
  setError: (e: string) => void) => {
    const redirectUrl = `${endpoint}/auth/google/connect/google-email`;
    window.location.href = redirectUrl;
};