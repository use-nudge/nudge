import SwiftUI

struct CoursesDashboardView: View {
    let user: AppUser
    let notifications: [DashboardNotification]
    let courses: [DashboardCourse]

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                DashboardGreetingView(name: user.name, date: .now)
                NotificationCarousel(notifications: notifications)
                NotificationLink()
                CoursesSection(courses: courses)
                CourseActionsView()
                NewAccountHintView()
            }
            .padding(.horizontal, AppTheme.Spacing.page)
            .padding(.top, AppTheme.Spacing.large)
            .padding(.bottom, AppTheme.Spacing.section)
        }
        .background(AppTheme.Colors.surface)
        .navigationTitle("Courses")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(action: {}) {
                    Image(systemName: "plus")
                        .font(.system(size: AppTheme.Icon.large))
                        .foregroundStyle(AppTheme.Colors.textPrimary)
                }
                .frame(minWidth: AppTheme.Control.minimumTapTarget,
                       minHeight: AppTheme.Control.minimumTapTarget)
                .accessibilityLabel("Add course")
            }
        }
    }
}

private struct DashboardGreetingView: View {
    let name: String
    let date: Date

    private var firstName: String {
        name.split(separator: " ").first.map(String.init) ?? name
    }

    private var greeting: LocalizedStringKey {
        let hour = Calendar.current.component(.hour, from: date)

        switch hour {
        case 5..<12:
            return "Good morning, \(firstName)"
        case 12..<18:
            return "Good afternoon, \(firstName)"
        default:
            return "Good evening, \(firstName)"
        }
    }
    
    private var initials: String {
            name.split(separator: " ")
                .prefix(2)
                .compactMap(\.first)
                .map(String.init)
                .joined()
        }

    var body: some View {
        HStack(spacing: AppTheme.Spacing.large) {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.small) {
                Text(date.formatted(.dateTime.weekday(.wide).month(.wide).day()).uppercased())
                    .font(AppTheme.Typography.eyebrow)
                    .tracking(1)
                    .foregroundStyle(AppTheme.Colors.primary)

                Text(greeting)
                    .font(AppTheme.Typography.greeting)
                    .foregroundStyle(AppTheme.Colors.textPrimary)
            }

            Spacer(minLength: AppTheme.Spacing.small)

            Text(initials)
                .font(AppTheme.Typography.cardTitle)
                .foregroundStyle(AppTheme.Colors.primaryDark)
                .frame(width: AppTheme.Control.buttonHeight, height: AppTheme.Control.buttonHeight)
                .background(AppTheme.Colors.primarySoft, in: Circle())
                .accessibilityLabel("Profile for \(name)")
        }
        .padding(.bottom, AppTheme.Spacing.extraLarge)
    }
}

private struct NotificationCarousel: View {
    let notifications: [DashboardNotification]

    var body: some View {
        GeometryReader { proxy in
            ScrollView(.horizontal) {
                LazyHStack(spacing: AppTheme.Spacing.medium) {
                    ForEach(notifications) { notification in
                        NotificationCardView(
                            title: notification.title,
                            detail: notification.detail,
                            time: notification.time
                        )
                        .frame(width: max(proxy.size.width * 0.86, 280))
                    }
                }
                .scrollTargetLayout()
            }
            .scrollIndicators(.hidden)
            .scrollTargetBehavior(.viewAligned)
        }
        .frame(height: 134)
        .padding(.vertical, AppTheme.Spacing.large)
    }
}

private struct NotificationCardView: View {
    let title: String
    let detail: String
    let time: String

    var body: some View {
        Button(action: {}) {
            HStack(spacing: AppTheme.Spacing.medium) {
                Image(systemName: "bell")
                    .font(.system(size: AppTheme.Icon.small, weight: .medium))
                    .foregroundStyle(.white)
                    .frame(width: AppTheme.Control.fieldHeight, height: AppTheme.Control.fieldHeight)
                    .background(AppTheme.Colors.primary, in: RoundedRectangle(cornerRadius: AppTheme.Radius.small))

                VStack(alignment: .leading, spacing: AppTheme.Spacing.extraSmall) {
                    Text(title)
                        .font(AppTheme.Typography.cardTitle)
                        .foregroundStyle(AppTheme.Colors.textPrimary)
                        .lineLimit(1)

                    Text(detail)
                        .font(AppTheme.Typography.caption)
                        .foregroundStyle(AppTheme.Colors.textSecondary)
                        .lineLimit(1)

                    Text(time)
                        .font(AppTheme.Typography.caption)
                        .foregroundStyle(AppTheme.Colors.textTertiary)
                }

                Spacer(minLength: 0)

                Image(systemName: "chevron.right")
                    .font(.system(size: AppTheme.Icon.small, weight: .semibold))
                    .foregroundStyle(AppTheme.Colors.textTertiary)
            }
            .padding(AppTheme.Spacing.large)
            .frame(maxHeight: .infinity)
            .nudgeCard()
        }
        .buttonStyle(.plain)
    }
}

