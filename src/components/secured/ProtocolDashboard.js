import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { useProtocolList } from "./../../hooks/useProtocolList";
import { Edit } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { protocolArray } = useProtocolList();

  // const navigate = useNavigate();
  // const editUser = (id) => {
  //   navigate(`/user/update/${id}`);
  // };
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
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          sx={{ backgroundColor: "#8a96db", boxShadow: 0 }}
          variant="contained"
          size="small"
          disableElevation
          endIcon={<Edit />}
          //onClick={() => editUser(params.id)}
        >
          Editar
        </Button>
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
      {protocolArray && (
        <Box sx={{ width: "85%" }}>
          <DataGrid
            sx={{
              boxShadow: 3,
              border: 2,
              borderColor: "#799A3D",
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
      )}
    </Container>
  );
}