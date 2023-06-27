import { useGetTrailsQuery } from './trailsApiSlice.js';
import Trail from './Trail.js';

const TrailsList = () => {
  const {
    data: trails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTrailsQuery(undefined, {
    pollingInterval: 600000,
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = trails;

    const tableRows = ids.map((id) => {
      return <Trail key={id} trailId={id} />;
    });

    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  return content;
};

export default TrailsList;
