import { useGetJournalEntrysQuery } from './journalEntrysApiSlice.js';
import JournalEntry from './JournalEntry.js';

const JournalEntrysList = () => {
  const {
    data: journalEntrys,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJournalEntrysQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = journalEntrys;

    const tableRows = ids.map((id) => {
      return <JournalEntry key={id} journalEntryId={id} />;
    });

    content = (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  return content;
};
export default JournalEntrysList;
