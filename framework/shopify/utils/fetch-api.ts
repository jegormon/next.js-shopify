type FetcherParams = {
  query: string;
};

type FetcherResult<T> = {
  data: T;
};

const fetchApi = async <T>({
  query,
}: FetcherParams): Promise<FetcherResult<T>> => {
  const url = "http://localhost:4000/graphql";

  const res = await fetch(url, {
    method: "POST",
    // Headers are for expected return
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  // this fn returns promise
  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }

  return { data };
};

export default fetchApi;
