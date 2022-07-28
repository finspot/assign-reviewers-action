const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });
    const octokit = new github.getOctokit(token);
    let whoToAssign = core.getInput('who-to-assign').split(' ');
    
    if (github.context.eventName === 'pull_request') {
        const reviewers = github.context.payload.pull_request.requested_reviewers.map(user => user.login);
        whoToAssign = reviewers.filter(r => whoToAssign.includes(r));
    } else if (github.context.eventName === 'pull_request_review') {
        const author = [github.context.payload.pull_request.user.login];
        whoToAssign = author.filter(a => whoToAssign.includes(a));
    }

    octokit.rest.issues.addAssignees({
        owner: github.context.issue.owner,
        repo: github.context.issue.repo,
        issue_number: github.context.issue.number,
        assignees: whoToAssign
    });
    
    } catch (error) {
    core.setFailed(error.message);
}