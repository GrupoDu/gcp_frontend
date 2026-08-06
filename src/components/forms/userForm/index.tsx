"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { User } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import generator from "generate-password-ts";
import SubmitButton from "@/components/ui/submitButton";
import { toast } from "react-toastify";
import { Method } from "axios";
import TextInput from "@/components/ui/textInput";
import SelectInput from "@/components/ui/selectInput";
import { FaRegClipboard, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useLoading } from "@/hooks/useLoading";

async function handleSubmit(
  e: React.SubmitEvent,
  setIsLoading: (value: boolean) => void,
  router: AppRouterInstance,
  endpoint: string,
  userInfos: User,
  method: Method,
) {
  e.preventDefault();
  setIsLoading(true);

  try {
    await handleFormSubmit(endpoint, userInfos, method);

    router.back();
    toast.success("Usuário registrado com sucesso");
  } catch (e) {
    toast.error((e as Error).message);
  } finally {
    setIsLoading(false);
  }
}

function copyToClipboard(password: string) {
  navigator.clipboard
    .writeText(password)
    .then(() => console.log("Senha copiada com sucesso!"))
    .catch((e) => console.error((e as Error).message));
  toast.success("Senha copiada para a área de transferência");
}

const UserForm = ({ isEdit, user }: { isEdit?: boolean; user?: User }) => {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const password = generator.generate({ length: 20, numbers: true });
  const [seePassword, setSeePassword] = useState(false);
  const [userInfos, setUserInfos] = useState<User>({
    userUuid: user?.userUuid || "",
    name: user?.name || "",
    userRole: user?.userRole || "",
    email: user?.email || "",
    password: isEdit ? "" : password,
  });

  const endpoint = user && isEdit ? `user/${user.userUuid}` : "user";
  const method: Method = isEdit ? "PUT" : "POST";

  const handleChange = (key: string, value: string) => setUserInfos((prev) => ({ ...prev, [key]: value }));

  return (
    <form
      onSubmit={(e) => handleSubmit(e, setIsLoading, router, endpoint, userInfos, method)}
      className={styles.registerUserContainer}
    >
      <TextInput
        label={"Nome completo"}
        type={"text"}
        onChange={(e) => handleChange("name", e.target.value)}
        value={userInfos.name}
      />
      <SelectInput
        value={userInfos.userRole}
        onChange={(e) => handleChange("userRole", e.target.value)}
        options={[
          { value: "Admin", label: "Administrador" },
          { value: "Supervisor", label: "Supervisor" },
        ]}
        defaultValue={"Função"}
        label={"Tipo de usuário"}
      />
      <TextInput
        type={"text"}
        onChange={(e) => handleChange("email", e.target.value)}
        value={userInfos.email}
        label={"Email"}
        required={true}
      />
      <label>
        <span>Senha</span>
        <div className={styles.passwordInput}>
          <input
            type={seePassword ? "text" : "password"}
            name="input-password"
            readOnly={!isEdit}
            required={!isEdit}
            value={userInfos.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {!isEdit && (
            <button type="button" onClick={() => copyToClipboard(password)}>
              <FaRegClipboard />
            </button>
          )}
          <button type="button" onClick={() => setSeePassword(!seePassword)}>
            {seePassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </label>
      <div className={styles.buttons}>
        <LinkButton href="/usuarios" color="black">
          Cancelar
        </LinkButton>
        <SubmitButton>{isEdit ? "Salvar" : "Registrar"}</SubmitButton>
      </div>
    </form>
  );
};

export default UserForm;
