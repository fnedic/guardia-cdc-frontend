import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  ButtonGroup,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useVideoList } from "../../../hooks/useVideoList";
import LoadingMain from "../../public/LoadingMain";

export function VideoTable() {
  const {
    videoList,
    deleteDialogOpen,
    editVideo,
    deleteVideo,
    handleCloseDeleteDialog,
    handleDeleteConfirmed,
    myDate,
  } = useVideoList();
  if (!videoList || videoList.length === 0) {
    return <LoadingMain />;
  }
  const formattedVideoList = videoList.map((video) => ({
    ...video,
    date: myDate(video.date),
  }));
  const columns = [
    {
      field: "videoGroup",
      headerName: "Grupo",
      width: 250,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Título",
      width: 350,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Publicado",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ButtonGroup
          disableElevation
          size="small"
          variant="contained"
          sx={{ boxShadow: "0" }}
        >
          <Button
            sx={{
              backgroundColor: "#000c58",
              borderRadius: 0,
              marginRight: 0.5,
            }}
            endIcon={<Edit />}
            onClick={() => editVideo(params.id)}
          >
            Editar
          </Button>
          <Button
            sx={{ backgroundColor: "#ad1421", borderRadius: 0 }}
            endIcon={<Delete />}
            onClick={() => deleteVideo(params.id)}
          >
            Borrar
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        style={{ textAlign: "center" }}
      >
        <DialogTitle id="delete-dialog-title">Confirmar Borrado</DialogTitle>
        <DialogContent>
          Seguro/a desea borrar el usuario seleccionado?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "95%" }}>
        <DataGrid
          sx={{
            border: 3,
            borderRadius:0,
            borderColor: "#799a3d",
            "& .MuiDataGrid-cell:hover": {
              color: "#283583",
            },
          }}
          rows={formattedVideoList}
          columns={[...columns]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: [""],
              },
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnMenu
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30]}
        />
      </Box>
    </Container>
  );
}
