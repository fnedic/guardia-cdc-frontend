import { useEffect, useState } from "react";
import ProtocolService from "../services/ProtocolService.js";

export const useVideoList = () => {
  // LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
  const [videoList, setVideoList] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    ProtocolService.videoList().then((r) => {
      setVideoList(r.data);
    });
  }, []);
  ///////////////////////////////////////////////////////////////////////////////

  const fetchVideoList = async () => {
    try {
      const response = await ProtocolService.videoList();
      const updatedVideoList = response.data;
      setVideoList(updatedVideoList);
    } catch (error) {
      console.error("Error fetching protocol list: ", error);
    }
  };

  const deleteVideo = (id) => {
    setSelectedVideoId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    await ProtocolService.deleteVideo(selectedVideoId);
    await fetchVideoList();
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  function myDate(date) {
    const myDate = new Date(date);
    const day = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return {
    videoList,
    deleteDialogOpen,
    myDate,
    deleteVideo,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
  };
};
