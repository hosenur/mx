import React, { createContext, useContext, type ReactNode } from "react";
import useSWR from "swr";

// Define the Email type
export interface Email {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string;
}

// Context type
interface EmailContextType {
  emails?: Email[];
  isLoading: boolean;
  error?: any;
  mutate?: () => void;
  selectedEmail: Email | null;
  setSelectedEmail: React.Dispatch<React.SetStateAction<Email | null>>;
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Create the context
const EmailContext = createContext<EmailContextType>({
  emails: [],
  isLoading: false,
  selectedEmail: null,
  setSelectedEmail: () => {},
});

// Provider props
interface EmailProviderProps {
  children: ReactNode;
}

// Provider component
export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);
  const { data, error, mutate, isLoading } = useSWR<Email[]>(
    "http://localhost:3001/emails",
    fetcher
  );

  return (
    <EmailContext.Provider
      value={{
        emails: data,
        error,
        isLoading: !data && !error,
        mutate,
        selectedEmail,
        setSelectedEmail,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

// Custom hook to consume the context
export const useEmails = () => {
  return useContext(EmailContext);
};
