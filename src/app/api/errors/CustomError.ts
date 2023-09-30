class CustomError extends Error {
  status: number;
  // code: algumTipo; // descomente e defina o tipo se quiser usar a propriedade 'code'

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // this.code = code; // descomente se quiser usar a propriedade 'code'
  }
}

export default CustomError;