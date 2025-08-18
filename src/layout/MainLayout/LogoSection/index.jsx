import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Grid, Link, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={'/chat'} aria-label="mlbchat logo" sx={{textDecoration: "none"}}>
        <Grid item style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Logo height={46} />
        </Grid>
    </Link>
);

export default LogoSection;
