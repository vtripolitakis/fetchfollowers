import TwitterApiv2ReadOnly from "twitter-api-v2/dist/esm/v2/client.v2.read";
import { TRequestQuery } from "twitter-api-v2/dist/esm/types/request-maker.mixin.types";
import { MAX_RESULTS } from "./config";
import { IError, IResult } from "./interfaces";

const fetchBatchOfFollowers = async (
  client: TwitterApiv2ReadOnly,
  userId: number,
  next_token?: string
): Promise<IResult | IError> => {
  try {
    let query: TRequestQuery = {
      max_results: MAX_RESULTS,
    };

    if (next_token) {
      query = {
        max_results: MAX_RESULTS,
        pagination_token: next_token,
      };
    }

    const followersResult: Omit<IResult, "error"> = await client.get(
      `users/${userId}/followers`,
      query
    );
    return { ...followersResult, error: false };
  } catch (error) {
    return {
      error: true,
      errorMessage: error,
    };
  }
};

export default fetchBatchOfFollowers;