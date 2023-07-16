enum ErrorCode {
  SessionExpired = "SESSAO_EXPIRADA",
  InvalidToken = "TOKEN_INVALIDO",
  // Adicione outros códigos de erro conforme necessário
}

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly errorCode?: ErrorCode;
  public readonly data?: any;

  constructor(
    message: string,
    statusCode = 400,
    errorCode?: ErrorCode,
    data?: any,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
  }

  // static internalError(error: Error): AppError {
  //   // Lógica para tratar o erro interno e retornar uma instância de AppError adequada
  //   return new AppError(
  //     "Internal Server Error",
  //     ErrorCode.InternalServerError,
  //     500,
  //   );
  // }

  toJSON(): Record<string, any> {
    return {
      message: this.message,
      errorCode: this.errorCode,
      data: this.data,
    };
  }
}

export default AppError;
