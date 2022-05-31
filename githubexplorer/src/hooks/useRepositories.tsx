import { useContext } from 'react';

import { RepositoriesContext } from '../contexts/RepositoriesProvider';

function useRepositories() {
  return useContext(RepositoriesContext);
}

export { useRepositories }