import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import FlexContainer from '../../components/FlexContainer';
import Table from '../../components/Table';

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p className={'errmsg'}>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableRows = ids.map((id) => {
      return <User key={id} userId={id} />;
    });

    content = (
      <FlexContainer primary>
        <Table colNames={['ID', 'Username', 'Email', 'isAdmin', '']} tableRows={tableRows}></Table>
      </FlexContainer>
    );
  }

  return content;
};

export default UsersList;
