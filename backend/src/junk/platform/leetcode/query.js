export const query = `
query userProfile($username: String!, $limit: Int!) {
    matchedUser(username: $username) {
        username
        profile {
            ranking
        }
        languageProblemCount {
            languageName
            problemsSolved
        }
        submitStats: submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
            }
        }
    }
    recentAcSubmissionList(username: $username, limit: $limit) {
        title
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        globalRanking
        rating
    }
}
`;
