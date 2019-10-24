import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { Button } from '@material-ui/core';

import { OPEN_ISSUES, Issues } from './Issues';

const mocks = [
  {
    request: {
      query: OPEN_ISSUES
    },
    result: {
      data: {
        "repository": {
          "issues": {
            "totalCount": 1,
            "edges": [
              {
                "node": {
                  "id": "MDU6SXNzdWU1MDk2NzA1MDQ=",
                  "createdAt": "2019-10-20T23:45:48Z",
                  "title": "Another very important issue",
                  "url": "https://github.com/bapjiws/github-issue-manager/issues/2",
                  "bodyText": "This one should not be assigned to me.",
                  "assignees": {
                    "edges": [
                      {
                        "node": {
                          "login": "bapjiws",
                          "name": "Alexey Boklin",
                          "avatarUrl": "https://avatars2.githubusercontent.com/u/10408485?v=4"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "node": {
                  "id": "MDU6SXNzdWU1MDk2NzA1MDQ=",
                  "createdAt": "2019-10-20T23:45:48Z",
                  "title": "Another very important issue",
                  "url": "https://github.com/bapjiws/github-issue-manager/issues/2",
                  "bodyText": "This one should not be assigned to me.",
                  "assignees": {
                    "edges": [
                      {
                        "node": {
                          "login": "bapjiws",
                          "name": "Alexey Boklin",
                          "avatarUrl": "https://avatars2.githubusercontent.com/u/10408485?v=4"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
    },
  },
];

it.skip('renders without error', async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Issues />
    </MockedProvider>
  );
  const button = <Button>Quit</Button>;
  expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(button)).toEqual(true);
});