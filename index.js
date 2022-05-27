const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });
    
    const reviewers = github.context.payload.pull_request.requested_reviewers.map(user => user.login);

    let whoToAssign = core.getInput('who-to-assign').split(' ');

    whoToAssign = reviewers.filter(r => whoToAssign.includes(r));

    const octokit = new github.getOctokit(token);

    octokit.rest.issues.addAssignees({
        owner: github.context.issue.owner,
        repo: github.context.issue.repo,
        issue_number: github.context.issue.number,
        assignees: whoToAssign
    });
    
    } catch (error) {
    core.setFailed(error.message);
}