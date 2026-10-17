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
                        .font(.system(size: 22, weight: .regular))
                        .foregroundStyle(AppTheme.Colors.textPrimary)
                }
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
                .font(.system(size: 16, weight: .bold))
                .foregroundStyle(AppTheme.Colors.primaryDark)
                .frame(width: 52, height: 52)
                .background(AppTheme.Colors.primarySoft, in: Circle())
                .accessibilityLabel("Profile for \(name)")
        }
        .padding(.bottom, AppTheme.Spacing.extraLarge)
    }

    private var initials: String {
        name.split(separator: " ")
            .prefix(2)
            .compactMap(\.first)
            .map(String.init)
            .joined()
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
                    .font(.system(size: 17, weight: .medium))
                    .foregroundStyle(.white)
                    .frame(width: 48, height: 48)
                    .background(AppTheme.Colors.primary, in: RoundedRectangle(cornerRadius: 15))

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
                        .font(.caption2)
                        .foregroundStyle(AppTheme.Colors.textTertiary)
                }

                Spacer(minLength: 0)

                Image(systemName: "chevron.right")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(AppTheme.Colors.textTertiary)
            }
            .padding(AppTheme.Spacing.large)
            .frame(maxHeight: .infinity)
            .background(AppTheme.Colors.surface)
            .overlay {
                RoundedRectangle(cornerRadius: AppTheme.Radius.card)
                    .stroke(AppTheme.Colors.primarySoft)
            }
            .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.card))
            .shadow(
                color: AppTheme.Shadow.color,
                radius: AppTheme.Shadow.radius,
                y: AppTheme.Shadow.y
            )
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
            }
            .font(.system(size: 14, weight: .bold))
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
            HStack {
                Text("Your courses")
                    .font(AppTheme.Typography.sectionTitle)
                    .foregroundStyle(AppTheme.Colors.textPrimary)

                Spacer()

                Button("Join course", action: {})
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(AppTheme.Colors.primary)
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

    var body: some View {
        Button(action: {}) {
            HStack(spacing: AppTheme.Spacing.large) {
                Text(courseInitials)
                    .font(.system(size: 17, weight: .bold))
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
                        .font(.system(size: 18, weight: .regular))
                        .foregroundStyle(AppTheme.Colors.textPrimary)
                        .lineLimit(1)

                    Text(sessionSummary)
                        .font(AppTheme.Typography.caption)
                        .foregroundStyle(AppTheme.Colors.textSecondary)
                        .lineLimit(1)
                }

                Spacer(minLength: 0)

                Image(systemName: "chevron.right")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(AppTheme.Colors.textPrimary)
            }
            .padding(AppTheme.Spacing.large)
            .frame(maxWidth: .infinity, minHeight: 118, alignment: .leading)
            .background(AppTheme.Colors.surface)
            .overlay {
                RoundedRectangle(cornerRadius: AppTheme.Radius.card)
                    .stroke(AppTheme.Colors.border)
            }
            .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.card))
            .shadow(color: AppTheme.Shadow.color, radius: 10, y: 5)
        }
        .buttonStyle(.plain)
    }

    private var courseInitials: String {
        code.split(separator: " ").first.map(String.init) ?? code
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
                    .font(.system(size: 23, weight: .regular))
                    .foregroundStyle(AppTheme.Colors.primary)

                Spacer(minLength: 0)

                Text(title)
                    .font(.system(size: 17, weight: .bold))
                    .foregroundStyle(AppTheme.Colors.textPrimary)

                Text(subtitle)
                    .font(AppTheme.Typography.caption)
                    .foregroundStyle(AppTheme.Colors.textSecondary)
            }
            .padding(AppTheme.Spacing.large)
            .frame(maxWidth: .infinity, minHeight: 142, alignment: .leading)
            .background(AppTheme.Colors.surface)
            .overlay {
                RoundedRectangle(cornerRadius: AppTheme.Radius.card)
                    .stroke(AppTheme.Colors.border)
            }
        }
        .buttonStyle(.plain)
    }
}

private struct NewAccountHintView: View {
    var body: some View {
        HStack(alignment: .top, spacing: AppTheme.Spacing.large) {
            Image(systemName: "book.closed")
                .font(.system(size: 21))
                .foregroundStyle(AppTheme.Colors.textTertiary)

            VStack(alignment: .leading, spacing: AppTheme.Spacing.extraSmall) {
                Text("New account?")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(AppTheme.Colors.textPrimary)

                Text("Your joined and created courses will appear here.")
                    .font(AppTheme.Typography.caption)
                    .foregroundStyle(AppTheme.Colors.textSecondary)
            }

            Spacer()
        }
        .padding(AppTheme.Spacing.large)
        .frame(maxWidth: .infinity, alignment: .leading)
        .overlay {
            RoundedRectangle(cornerRadius: AppTheme.Radius.card)
                .stroke(
                    AppTheme.Colors.border,
                    style: StrokeStyle(lineWidth: 1, dash: [4])
                )
        }
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
