import React from "react";
import cn from "classnames";

import PropTypes from "prop-types";

// import KeepMounted from "../KeepMounted";
import { withStyles, CircularProgress } from "@material-ui/core";

const styles = {
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Loading = ({
  classes,
  isLoading,
  children,
  sheet,
  className,
  size,
  color,
  keepMounted,
  ...rest
}) => (
  <>
    {isLoading ? (
      <LoadingIndicator
        className={cn(className, classes.loading)}
        size={size}
        color={color}
        classes={{ root: styles.root }}
        {...rest}
      />
    ) : (
      children
    )}
  </>
);

const LoadingIndicator = ({ className, color, size, ...rest }) => {
  return (
    <div className={className} {...rest}>
      <CircularProgress
        size={size || 80}
        style={{ color: color }}
        thickness={5}
      />
    </div>
  );
};

LoadingIndicator.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

Loading.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  /** @ignore */
  sheet: PropTypes.object,
  /** Indica se o elemento Loader vai ser exibido. */
  isLoading: PropTypes.bool.isRequired,
  /** Conteúdo para ser exibido caso os `isLoading = false`. */
  children: PropTypes.node,
  /** Nome da classe css a ser aplicada no componente. <br />
   *  Se utilizar o `injectsheet`: usar `{classes.nome_da_classe}`
   */
  className: PropTypes.string,
  /** Tamanho do elemento Loader. */
  size: PropTypes.number,
  /** Mantém o componente children montado */
  keepMounted: PropTypes.bool,
};

export default withStyles(() => styles)(Loading);
