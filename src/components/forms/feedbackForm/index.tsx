"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";

const FeedbackForm = () => {
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  async function handleFeedbackSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/feedback", {
        card_name: feedbackTitle,
        card_description: feedbackDescription,
      });

      toast.success("Feedback enviado com sucesso!");
      setFeedbackTitle("");
      setFeedbackDescription("");
      setAlreadySent(true);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, [alreadySent]);

  return (
    <>
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading && "loading"}`}>
        <form onSubmit={handleFeedbackSubmit} className={styles.formContainer}>
          <label className={styles.inputContainer}>
            <h3>Título</h3>
            <input
              placeholder="Qual o assunto do feedback?"
              type="text"
              onChange={(e) => setFeedbackTitle(e.target.value)}
              value={feedbackTitle}
            />
          </label>
          <label className={styles.inputContainer}>
            <span>Descrição</span>
            <textarea
              placeholder="Digite aqui sobre algum erro encontrado ou sugestão de melhoria no sistema."
              onChange={(e) => setFeedbackDescription(e.target.value)}
              value={feedbackDescription}
              className={styles.textArea}
            ></textarea>
          </label>
          <button
            className={alreadySent ? styles.alreadySent : ""}
            disabled={alreadySent}
            type="submit"
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
};

export default FeedbackForm;
