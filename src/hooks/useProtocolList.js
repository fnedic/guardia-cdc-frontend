import { useEffect, useState } from "react";
import ProtocolService from "../components/secured/services/ProtocolService.js";
import { useProtocolView } from './useProtocolView';

export const useProtocolList = () => {
  // LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
  const { renderFormatedContent } = useProtocolView();
  const [protocolList, setProtocolList] = useState();
  const [protocolArray, setProtocolArray] = useState([]);

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
          publicationDate: element.publicationDate,
        };
        setProtocolArray(updatedProtocolArray);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolList]);

  function myDate(date) {
    const myDate = new Date(date);
    const day = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  // useEffect(() => {
  //   protocolArray.map((p) => (
  //       console.log("Title: ", p.id)
  //   ))
  // }, [protocolArray]);
  ///////////////////////////////////////////////////////////////////////////////
  return {
    protocolArray,
    myDate
  };
};
