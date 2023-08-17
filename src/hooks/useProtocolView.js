import { useEffect, useState } from "react";
import ProtocolService from "../components/secured/services/ProtocolService.js";
import { EditorState, convertFromRaw } from "draft-js";
import { useParams } from "react-router-dom";

export const useProtocolView = () => {
  // LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
  const initialState = {
    annexed: "",
    autor1: "",
    autor2: "",
    title: "",
    intro: "",
    procedures: "",
    generalInfo: "",
    videoLink: "",
    driveLink: "",
    protocolGroup: "",
    publicationDate: "",
  };

  const [protocol, setProtocol] = useState(initialState);
  const [editorStates, setEditorStates] = useState({}); // Store editor states dynamically
  const { id } = useParams();

  useEffect(() => {
    ProtocolService.getProtocol(id)
      .then((data) => {
        setProtocol(data);
      })
      .catch((error) => {
        console.error("Error seteando protocolo! ", error);
      });
  }, [id]);

  useEffect(() => {
    const updatedEditorStates = {};

    // Iterate through protocol properties and create editor states for each section
    for (const key in protocol) {
      if (key !== "protocolGroup" || key !== "publicationDate") {
        const contentState = renderFormatedContent({ section: protocol[key] });
        if (contentState) {
          updatedEditorStates[key] =
            EditorState.createWithContent(contentState);
        }
      }
    }

    setEditorStates(updatedEditorStates);
  }, [protocol]);

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
  ///////////////////////////////////////////////////////////////////////////////
  return {
    editorStates,
    protocol,
  };
};
