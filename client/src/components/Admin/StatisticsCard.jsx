import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const StatisticsCard = (props) => {
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {props.name}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props.statistic}             
          
            </Typography>
            <Typography color="textSecondary" variant="subtitle2" sx={{pt: 1}}>
              {props.totalproducts && <>{props.totalproducts} total products <br/> {props.totalproducts - props.statistic} unavailable</>}  

              {props.admins && <>
              {typeof props.admins === "number" && <>{props.admins} admins</>} {" | "}
              {typeof props.activeusers === "number" && <>{props.activeusers} users</>}  <br/>
              {typeof props.banned === "number" && <>{props.banned} banned</>} {" | "}
              {typeof props.blocked === "number" && <>{props.blocked} blocked</>}               
              </>}

              {props.orders && "Total orders: " + props.orders} 
            </Typography>
            
          </Grid>
          
          <Grid item>
            
            <Avatar
              sx={{
                backgroundColor: "#FBA744",
                height: 42,
                width: 42,
              }}
            >
              {props.icon}
            </Avatar>
          </Grid>
          
          
        </Grid>
        
          
      </CardContent>
    </Card>
  );
};
