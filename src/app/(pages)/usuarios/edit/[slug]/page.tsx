import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserForm from "@/components/forms/userForm";
import { api } from "@/services/api";
import { User } from "@/types/user.interface";
import { cookies } from "next/headers";

const getUser = async (slug: string): Promise<User | undefined> => {
  try {
    console.log("===> getUser <===");
    console.log("=> Tentando Fetch...");

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    const response = await api.get(`/user/${slug}`, {
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    });
    return response.data.data;
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
};

const UserEditPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const user: User | undefined = await getUser(slug);

  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Editar usuário</h3>
        <UserForm isEdit={true} user={user} />
      </main>
    </div>
  );
};

export default UserEditPage;
