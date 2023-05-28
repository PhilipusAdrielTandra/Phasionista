import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../Redux/currency-slice"

const LanguageCurrencyChanger = ({ currency }: any) => {
  // const { i18n } = useTranslation();
  const dispatch = useDispatch();
  // const changeLanguageTrigger = (e: any) => {
  //   const languageCode = e.target.value;
  //   i18n.changeLanguage(languageCode);
  // };

  const setCurrencyTrigger = (e: any) => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {/* {i18n.resolvedLanguage === "en"
            ? "English"
            : i18n.resolvedLanguage === "fn"
            ? "French"
            : i18n.resolvedLanguage === "de"
            ? "Germany"
            : ""}{" "}
          <i className="fa fa-angle-down" /> */}
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en">
                English
              </button>
            </li>
            <li>
              <button value="fn">
                French
              </button>
            </li>
            <li>
              <button value="de" >
                Germany
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency use-style">
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                USD
              </button>
            </li>
            <li>
              <button value="EUR" onClick={e => setCurrencyTrigger(e)}>
                EUR
              </button>
            </li>
            <li>
              <button value="GBP" onClick={e => setCurrencyTrigger(e)}>
                GBP
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>{"  "}</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
