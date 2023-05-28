import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, titleTemplate, description }: any) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {title} | {titleTemplate}
                </title>
                <meta name="description" content={description} />
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    titleTemplate: PropTypes.string,
    description: PropTypes.string,
}

SEO.defaultProps = {
    title: "Phasionista",
    titleTemplate: "Ecommerce Website",
    description: "Phasionista eCommerce Website, Redesigning your future.",
};

export default SEO;