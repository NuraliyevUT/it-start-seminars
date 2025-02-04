import { useState } from "react";
import {
  getSeminars,
  addSeminar,
  updateSeminar,
  deleteSeminar,
} from "../service/seminarService";

export const useSeminars = () => {
  const [loading, setLoading] = useState(false);

  const handleRequest = async (callback) => {
    setLoading(true);
    try {
      return await callback();
    } catch (error) {
      console.error("Seminar API error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchSeminars = () => handleRequest(() => getSeminars());

  const handleAddSeminar = (seminar) =>
    handleRequest(() => addSeminar(seminar));

  const handleUpdateSeminar = (id, updatedSeminar) =>
    handleRequest(() => updateSeminar(id, updatedSeminar));

  const handleDeleteSeminar = (id) => handleRequest(() => deleteSeminar(id));

  return {
    loading,
    fetchSeminars,
    handleAddSeminar,
    handleUpdateSeminar,
    handleDeleteSeminar,
  };
};
