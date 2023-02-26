import createClient from "./client";
import { userId, token } from "./config";
import fetchBatchOfFollowers from "./fetchFollowers";
import { IResult, IUser, IError } from "./interfaces";
import fs from 'fs';


const runner = async () => {
  const client = createClient(token);
  const followersBatch = await fetchBatchOfFollowers(client, userId);
  const { error } = followersBatch;
  let outputData: IUser[];
  if (error) {
    console.log("an error happened, aborting");
    console.log((followersBatch as IError).errorMessage);
  } else {
    let { data, meta } = followersBatch as IResult;
    outputData = [...data];
    while (meta?.next_token) {
      const nextFollowers = await fetchBatchOfFollowers(
        client,
        userId,
        meta?.next_token
      );
      const { error } = nextFollowers;
      if (error) {
        console.log("an error happened, aborting");
        console.dir((nextFollowers as IError).errorMessage);
        return null;
      } else {
        const updatedData = (nextFollowers as IResult).data;
        meta = (nextFollowers as IResult).meta;
        if (Array.isArray(data)) {
          outputData = [...outputData, ...updatedData];
        }
      }
    }
    console.dir(outputData);
    console.log(outputData.length);

    let fsData = JSON.stringify(outputData);
    fs.writeFileSync('output.json', fsData);
  }
};

runner();
