import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { api } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';

import { ProvidersWrapper } from '../../../jest-utils/wrapper';
import { Dashboard } from '../../screens/Dashboard';

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}));

const axiosMock = new MockAdapter(api, {
  delayResponse: 100
});

const reactRepositoryResponse = {
  id: 0,
  full_name: 'facebook/react',
  owner: {
    avatar_url: 'https://github.com/facebook.png'
  },
  description: 'repository description',
  stargazers_count: 0,
  forks_count: 0,
  open_issues_count: 0,
  issues_url: 'https://issues-url.com'
};
const issuesResponse = [
  {
    id: 0,
    title: 'issue-title',
    html_url: 'issue-html_url',
    user: {
      login: 'user-login',
    }
  }
];

axiosMock.onGet(`/repos/${reactRepositoryResponse.full_name}`)
  .reply(200, reactRepositoryResponse);
axiosMock.onGet(`repos/${reactRepositoryResponse.full_name}/issues`)
  .reply(200, issuesResponse);

describe('Dashboard', () => {
  it('should not be able to press search button when input is empty', async () => {
    const {
      getByPlaceholderText,
      getByTestId,
    } = render(<Dashboard />, {
      wrapper: ProvidersWrapper,
    });

    const textInput = getByPlaceholderText("Digite aqui 'usuário/repositório'");
    const submitButton = getByTestId('input-button');

    expect(submitButton).toBeDisabled();

    fireEvent.changeText(textInput, 'repository-name');

    expect(submitButton).not.toBeDisabled();
  });

  it('should be able to get repository', async () => {
    const { getByPlaceholderText, getByTestId, findByText } = render(<Dashboard />, {
      wrapper: ProvidersWrapper
    });

    const textInput = getByPlaceholderText("Digite aqui 'usuário/repositório'");
    const submitButton = getByTestId('input-button');

    fireEvent.changeText(textInput, reactRepositoryResponse.full_name);
    fireEvent.press(submitButton);

    await findByText(reactRepositoryResponse.full_name);
  });

  it('should navigate to Repository page when repository card is pressed', async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      findByText,
    } = render(<Dashboard />, {
      wrapper: ProvidersWrapper,
    });

    const textInput = getByPlaceholderText("Digite aqui 'usuário/repositório'");
    const submitButton = getByTestId('input-button');

    fireEvent.changeText(textInput, reactRepositoryResponse.full_name);
    fireEvent.press(submitButton);

    const repositoryCard = await findByText(reactRepositoryResponse.full_name);

    fireEvent.press(repositoryCard);

    expect(mockedNavigate).toHaveBeenCalledWith(
      'Repository', {
      repositoryId: reactRepositoryResponse.id
    });
  });
});