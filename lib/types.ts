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
