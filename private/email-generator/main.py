#!/usr/bin/env python3
#pylint: disable=redefined-outer-name

import json
from typing import Literal

with open("private\\email-generator\\users.json", "r", encoding="UTF-8") as f:
    USERS = json.load(f).get("users")

# with open("templates/individual_email.txt", "r", encoding="UTF-8") as f:
#     INDIVIDUAL_EMAIL = f.read()

# with open("templates/team_email.txt", "r", encoding="UTF-8") as f:
#     TEAM_EMAIL = f.read()


POINTS = {
    1: 5,
    2: 10,
    3: 12,
    4: 14,
    5: 16,
    6: 18,
    7: 25,
}

FINALBOSS_CORRECT = ["Ionic_Iridiscense", "Girlie Pies"]


def get_last_timestamp(answers):
    """Return the timestamp of the last answer of a user"""

    if "answers" in answers and answers["answers"]:
        answer_timestamps = []

        for answer in answers["answers"].values():
            if isinstance(answer, dict):
                answer_timestamps.append(answer.get("timestamp", {}).get("seconds", 0))
            else:
                answer_timestamps.append(0)

        return max(answer_timestamps)
    else:
        return float("inf")


def get_top_individuals():
    """Return a list of the top individuals by points and time"""

    individuals = [user for user in USERS if not user.get("teamName", None)]

    return sorted(
        individuals, key=lambda x: (x["points"], -get_last_timestamp(x)), reverse=True
    )


def get_top_teams():
    """Return a list of the top teams by points and time"""

    team_set = {user["teamName"] for user in USERS if user.get("teamName", None)}
    teams = {team: {"points": 0, "members": [], "answers": {}} for team in team_set}
    team_list = []

    for team in teams:
        team_answers = teams[team]["answers"]

        for user in USERS:
            if user.get("teamName", None) == team:
                teams[team]["members"].append(user["email"])

                for answer in user["answers"]:
                    if answer not in team_answers:
                        team_answers[answer] = user["answers"][answer]
                    elif isinstance(team_answers[answer], str) and isinstance(
                        user["answers"][answer], dict
                    ):
                        team_answers[answer] = user["answers"][answer]
                    elif isinstance(user["answers"][answer], dict) and isinstance(
                        team_answers[answer], dict
                    ):
                        if (
                            user["answers"][answer]["timestamp"]["seconds"]
                            > team_answers[answer]["timestamp"]["seconds"]
                        ):
                            team_answers[answer] = user["answers"][answer]

    for team in teams:
        for answer in teams[team]["answers"]:
            if (
                answer == "finalboss"
                and teams[team]["answers"][answer]["answer"] in FINALBOSS_CORRECT
            ):
                teams[team]["points"] += POINTS[7]
            elif answer != "finalboss":
                teams[team]["points"] += POINTS[int(answer)]

    for team in teams:
        team_list.append(
            {
                "name": team,
                "points": teams[team]["points"],
                "members": teams[team]["members"],
                "answers": teams[team]["answers"],
            }
        )

    return sorted(
        team_list, key=lambda x: (x["points"], -get_last_timestamp(x)), reverse=True
    )


def generate_email(user: dict, team: dict, placement: int, category: Literal["individual", "team"]):
    """Generate the email for a user"""

    def ordinal(placement):
        if 4 <= placement <= 20:
            suffix = "th"
        elif placement == 1 or (placement % 10) == 1:
            suffix = "st"
        elif placement == 2 or (placement % 10) == 2:
            suffix = "nd"
        elif placement == 3 or (placement % 10) == 3:
            suffix = "rd"
        elif placement < 100:
            suffix = "th"

        return str(placement) + suffix
    
    return f"""\
email: {user["email"] if category == "individual" else ", ".join(team["members"])}

Greetings {team["name"] if category == "team" else user["name"]},
{f"Congratulations on placing {ordinal(placement)} in HackDLRC!" if user["points"] else "Congratulations on your performance in HackDLRC!"}

You've earned the following rewards -
- An Interview Cake Full Course Membership, make sure you claim it before 9th Dec over at https://www.interviewcake.com/r/2I5JX1{"\n- A giftable Stck.me Pro Membership (see attached pdf for more info)" if user["points"] or (category == "team" and team["points"]) else ""}
{"We've attached your HackDLRC certificate below." if user["points"] else ""}

Thank you for being a part of HackDLRC, we hope to see you next year!
Ansh & Aneesh
"""


if __name__ == "__main__":
    print("TOP INDIVIDUALS:")
    for i, user in enumerate(get_top_individuals()):
        # os.mkdir(f"emails/{user["email"]}")
        # with open(f"emails/{user["email"]}/email.txt", "w") as f:
        #     f.write(generate_email(user, None, i+1, "individual"))
        if not user["points"]: continue
        print(f"{i+1}. {user['name']} - {user['email']}")

    print("\nTOP TEAMS:")

    for i, team in enumerate(get_top_teams()):
        # os.mkdir(f"emails/{team["name"]}")
        # with open(f"emails/{team["name"]}/email.txt", "w") as f:
        #     f.write(generate_email(user, team, i+1, "team"))
        if not team["points"]: continue
        # name of team members
        team_members = []
        for user in USERS:
            if user.get("teamName") == team["name"]:
                team_members.append(user["name"])

        print(f"{i+1}. {team['name']} - {", ".join(team_members)}")
