import React from "react";
import styles from "./styles.module.scss";
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { MdOutlineFeedback } from "react-icons/md";
import FeedbackForm from "@/components/forms/feedbackForm";

const FeedbackPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Feedback" HeaderIcon={MdOutlineFeedback} />
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
