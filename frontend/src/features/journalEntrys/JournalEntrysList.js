import { useGetJournalEntrysQuery } from './journalEntrysApiSlice.js';
import JournalEntry from './JournalEntry.js';
import Table from '../../components/Table.js';
import FlexContainer from '../../components/FlexContainer.js';

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
      <FlexContainer primary>
        <Table colNames={['Title', 'Date', 'User', 'Latitude', 'Longitude', 'Trail', 'Public', '']} tableRows={tableRows}></Table>
      </FlexContainer>
    );
  }

  return content;
};
export default JournalEntrysList;
