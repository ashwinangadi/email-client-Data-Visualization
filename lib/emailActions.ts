import { queryOptions } from "@tanstack/react-query";

export async function getEmails(page: number) {
  const url = `https://flipkart-email-mock.now.sh/?page=${page}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const result = await response.json();
    // console.log("resultcateg", result);
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getEmailBody(id: string) {
  const url = `https://flipkart-email-mock.now.sh/?id=${id}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const result = await response.json();
    // console.log("resultcateg", result);
    return result;
  } catch (error) {
    throw error;
  }
}

export const emailListOptions = (page: number) =>
  queryOptions({
    queryKey: ["emailList", { page }],
    queryFn: ({ queryKey }: { queryKey: [string, { page: number }] }) => {
      const [, { page }] = queryKey;
      return getEmails(page);
    },
  });

export const emailBodyOptions = (id: string) =>
  queryOptions({
    queryKey: ["emailBody", { id }],
    queryFn: ({ queryKey }: { queryKey: [string, { id: string }] }) => {
      const [, { id }] = queryKey;
      return getEmailBody(id);
    },
  });
