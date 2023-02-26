interface IUser {
  id: string;
  name: string;
  username: string;
}

interface IResult {
  error: boolean;
  data: IUser[];
  meta: {
    result_count: number;
    next_token?: string;
  };
}

interface IError {
  error: boolean;
  errorMessage: any;
}

export { IResult, IUser, IError };
