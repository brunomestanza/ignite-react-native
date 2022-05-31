import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import { Repository } from '../../screens/Repository';
import { ProvidersWrapper } from '../../../jest-utils/wrapper';

jest.mock('@react-navigation/core', () => ({
  useRoute: () => ({
    params: {
      repositoryId: 0
    }
  }),
}));
jest.mock('../../hooks/useRepositories', () => ({
  useRepositories: () => ({
    findRepositoryById: () => ({
      id: 0,
      full_name: 'facebook/react',
      owner: {
        avatar_url: 'https://github.com/facebook.png'
      },
      description: 'repository description',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 1,
      issues_url: 'https://issues-url.com',
      issues: [
        {
          id: 0,
          title: 'issue-title',
          html_url: 'http://issue-html_url',
          user: {
            login: 'user-login',
          }
        }
      ]
    })
  })
}))

describe('Repository', () => {
  it('should be able to show repository data', async () => {
    const { findByText, getByText } = render(<Repository />, {
      wrapper: ProvidersWrapper
    });

    await findByText('facebook/react');
    getByText('repository description');
    getByText('issue-title');
  });

  it('should be able to open issue on browser', async () => {
    const openURLJestSpy = jest.spyOn(Linking, 'openURL');

    const { findByText } = render(<Repository />, {
      wrapper: ProvidersWrapper
    });

    const issueCard = await findByText('issue-title');
    fireEvent.press(issueCard);

    expect(openURLJestSpy).toHaveBeenCalledWith('http://issue-html_url')
  });
})