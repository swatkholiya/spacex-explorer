import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { DataGrid } from '@material-ui/data-grid';


export default function Launches (){

    const [offset, setOffset] = React.useState(0);
    
    const FETCH_LAUNCHES_QUERY = gql`query {
        launchesPastResult {
          result { totalCount }  
          data {
            id  
            launch_date_local
            mission_name
            launch_site {
              site_name
            }
            rocket {
              rocket_name
            }
            launch_success
          }
        }                
    }`

    const a = 10;
    const { loading, data, fetchMore } = useQuery(FETCH_LAUNCHES_QUERY, {
        variables: {
          "offset": 0,
          "limit": 10
        },
      });


    const columns = [
        {
            field : "launch_date_local",
            headerName : "Launch Date",
            valueGetter: (params : any) => new Date(params.row.launch_date_local).toDateString(),
            width: 150
        },
        {
            field : "mission_name",
            headerName : "Mission Name",
            width: 300
        },
        {
            field : "launch_site",
            headerName : "Launch Site", 
            valueGetter: (params : any) => params.row.launch_site.site_name,
            width: 150
        },
        {
            field : "rocket_name",
            headerName : "Rocket",
            valueGetter: (params : any) => params.row.rocket.rocket_name,
            width: 150
        },
        {
            field : "launch_success",
            headerName : "Sucessful",
            width: 200,
            valueGetter: (params : any) => params.row.launch_success === true ? 'Yes' : 'No',
        },  

    ];

    let res = [];
    let total = 0;
    if(data && data.launchesPastResult.data){
        res = data.launchesPastResult.data;
        total = data.launchesPastResult.result.totalCount;
    }
    
    return (
        <div style={{ height: '520px', width: '100%' }}>
            <DataGrid 
                rows={res} 
                columns={columns} 
                page={offset}
                pageSize={10} 
                loading={res.length === 0}
                onPageChange={(params) => {
                    fetchMore({
                        variables : {
                            offset : params.page
                        }
                    })
                }}
                pagination
                rowCount={total}
            />
        </div>
    )

}
    
   