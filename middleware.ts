export { default } from "next-auth/middleware";

export const config = {
    // Protect all routes under (main) or simply all routes except auth ones
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
    ],
};
