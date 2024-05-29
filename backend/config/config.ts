export const config = {
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "yoursecretkey",
    jwtExpiresIn: "1h"
}