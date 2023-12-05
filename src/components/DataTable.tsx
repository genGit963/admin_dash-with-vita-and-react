import React from 'react';

import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CreateIcon from '@mui/icons-material/Add';

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useResponsive } from 'src/hooks/useResponsive';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { Button, Grid, LinearProgress } from '@mui/material';

interface DataTableProps {
  name?: string;
  iRows: GridRowsProp;
  iCols: GridColDef[];
  idColumn: string;
  baseFilters?: string[];
  mobileFilters?: string[];
  action: (type: string, id?: string) => void;
}

const CustomToolbar =
  (canWrite: boolean, name: string = '', onCreate: () => void) =>
  () => {
    return (
      <GridToolbarContainer>
        <Grid container>
          <Grid item>
            <GridToolbarQuickFilter placeholder={`Search ${name}s`} />
          </Grid>
          {canWrite && (
            <Grid item sx={{ marginLeft: 'auto' }}>
              <Button
                variant="contained"
                startIcon={<CreateIcon />}
                onClick={onCreate}
                color="secondary"
                size="small"
              >
                Add
              </Button>
            </Grid>
          )}
        </Grid>
      </GridToolbarContainer>
    );
  };

const DataTable: React.FC<DataTableProps> = ({
  name,
  iRows,
  iCols,
  baseFilters,
  mobileFilters,
  idColumn,
  action,
}) => {
  const { isMobile } = useResponsive();
  const { canRead, canWrite } = { canRead: true, canWrite: true };
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columnVisibilityModel = React.useMemo(() => {
    const result: any = {};
    if (isMobile) {
      return iCols?.reduce((accum, current) => {
        accum[current.field] = mobileFilters
          ? mobileFilters.includes(current.field)
          : true;
        return result;
      }, result);
    } else {
      return iCols?.reduce((accum, current) => {
        accum[current.field] = baseFilters
          ? baseFilters.includes(current.field)
          : true;
        return result;
      }, result);
    }
  }, [isMobile, baseFilters, mobileFilters, iCols]);
  const cols: GridColDef[] = [
    {
      field: 'index',
      type: 'number',
      headerName: 'S/N',
      width: 100,
    },
    ...iCols.map((x) => {
      //disable editing completely
      // x.editable = x.editable && (canWrite || canDelete);
      // return x;
      x.editable = false;
      return x;
    }),
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          canRead ? (
            <GridActionsCellItem
              icon={<ReadMoreIcon />}
              label="View"
              onClick={() => action(PAGE_ACTIONS.view, row[idColumn])}
              color="inherit"
              disabled={!canRead}
            />
          ) : (
            <></>
          ),
          canWrite ? (
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => action(PAGE_ACTIONS.edit, row[idColumn])}
              color="inherit"
              disabled={!canWrite}
            />
          ) : (
            <></>
          ),
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        getRowId={(row) => row[idColumn]}
        rows={iRows.map((item, index) => ({ index: index + 1, ...item }))}
        columns={cols}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        columnVisibilityModel={columnVisibilityModel}
        onRowEditStop={handleRowEditStop}
        slotProps={{
          toolbar: { showQuickFilter: true },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar(canWrite, name, () =>
            action(PAGE_ACTIONS.create),
          ),
          loadingOverlay: LinearProgress,
        }}
        sx={{
          padding: 5,
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600!important',
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
