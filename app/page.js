import PostListView from "./components/PostListView";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
      <PostListView />
    </main>
  );
}
