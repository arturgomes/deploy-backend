import React from "react";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


export default function Copyright() {
  return (
    <Typography style={{ marginBottom: '30px', marginTop: '-30px' }} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="process.env.BASE_URL">
        CouponFeed
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
