import { useEffect, useState } from "react";
import ProtocolService from "../services/ProtocolService.js"
import { useProtocolView } from './useProtocolView';

export const useMostViewedProtocol = () => {

    const [ mvProtocolUpdate, setMvProtocolUpdate ] = useState();
    const [ mostViewedProtocol, setMostViewedProtocol ] = useState();
    const { renderFormatedContent } = useProtocolView();

    useEffect(() => {
        ProtocolService.mostViewedProtocol().then((r) => {
            setMvProtocolUpdate(r.data);
        });
    }, [])
    
    useEffect(() => {
        if (mvProtocolUpdate) {
            const mvProtocol = {
                id: mvProtocolUpdate.id,
                title: mvProtocolUpdate.title,
                intro: renderFormatedContent({ section: mvProtocolUpdate.intro}).getPlainText().slice(0, 300),
                protocolGroup: mvProtocolUpdate.protocolGroup
            };
            setMostViewedProtocol(mvProtocol);
            // console.log("Protocolo mas visto --> ",mostViewedProtocol);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mvProtocolUpdate])
    
    return {
        mostViewedProtocol,
    };
};