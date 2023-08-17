import { useEffect, useState } from "react";
import ProtocolService from "../components/secured/services/ProtocolService.js";
import { convertFromRaw } from "draft-js";

export const useProtocolList = () => {

// LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
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
          protocolGroup: element.protocolGroup,
          publicationDate: element.publicationDate,
        };
        setProtocolArray(updatedProtocolArray);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolList]);
    // useEffect(() => {
    //   protocolArray.map((p) => (
    //       console.log("Title: ", p.id)
    //   ))
    // }, [protocolArray]);
  ///////////////////////////////////////////////////////////////////////////////
  return {
    protocolList,
    protocolArray,
  };
};
