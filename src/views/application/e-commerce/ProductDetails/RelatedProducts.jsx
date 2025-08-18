import PropTypes from 'prop-types';
import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// third-party
import Slider from 'react-slick';

// project imports
import ProductCard from 'ui-component/cards/ProductCard';
import { getRelatedProducts } from 'store/slices/product';

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ id }) => {
    const theme = useTheme();
    const [related, setRelated] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(5);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
    const matchUpXL = useMediaQuery(theme.breakpoints.up('xl'));

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        (async () => {
            await getRelatedProducts(id).then((response) => {
                setRelated(response.data);
                setLoader(false);
            });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (matchDownSM) {
            setItemsToShow(1);
            return;
        }
        if (matchDownMD) {
            setItemsToShow(2);
            return;
        }
        if (matchDownLG) {
            setItemsToShow(3);
            return;
        }
        if (matchDownXL) {
            setItemsToShow(4);
            return;
        }
        if (matchUpXL) {
            setItemsToShow(5);
        }
    }, [matchDownSM, matchDownMD, matchDownLG, matchDownXL, matchUpXL, itemsToShow]);

    const settings = {
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: itemsToShow
    };

    let productResult = <></>;
    if (related && !loader) {
        productResult = related.map((product, index) => (
            <Box key={index} sx={{ p: 1.5 }}>
                <ProductCard
                    key={index}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    offerPrice={product.offerPrice}
                    salePrice={product.salePrice}
                    rating={product.rating}
                />
            </Box>
        ));
    }

    return <Slider {...settings}>{productResult}</Slider>;
};

RelatedProducts.propTypes = {
    id: PropTypes.string
};

export default RelatedProducts;
