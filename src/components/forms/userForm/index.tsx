"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { User } from "@/types/user.type";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import generator from "generate-password-ts";
import SubmitButton from "@/components/ui/submitButton";

const UserForm = ({
  isEdit,
  user_id,
}: {
  isEdit?: boolean;
  user_id?: string;
}) => {
  const { usersData } = useUsers();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const password = generator.generate({ length: 20, numbers: true });
  const [userInfosFields, setUserInfosFields] = useState<User>({
    user_id: "",
    name: "",
    user_type: "",
    email: "",
    password: password,
  });

  useEffect(() => {
    if (isEdit && user_id) {
      const fetchedUser = usersData?.find((user) => user.user_id === user_id);

      if (fetchedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserInfosFields({
          user_id: fetchedUser.user_id,
          name: fetchedUser.name,
          user_type: fetchedUser.user_type,
          email: fetchedUser.email,
        });
      }

      setCanEdit(!!fetchedUser);
    }
    setCanEdit(true);
  }, [isEdit, user_id, usersData]);

  const endpoint = isEdit ? `users/${user_id}` : "users";
  const method = isEdit ? "PUT" : "POST";

  return (
    <form
      onSubmit={async (e) =>
        await handleFormSubmit(
          e,
          method,
          userInfosFields as unknown as Record<string, unknown>,
          endpoint,
          router,
          canEdit,
        )
      }
      className={styles.registerUserContainer}
    >
      <label>
        <span>Nome completo</span>
        <input
          name="input-name"
          value={userInfosFields.name}
          onChange={(e) =>
            setUserInfosFields({ ...userInfosFields, name: e.target.value })
          }
          type="text"
          required
          placeholder="Nome do usuário completo"
        />
      </label>
      <label>
        <span>Tipo de usuário</span>
        <select
          value={userInfosFields.user_type}
          onChange={(e) =>
            setUserInfosFields({
              ...userInfosFields,
              user_type: e.target.value,
            })
          }
          name="input-function"
          required
        >
          <option value="">Tipo de usuário</option>
          <option value="admin">Administrador</option>
          <option value="supervisor">Supervisor</option>
        </select>
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="input-email"
          value={userInfosFields.email}
          required
          onChange={(e) =>
            setUserInfosFields({ ...userInfosFields, email: e.target.value })
          }
          placeholder="email@grupodu.com.br"
        />
      </label>
      <label>
        <span>Senha</span>
        <input
          type="text"
          name="input-password"
          readOnly
          value={userInfosFields.password}
        />
      </label>
      <div className={styles.buttons}>
        <LinkButton href="/usuarios" color="black">
          Cancelar
        </LinkButton>
        <SubmitButton canEdit={canEdit}>
          {isEdit ? "Salvar" : "Registrar"}
        </SubmitButton>
      </div>
    </form>
  );
};

export default UserForm;
