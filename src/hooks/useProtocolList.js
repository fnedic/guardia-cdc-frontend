import { useEffect, useState } from "react";
import ProtocolService from "../services/ProtocolService.js";
import { convertFromRaw } from "draft-js";

export const useProtocolList = () => {
  // LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
  const [protocolList, setProtocolList] = useState();
  const [protocolArray, setProtocolArray] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState(null);

  useEffect(() => {
    ProtocolService.protocolList().then((r) => {
      setProtocolList(r.data);
    });
  }, []);

  useEffect(() => {
    if (protocolList) {
      const updatedProtocolArray = [...protocolArray];
      for (let i = 0; i < protocolList.length; i++) {
        const element = protocolList[i];
        updatedProtocolArray[i] = {
          id: element.id,
          title: renderFormatedContent({
            section: element.title,
          }).getPlainText(),
          intro: renderFormatedContent({
            section: element.intro,
          }).getPlainText(),
          protocolGroup: element.protocolGroup,
          publicationDate: myDate(element.publicationDate),
          views: element.views,
          videoLink: element.videoLink,
        };
        setProtocolArray(updatedProtocolArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolList]);

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

  const fetchProtocolList = async () => {
    try {
      const response = await ProtocolService.protocolList();
      const updatedProtocolList = response.data;
      setProtocolList(updatedProtocolList);
    } catch (error) {
      console.error("Error fetching protocol list: ", error);
    }
  };

  const deleteProtocol = (id) => {
    setSelectedProtocolId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    await ProtocolService.deleteProtocol(selectedProtocolId);
    await fetchProtocolList();
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  return {
    protocolArray,
    deleteDialogOpen,
    myDate,
    deleteProtocol,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
  };
};
