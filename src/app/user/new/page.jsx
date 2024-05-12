import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { randomName } from "@/app/lib/helper_functions";
import UserForm from "@/app/Components/NewUserForm";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function newUser() {
  const newRandomUser = randomName();

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

  async function newUserFunction(formData) {
    "use server";
    const userToCreate = Object.fromEntries(formData);
    const { rows: userId } =
      await sql`INSERT INTO users (username, first_name, last_name, email, icon_id) VALUES (${userToCreate.username}, ${userToCreate.first_name}, ${userToCreate.last_name}, ${userToCreate.email}, ${userToCreate.icon_id}) ON CONFLICT DO NOTHING RETURNING *`;

    if (userId.length != 0) {
      cookies().set("userid", userId[0].id);
      revalidatePath("/");
      revalidatePath("/posts");
      return redirect("/");
    } else {
      return redirect("/user/new?x=invalid");
    }
  }

  return (
    <UserForm
      newUserFunction={newUserFunction}
      randomUser={newRandomUser}
      icons={icons[0].themes}
    ></UserForm>
  );
}
