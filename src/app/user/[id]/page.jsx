import { redirect } from "next/navigation";

export default function Home({ params: { id } }) {
  return (
    <main>
      {redirect(`${id}/profile`)}
    </main>
  );
}
