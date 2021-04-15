import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Backdrop, CircularProgress, Link } from '@material-ui/core';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 275,
      marginBottom: '24px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer - 300,
        color: '#fff',
      },
  }));

export default function Dashboard (){ 
    const classes = useStyles();
    const FETCH_DASHBOARD_DETAILS_QUERY = gql`query {
    company {
        ceo employees name summary links { website }
        }
        roadster {
        name details earth_distance_km speed_kph launch_date_utc launch_mass_kg wikipedia
        } 
        launchpads {name details} 
    }`

    const { loading, data, fetchMore } = useQuery(FETCH_DASHBOARD_DETAILS_QUERY, {
        variables: {
          offset: 0,
          limit: 10
        },
      });

    if(loading && data == null){
        return (<Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>); 
    }

    const {company, roadster, launchpads } = data;
    const { summary, ceo, employees, links } = company;
    const { details, earth_distance_km, speed_kph, launch_data_utc, launch_mass_kg, wikipedia } = roadster;  
    
    
    return (
       <div className='dashboard-container'>
        <Card className={classes.root}>
             <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {company.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {summary}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {ceo}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Employee Count : {employees}
                </Typography>
             </CardContent>
             <CardActions>
                 <Link href={links.website}>Website</Link>
             </CardActions>
         </Card>
         <Card className={classes.root}>
             <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
                    {roadster.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {details}
                </Typography><br/>
                <Typography variant="body2" color="textSecondary" component="p">
                    Earth Distance (km){earth_distance_km}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Speed(kph) : {speed_kph}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Launch Date : {launch_data_utc}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Launch mass(kg) : {launch_mass_kg}
                </Typography>
             </CardContent>
             <CardActions>
                 <Link href={wikipedia}>Wikipedia</Link>
             </CardActions>
         </Card>
         <Card className={classes.root}>
             <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    SpaceX Launchpads
                </Typography>
                <List dense>    
                    {launchpads.map((value: any, index: React.Key | null | undefined) => {
                        const labelId = `launchpad-list-label-${index}`;
                        return (
                        <ListItem key={index}>
                            <ListItemText id={labelId} primary={value.name} secondary={value.details}/>
                        </ListItem>
                        );
                    })}
                </List>
             </CardContent>
         </Card>
     </div>
    )
}