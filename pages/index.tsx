import AppLayout from "@/layouts/app-layout";
export const getServerSideProps = async () => {
  return {
    props: {
      emails: [
        {
          id: 1,
          subject: "Hello",
          sender: "John Doe",
          body: "Hello, how are you?",
        },
        {
          id: 2,
          subject: "Meeting",
          sender: "Jane Smith",
          body: "Let's meet at 3 PM.",
        },
        {
          id: 3,
          subject: "Reminder",
          sender: "System",
          body: "Don't forget to submit your report.",
        },
      ],
    },
  };
};
export default function Index({ emails }) {
  return (
    <AppLayout>
      <div className="grid w-full grid-cols-5">
        <div className="grid-cols-2">
          {emails.map((email) => (
            <div key={email.id}>
              <p>{ email.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
