export type EmailSender = {
  email: string;
  name: string;
};

export type Email = {
  id: string;
  from: EmailSender;
  date: number;
  subject: string;
  short_description: string;
};

export type FilteredData = {
  Day: string;
  Age: string;
  Gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}[];
