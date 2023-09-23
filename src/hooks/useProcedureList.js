import { useEffect, useState } from "react";
import ProtocolService from "../services/ProtocolService.js";
import { convertFromRaw } from "draft-js";

export const useProcedureList = () => {
  // LOGIC FOR PROCEDURE RENDERING ////////////////////////////////////////////////
  const [procedureList, setProcedureList] = useState();
  const [procedureArray, setProcedureArray] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);

  useEffect(() => {
    ProtocolService.procedureList().then((r) => {
        setProcedureList(r.data);
    });
  }, []);

  useEffect(() => {
    if (procedureList) {
      const updatedProcedureArray = [...procedureArray];
      for (let i = 0; i < procedureList.length; i++) {
        const element = procedureList[i];
        updatedProcedureArray[i] = {
          id: element.id,
          title: element.title,
          intro: renderFormatedContent({
            section: element.intro,
          }).getPlainText(),
          group: element.protocolGroup,
          publicationDate: myDate(element.publicationDate),
          views: element.views,
          videoLink: element.videoLink,
        };
        setProcedureArray(updatedProcedureArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procedureList]);

  function renderFormatedContent({ section }) {
    try {
      if (!section) {
        return null;
      }
      const parsedSection = JSON.parse(section);
      const contentState = convertFromRaw(parsedSection);
      return contentState;
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      return null;
    }
  }

  function myDate(date) {
    const myDate = new Date(date);
    const day = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  ///////////////////////////////////////////////////////////////////////////////

  const fetchProcedureList = async () => {
    try {
      const response = await ProtocolService.ProcedureList();
      const updatedProcedureList = response.data;
      setProcedureList(updatedProcedureList);
    } catch (error) {
      console.error("Error fetching Procedure list: ", error);
    }
  };

  const deleteProcedure = (id) => {
    setSelectedProcedureId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    await ProtocolService.deleteProcedure(selectedProcedureId);
    await fetchProcedureList();
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  return {
    procedureArray,
    deleteDialogOpen,
    myDate,
    deleteProcedure,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
  };
};