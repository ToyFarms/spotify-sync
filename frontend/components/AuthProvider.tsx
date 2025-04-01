// import { createContext, useContext, useEffect, useState } from "react";
//
// type AuthProviderState = {
//   loggedIn: boolean;
// };
//
// const AuthContext = createContext<AuthProviderState>({
//   loggedIn: false,
// });
//
// export default function AuthProvider({
//   children,
//   ...props
// }: {
//   children: React.ReactNode;
// }) {
//   return <AuthContext.Provider {...props}>{children}</AuthContext.Provider>;
// }
