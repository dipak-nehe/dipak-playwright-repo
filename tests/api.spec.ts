import { test, expect } from '@playwright/test';
const REPO = `test-repo-${Date.now()}`;
const USER = 'dipak-nehe';

test.beforeAll(async ({ request }) => {
  // Create a new repository
  const response = await request.post('/user/repos', {
    data: {
      name: REPO
    }
  });
  expect(response.ok()).toBeTruthy();
});

test.afterAll(async ({ request }) => {
  // Delete the repository
  const response = await request.delete(`/repos/${USER}/${REPO}`);
  expect(response.ok()).toBeTruthy();
});

test('should create a bug report', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();
    const createdIssue = await newIssue.json();

  console.log('CREATE STATUS:', newIssue.status());
  console.log('CREATE ISSUE:', JSON.stringify(createdIssue, null, 2));
  expect(newIssue.status()).toBe(201);
expect(createdIssue.title).toBe('[Bug] report 1');
expect(createdIssue.body).toBe('Bug description');
expect(createdIssue.state).toBe('open');
expect(createdIssue.number).toBe(1);
const issueNumber = createdIssue.number;

const issues = await request.get(`/repos/${USER}/${REPO}/issues/${issueNumber}`);
expect(issues.status()).toBe(200);
const json = await issues.json();
console.log('GET ISSUES RESPONSE:', JSON.stringify(json, null, 2));
console.log('GET ISSUES RESPONSE:', json);

console.log(`/repos/${USER}/${REPO}/issues`);

expect(json).toEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));

});

test('should create a feature request', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();
});