export const fetcher = (...args: Parameters<typeof fetch>) => {
  const response = fetch(...args).then((res) => {
    if (!res.ok)
      return { status: res.status, statusText: res.statusText, error: true };
    return res.json();
  });
  return response;
};
