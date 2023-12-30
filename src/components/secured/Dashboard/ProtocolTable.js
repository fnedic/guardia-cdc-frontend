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
import { Delete, OpenInBrowser } from "@mui/icons-material";
import { useProtocolList } from "../../../hooks/useProtocolList";
import LoadingMain from "../../public/LoadingMain";

export function ProtocolTable() {
  const {
    protocolArray,
    deleteDialogOpen,
    handleCloseDeleteDialog,
    handleDeleteConfirmed,
    deleteProtocol,
  } = useProtocolList();
  
  if (!protocolArray || protocolArray.length === 0) {
    return <LoadingMain />;
  }
  const columns = [
    {
      field: "title",
      headerName: "Título",
      width: 350,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "protocolGroup",
      headerName: "Grupo",
      width: 180,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "publicationDate",
      headerName: "Publicado",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views",
      headerName: "Vistas",
      typeof: "number",
      width: 100,
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
          sx={{ boxShadow: 0 }}
        >
          <Button
            sx={{
              backgroundColor: "#000c58",
              borderRadius: 0,
              marginRight: 0.5,
            }}
            endIcon={<OpenInBrowser />}
            href={`../protocol/view/${params.id}`}
          >
            Abrir
          </Button>
          <Button
            sx={{ backgroundColor: "#ad1421", borderRadius: 0 }}
            endIcon={<Delete />}
            onClick={() => deleteProtocol(params.id)}
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
          Seguro/a desea borrar el contenido seleccionado?
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
      <Box sx={{ width: "90%" }}>
        <DataGrid
          sx={{
            border: 3,
            borderRadius:0,
            borderColor: "#799a3d",
            "& .MuiDataGrid-cell:hover": {
              color: "#283583",
            },
          }}
          rows={protocolArray}
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
          pageSizeOptions={[10, 20, 30, 40]}
        />
      </Box>
    </Container>
  );
}