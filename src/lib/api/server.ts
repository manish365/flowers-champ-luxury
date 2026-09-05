const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
export const backendURL = process.env.NEXT_PUBLIC_BACK_END_URL || "https://flowerschamp-service-prod.up.railway.app";

export const server = backendURL;
