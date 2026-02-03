import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CardGoal from "../ui/cardGoal";

const GoalSection = () => {
  const metas = [
    {
      id: 1,
      title: "Aprender React Avançado",
      isChecked: true,
      description:
        "Dominar hooks customizados, Context API e performance optimization",
    },
    {
      id: 2,
      title: "Fazer exercícios físicos 4x na semana",
      isChecked: false,
      description: "Academia segunda, quarta, sexta e natação aos sábados",
    },
    {
      id: 3,
      title: "Ler 12 livros no ano",
      isChecked: true,
      description:
        "1 livro por mês, focando em ficção científica e desenvolvimento pessoal",
    },
    {
      id: 4,
      title: "Economizar R$ 10.000",
      isChecked: false,
      description: "Guardar R$ 850 por mês para reserva de emergência",
    },
    {
      id: 5,
      title: "Aprender a tocar violão",
      isChecked: false,
      description: "Aulas semanais e prática diária de 30 minutos",
    },
    {
      id: 6,
      title: "Certificação em Cloud AWS",
      isChecked: true,
      description: "Preparar para exame Solutions Architect em 6 meses",
    },
    {
      id: 7,
      title: "Viajar para 3 países novos",
      isChecked: false,
      description: "Chile, Uruguai e Portugal - planejar uma viagem por ano",
    },
    {
      id: 8,
      title: "Melhorar inglês para fluência",
      isChecked: true,
      description: "Aulas 2x por semana + filmes e séries sem legenda",
    },
    {
      id: 9,
      title: "Montar portfólio de projetos",
      isChecked: false,
      description: "Desenvolver 5 projetos completos para GitHub",
    },
    {
      id: 10,
      title: "Reduzir consumo de açúcar",
      isChecked: true,
      description: "Limitar para máximo 25g de açúcar adicionado por dia",
    },
    {
      id: 11,
      title: "Finalizar curso de TypeScript",
      isChecked: false,
      description: "Completar 40 horas de curso online com certificado",
    },
    {
      id: 12,
      title: "Meditar 10 minutos diários",
      isChecked: true,
      description: "Usar app de meditação pela manhã antes do trabalho",
    },
  ];

  return (
    <div className={styles.goalSectionContainer}>
      <div className={styles.goalButtons}>
        <LinkButton color="black" href="/" fullWidth={false} Icon={FaPlus}>
          Criar nova meta
        </LinkButton>
        <LinkButton color="black" href="/" Icon={FaExternalLinkAlt}>
          Visualizar metas
        </LinkButton>
      </div>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>
            <CardGoal
              title={meta.title}
              description={meta.description}
              isChecked={meta.isChecked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalSection;
