export { auth as middleware } from "@/auth";
export const config = {
  runtime: "nodejs",
  unstable_allowDynamic: [
    "/node_modules/mongoose/**",
    "mongoose/dist/browser.umd.js",
    "/src/models/userModel.ts",
    "/src/lib/db.ts",
    "/src/lib/actions.ts",
  ],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
