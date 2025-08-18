import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// =========================|| CONVERSIONS CHART CARD ||========================= //

const ConversionsChartCard = ({ chartData }) => {
    const theme = useTheme();

    return (
        <MainCard content={false}>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle1">Prompts</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">(Per Day)</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Chart {...chartData} />
        </MainCard>
    );
};

ConversionsChartCard.propTypes = {
    chartData: PropTypes.object
};

export default ConversionsChartCard;