private struct NotificationLink: View {
    var body: some View {
        Button(action: {}) {
            HStack(spacing: AppTheme.Spacing.small) {
                Text("View all notifications")
                Image(systemName: "arrow.right")
                    .font(.system(size: AppTheme.Icon.small))
            }
            .font(AppTheme.Typography.cardTitle)
            .foregroundStyle(AppTheme.Colors.primary)
            .frame(maxWidth: .infinity, alignment: .trailing)
        }
        .buttonStyle(.plain)
        .padding(.bottom, AppTheme.Spacing.section)
    }
}

private struct CoursesSection: View {
    let courses: [DashboardCourse]

    var body: some View {
        VStack(alignment: .leading, spacing: AppTheme.Spacing.medium) {
            NudgeSectionHeader(title: "Your courses", actionTitle: "Join course") {
                // join course action
            }
            .padding(.bottom, AppTheme.Spacing.small)

            ForEach(courses) { item in
                CourseCardView(
                    name: item.course.name,
                    code: item.code,
                    role: item.roleTitle,
                    sessionSummary: item.sessionSummary,
                    usesCoralAccent: item.usesCoralAccent
                )
            }
        }
    }
}

private struct CourseCardView: View {
    let name: String
    let code: String
    let role: String
    let sessionSummary: String
    let usesCoralAccent: Bool
    
    private var courseInitials: String {
        code.split(separator: " ").first.map(String.init) ?? code
    }

    var body: some View {
        Button(action: {}) {
            HStack(spacing: AppTheme.Spacing.large) {
                Text(courseInitials)
                    .font(AppTheme.Typography.cardTitle)
                    .foregroundStyle(usesCoralAccent ? AppTheme.Colors.coralText : AppTheme.Colors.primaryDark)
                    .frame(width: 58, height: 66)
                    .background(
                        usesCoralAccent ? AppTheme.Colors.coralSoft : AppTheme.Colors.primarySoft,
                        in: RoundedRectangle(cornerRadius: AppTheme.Radius.small)
                    )

                VStack(alignment: .leading, spacing: AppTheme.Spacing.extraSmall) {
                    Text("\(code) · \(role)".uppercased())
                        .font(AppTheme.Typography.eyebrow)
                        .tracking(0.7)
                        .foregroundStyle(AppTheme.Colors.primary)
                        .lineLimit(1)

                    Text(name)
                        .font(AppTheme.Typography.cardTitle)
                        .foregroundStyle(AppTheme.Colors.textPrimary)
                        .lineLimit(1)

                    Text(sessionSummary)
                        .font(AppTheme.Typography.caption)
                        .foregroundStyle(AppTheme.Colors.textSecondary)
                        .lineLimit(1)
                }

                Spacer(minLength: 0)

                Image(systemName: "chevron.right")
                    .font(.system(size: AppTheme.Icon.medium, weight: .semibold))
                    .foregroundStyle(AppTheme.Colors.textPrimary)
            }
            .nudgeCard()
        }
        .buttonStyle(.plain)
    }
}

private struct CourseActionsView: View {
    var body: some View {
        HStack(spacing: AppTheme.Spacing.medium) {
            DashboardActionCard(
                title: "Join Course",
                subtitle: "Enter a private code",
                systemImage: "plus"
            )

            DashboardActionCard(
                title: "Create Course",
                subtitle: "Start a new space",
                systemImage: "book.closed"
            )
        }
        .padding(.top, AppTheme.Spacing.extraLarge)
    }
}

private struct DashboardActionCard: View {
    let title: LocalizedStringKey
    let subtitle: LocalizedStringKey
    let systemImage: String

    var body: some View {
        Button(action: {}) {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.medium) {
                Image(systemName: systemImage)
                    .font(.system(size: AppTheme.Icon.large))
                    .foregroundStyle(AppTheme.Colors.primary)

                Spacer(minLength: 0)

                Text(title)
                    .font(AppTheme.Typography.cardTitle)
                    .foregroundStyle(AppTheme.Colors.textPrimary)

                Text(subtitle)
                    .font(AppTheme.Typography.caption)
                    .foregroundStyle(AppTheme.Colors.textSecondary)
            }
            .frame(maxWidth: .infinity, minHeight: 142, alignment: .leading)
            .nudgeCard()
        }
        .buttonStyle(.plain)
    }
}

private struct NewAccountHintView: View {
    var body: some View {
        HStack(alignment: .top, spacing: AppTheme.Spacing.large) {
            Image(systemName: "book.closed")
                .font(.system(size: AppTheme.Icon.medium))
                .foregroundStyle(AppTheme.Colors.textTertiary)

            VStack(alignment: .leading, spacing: AppTheme.Spacing.extraSmall) {
                Text("New account?")
                    .font(AppTheme.Typography.cardTitle)
                    .foregroundStyle(AppTheme.Colors.textPrimary)

                Text("Your joined and created courses will appear here.")
                    .font(AppTheme.Typography.caption)
                    .foregroundStyle(AppTheme.Colors.textSecondary)
            }

            Spacer()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .nudgeCard(type: .dashed)
        .padding(.top, AppTheme.Spacing.extraLarge)
    }
}

#Preview {
    NavigationStack {
        CoursesDashboardView(
            user: MockData.user,
            notifications: MockData.notifications,
            courses: MockData.courses
        )
    }
}
