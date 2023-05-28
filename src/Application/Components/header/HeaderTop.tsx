import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./Language";

const HeaderTop = ({ borderStyle }: any) => {
  const currency = useSelector((state: any) => state.currency);
  return (
    <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
      <LanguageCurrencyChanger currency={currency} />
      <div className="header-offer">
        <p>
          Free delivery on order over{" "}
          <span>
            {currency.currencySymbol + (200 * currency.currencyRate).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
