import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import EditUserForm from "@/app/Components/EditUserForm";

export default async function UserProfile() {
  const isLoggedIn = cookies().get("userid")?.value;
  const { rows: currentUser } =
    await sql`SELECT u.*, i.theme_id From users u join icons i ON u.icon_id = i.id where u.id = ${isLoggedIn}`;

  const { rows: icons } = await sql`select
    json_agg(
            json_build_object(
                'id', t.id,
                'name' , t.name,
                'colour', t.colour,
                'path', t.path,
                'icons', icons
            
        )
    ) themes
from themes t
join (
    select 
        theme_id,
        json_agg(
            json_build_object(
                'id', i.id,    
                'name', i.name,
                'path', i.path
                )
            ) icons
    from
        icons i
    group by theme_id
) i on t.id = i.theme_id;`;

  async function editUserFunction(formData) {
    "use server";
    const userToEdit = Object.fromEntries(formData);
    const { rows: userId } =
      await sql`UPDATE users SET username = ${userToEdit.username} , first_name = ${userToEdit.first_name}, last_name = ${userToEdit.last_name}, email = ${userToEdit.email}, icon_id = ${userToEdit.icon_id} Where id = ${isLoggedIn} RETURNING *`;

    if (userId.length != 0) {
      cookies().set("userid", userId[0].id);
      revalidatePath("/");
      revalidatePath("/posts");
      return redirect("/user/${isLoggedIn}/profile");
    } else {
      return redirect(`/user/${isLoggedIn}/profile?x=invalid`);
    }
  }

  return (
    <div className="flex w-full justify-center">
      <EditUserForm
        editUserFunction={editUserFunction}
        currentUser={currentUser[0]}
        icons={icons[0]}
      ></EditUserForm>
    </div>
  );
}
