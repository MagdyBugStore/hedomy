const dev = process.env.NODE_ENV !== "production";

export const server = dev 
    ? "" 
    : "";
