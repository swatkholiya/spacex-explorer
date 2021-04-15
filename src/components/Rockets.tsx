import { Box, Collapse, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GridRowsProp } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props: { row: any; }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.mass.kg}</TableCell>
                <TableCell align="right">{row.cost_per_launch}</TableCell>
                <TableCell align="right">{row.stages}</TableCell>
                <TableCell align="right">{row.success_rate_pct}</TableCell>
                <TableCell align="right">{row.active ? 'Active' : 'Inactive'}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {row.description}
                        </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Launches() {

    const [offset, setOffset] = React.useState(0);

    const FETCH_LAUNCHES_QUERY = gql`query {
        rockets {
          name
          mass {
            kg
          }
          id
          cost_per_launch
          stages
          success_rate_pct
          active
          description
        }
      }
      `

    const { loading, data, fetchMore } = useQuery(FETCH_LAUNCHES_QUERY, {
        variables: {
            offset: 0,
            limit: 10
        },
    });

    if (data == null || loading) {
        return <h1>Loading</h1> // Loading code goes here
    }

    const columns = [
        {
            field: "name",
            headerName: "Name",
            //valueGetter: (params : any) => new Date(params.row.launch_date_local).toDateString(),
            width: 300
        },
        {
            field: "mass",
            headerName: "Mass",
            valueGetter: (params: any) => params.row.mass.kg,
        },
        {
            field: "cost_per_launch",
            headerName: "Cost/Launch",
            width: 150
        },
        {
            field: "stages",
            headerName: "Stages",
            valueGetter: (params: any) => params.row.stages,
        },
        {
            field: "success_rate_pct",
            headerName: "Success Rate",
            width: 150
        },
        {
            field: "active",
            headerName: "Status",
            valueGetter: (params: any) => params.row.active ? 'Active' : 'Inactive',
        },
    ];

    return (
        // <div style={{ height: '320px', width: '100%' }}>
        //     <DataGrid 
        //         rows={data.rockets} 
        //         columns={columns} 
        //     />
        // </div>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Mass</TableCell>
                        <TableCell align="right">Cost/Launch</TableCell>
                        <TableCell align="right">Stages</TableCell>
                        <TableCell align="right">Success Rate</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.rockets.map((rocket: any) => (
                        <Row key={rocket.name} row={rocket} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}
