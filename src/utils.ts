export const formatearErrores = (mensajesErrores, errors) => {
  errors.forEach((error) => {
    if (error.children.length === 0) {
      mensajesErrores[error.property] = Object.values(error.constraints);
    } else {
      mensajesErrores[error.property] = {};

      formatearErrores(mensajesErrores[error.property], error.children);
    }
  });
};
