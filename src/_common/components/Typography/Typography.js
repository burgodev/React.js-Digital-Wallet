import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const ELEMENTS = {
  SPAN: "span",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  P: "p",
  A: "a",
};

const styles = (theme) => ({
  standard: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "normal",
    textDecoration: "none",
    fontSmooth: "antialiased",
    [theme.breakpoints.only("xl")]: {},
    [theme.breakpoints.only("lg")]: {},
    [theme.breakpoints.down("sm")]: {
      fontSize: 14
    },
  },

  cardTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: "31px",
    [theme.breakpoints.only("xl")]: {},
    [theme.breakpoints.only("lg")]: {},
  },

  cardSubTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "16px",
    [theme.breakpoints.only("xl")]: {},
    [theme.breakpoints.only("lg")]: {},
  },

  errorMessage: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "16px",
    textAlign: "left",
    color: "red",
    [theme.breakpoints.only("xl")]: {},
    [theme.breakpoints.only("lg")]: {},
  },

  iconInputRegister: {
    position: "absolute",
    zIndex: "1",
    top: "20px",
    left: "10px",
    color: "gray",
    opacity: "0.6",
  },

  italic: {
    fontStyle: "italic",
  },
});

const Typography = ({
  textAlign,
  fontSize,
  width,
  fontWeight,
  opacity,
  margin,
  lineHeight,
  color,
  style,
  italic,
  type = "standard",
  element = ELEMENTS.SPAN,
  children,
  className,
  classes,
  url,
  urlExterna,
  h1Html,
  useRef,

  // cor,
  // sheet,
  // theme,
  // darkLink,
  ...rest
}) => {
  const [Wrapper, setWrapper] = React.useState(ELEMENTS.SPAN);

  React.useEffect(() => {
    if (url && !urlExterna) {
      setWrapper(Link);
    } else if (url) {
      setWrapper(AHtml);
    } else setWrapper(element);
  }, [element, url, urlExterna]);

  return (
    <Wrapper
      to={url}
      ref={useRef}
      className={classNames(
        {
          [classes.standard]: classes.standard,
          [classes.cardTitulo]: type === "cardTitulo",
          [classes.cardSubTitulo]: type === "cardSubTitulo",
          [classes.errorMessage]: type === "errorMessage",
          [classes.iconInputRegister]: type === "iconInputRegister",
          [classes.italic]: type === "italic",
        },
        className
      )}
      style={{
        textAlign,
        fontSize,
        fontWeight,
        width,
        lineHeight,
        color,
        opacity,
        margin,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

/* PROP TYPES */
Typography.propTypes = {
  type: PropTypes.oneOf([
    "padrao",
    "cardTitulo",
    "cardSubTitulo",
    "errorMessage",
    "iconInputRegister",
    "italic",
  ]),
  textAlign: PropTypes.oneOf(["left", "center", "right", "justify"]),
  width: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.string,
  margin: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  myProp: PropTypes.string,
  style: PropTypes.object,
  opacity: PropTypes.string,
  useRef: PropTypes.string,

  // cor: PropTypes.oneOf(["darkPrimaryText"]),
  /** @ignore */
  classes: PropTypes.object,
  /**
   * Nome da classe css a ser aplicada no componente. <br />
   * Se utilizar o `injectsheet`: usar `{claases.nome_da_classe}`
   */
  className: PropTypes.string,
  /** Itens a serem renderizados. */
  children: PropTypes.node,
  /** URL para ser direcionada nas rotas do `REACT` */
  url: PropTypes.string,
  /** Se verdadeiro, monta um link com a tag `a`  */
  urlExterna: PropTypes.bool,
  /** Se verdadeiro, estiliza o texto com `italico`  */
  italic: PropTypes.bool,
  /** Cria um link com cor escura, invés do azul padrão */
  darkLink: PropTypes.bool,
  /** @ignore */
  sheet: PropTypes.object,
  /** @ignore */
  theme: PropTypes.object,
};

/* VARIANTES */
const SpanHtml = ({ children, to, ...props }) => (
  <span {...props}>{children}</span>
);

SpanHtml.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

SpanHtml.defaultProps = {
  to: null,
};

const AHtml = ({ children, to, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

AHtml.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
    PropTypes.number,
  ]).isRequired,
  to: PropTypes.string,
};

AHtml.defaultProps = {
  to: undefined,
};

export default withStyles(styles)(Typography);
