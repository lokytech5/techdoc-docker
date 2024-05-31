export const config = {
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "yourSecretKey",
    jwtExpiresIn: "1h" // Adjust based on your requirements
};
