export interface ErrorResponse {
  response: {
    data: {
      message: string;
      error: string;
      status: number;
    };
  };
}
