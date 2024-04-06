import PostFormContextProvider from "./contexts/PostFormContext";

export default function Layout({ children }) {
    return <PostFormContextProvider>{children}</PostFormContextProvider>
}