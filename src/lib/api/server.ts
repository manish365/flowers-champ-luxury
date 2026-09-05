const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
export const backendURL = process.env.NEXT_PUBLIC_BACK_END_URL || "http://localhost:8080";

export const server = backendURL;
