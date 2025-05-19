import { useAppStore } from "../../../store";
import axios from "axios";

const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const {
    getUser,
} = useAppStore.authStore.getState();

export const getSubscriptionEachMonth = async () => {
    try {
        const token = getUser();
        const { data } = await axios.get(`${endpoint}/api/recurring-expenses/information/everymonth`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error("Error fetching subscription each month:", error);
        throw error;
    }
}

export const getSubscriptionRecent = async () => {
    try {
        const token = getUser();
        const { data } = await axios.get(`${endpoint}/api/recurring-expenses/information/recent`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error("Error fetching subscription each year:", error);
        throw error;
    }
}