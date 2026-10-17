import Foundation

struct DashboardCourse: Identifiable {
    let id: String
    let course: Course
    let code: String
    let role: CourseRole
    let sessionSummary: String
    let usesCoralAccent: Bool

    var roleTitle: String {
        switch role {
        case .creator:
            "Course Creator"
        case .ta:
            "Course Staff"
        case .student:
            "Student"
        }
    }
}

struct DashboardNotification: Identifiable {
    let id: String
    let title: String
    let detail: String
    let time: String
}

enum MockData {
    static let user = AppUser(
        name: "Alex Rivera",
        displayName: "Alex R.",
        email: "alex.rivera@utexas.edu",
        createdAt: Date()
    )

    static let notifications = [
        DashboardNotification(
            id: "queue-position",
            title: "You’re #4 in CS 371p",
            detail: "We’ll remind you at 3 positions away.",
            time: "now"
        ),
        DashboardNotification(
            id: "location-update",
            title: "Location updated",
            detail: "Office hours moved to GDC 2.210.",
            time: "8m"
        ),
        DashboardNotification(
            id: "session-reminder",
            title: "Session starts soon",
            detail: "Project 3 Help begins at 3:00 PM.",
            time: "1h"
        )
    ]

    static let courses = [
        DashboardCourse(
            id: "cs371p",
            course: Course(
                name: "iOS Mobile Computing",
                description: "Build polished native iOS apps.",
                joinCode: "N4DG7K",
                createdAt: Date()
            ),
            code: "CS 371p",
            role: .student,
            sessionSummary: "Office hours open now · 6 waiting",
            usesCoralAccent: false
        ),
        DashboardCourse(
            id: "cs314",
            course: Course(
                name: "Data Structures",
                description: "Core data structures and algorithms.",
                joinCode: "D4TA22",
                createdAt: Date()
            ),
            code: "CS 314",
            role: .ta,
            sessionSummary: "Next session tomorrow at 3:00 PM",
            usesCoralAccent: true
        )
    ]
}
