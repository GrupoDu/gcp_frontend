export type ErrorResponse = {
  response: {
    data: {
      message: string;
      error: string;
      status: number;
    };
  };
};
