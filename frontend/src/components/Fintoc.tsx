import { useCallback, useEffect, useState } from 'react';
import { getFintoc } from '@fintoc/fintoc-js';
import { useAppStore } from "../store";

export const FintocWidget = () => {
    const [widgetToken, setWidgetToken] = useState<string | null>(null);
    const { getUser } = useAppStore.authStore.getState();

    useEffect(() => {
        const fetchWidgetToken = async () => {
            try {
                const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

                const response = await fetch(`${endpoint}/fintoc/get-widget-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getUser()}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setWidgetToken(data.widgetToken);
                console.log('token', data.widgetToken);
            } catch (error) {
                console.error('Failed to fetch widget token:', error);
            }
        };

        fetchWidgetToken();
    }, []);

    const openFintoc = useCallback(async () => {
        if (!widgetToken) {
            console.error("Widget token not available yet.");
            return;
        }

        const Fintoc = await getFintoc();

        if (!Fintoc) {
            console.error('Fintoc failed to load.');
            return;
        }

        const widget = Fintoc.create({
            publicKey: import.meta.env.VITE_FINTOC_PUBLIC_KEY,
            holderType: 'individual',
            product: 'subscriptions',
            widgetToken,
            onSuccess: (link: any) => {
                console.log('Link ID:', link.id);
                console.log('Access Token:', link.accessToken);
            },
            onExit: () => {
                console.log('Widget closed by user');
            }
        });

        widget.open();
    }, [widgetToken]);


    return (
        <button
            onClick={openFintoc}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
            Connect Your Bank
        </button>
    );
};


