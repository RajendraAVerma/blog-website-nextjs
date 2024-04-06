import AuthorFormContextProvider from "./contexts/AuthorFormContext";

export default function Layout({ children }) {
    return <AuthorFormContextProvider>{children}</AuthorFormContextProvider>
}