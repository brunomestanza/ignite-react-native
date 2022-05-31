import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

import { api } from '../services/api';

export interface IssueProps {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export interface RepositoryProps {
  id: number,
  full_name: string;
  owner: {
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  issues_url: string;

  issues: IssueProps[]
}

interface RepositoriesContextData {
  repositories: RepositoryProps[];
  addRepository: (repositoryName: string) => void;
  removeRepository: (repositoryId: number) => void;
  findRepositoryById: (repositoryId: number) => RepositoryProps;
}

interface RepositoriesProviderProps {
  children: React.ReactNode;
}

const RepositoriesContext = createContext<RepositoriesContextData>({} as RepositoriesContextData);

function RepositoriesProvider({ children }: RepositoriesProviderProps) {
  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  async function addRepository(repositoryName: string) {
    try {
      const repoAlreadyExists = repositories.find(repository => repository.full_name === repositoryName);

      if (repoAlreadyExists) {
        return Alert.alert(
          "Erro ao cadastrar repositório",
          "Esse repositório já está cadastrado."
        );
      }

      const response = await api.get<RepositoryProps>(`repos/${repositoryName}`);
      const { data: issues } = await api.get<IssueProps[]>(`repos/${repositoryName}/issues`);
      setRepositories([...repositories, {
        ...response.data,
        issues
      }]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao buscar pelo repositório. Verifique a sua conexão e o nome do repositório e tente novamente."
      )
    }
  }

  function findRepositoryById(repositoryId: number) {
    return repositories.find(repository => repository.id === repositoryId) as RepositoryProps;
  }

  function removeRepository(repositoryId: number) {
    const filteredRepositories = repositories.filter(repository =>
      repository.id !== repositoryId
    );

    setRepositories(filteredRepositories);
  }

  return (
    <RepositoriesContext.Provider value={{ repositories, addRepository, removeRepository, findRepositoryById }}>
      {children}
    </RepositoriesContext.Provider>
  )
}

export { RepositoriesProvider, RepositoriesContext }