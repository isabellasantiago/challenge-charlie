import axios from "axios";

const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?q='
'https://api.opencagedata.com/geocode/v1/json?q=';

const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY || '2774aa3461904937ae07ed5104f78a97';

export const convertToLocation = async (locationName: string, signal: AbortSignal) => {
    const enconded = encodeURIComponent(locationName)
    const { data } = await axios.get(`${baseUrl}${enconded}&key=${apiKey}&language=pt-BR&address_only=1&limit=1&abbrv=1`, {
        signal: signal
    });

    return data;
}