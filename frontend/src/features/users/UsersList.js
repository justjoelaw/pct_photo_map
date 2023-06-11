import { connect } from 'react-redux';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>isAdmin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
