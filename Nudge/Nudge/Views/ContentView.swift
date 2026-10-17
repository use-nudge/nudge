import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            NavigationStack {
                CoursesDashboardView(
                    user: MockData.user,
                    notifications: MockData.notifications,
                    courses: MockData.courses
                )
            }
            .tabItem {
                Label("Courses", systemImage: "book.closed")
            }

            PlaceholderTabView(title: "My Sessions")
                .tabItem {
                    Label("My Sessions", systemImage: "calendar")
                }

            PlaceholderTabView(title: "Settings")
                .tabItem {
                    Label("Settings", systemImage: "gearshape")
                }
        }
        .tint(AppTheme.Colors.primary)
    }
}

private struct PlaceholderTabView: View {
    let title: LocalizedStringKey

    var body: some View {
        Text(title)
            .font(.title2.weight(.semibold))
            .foregroundStyle(AppTheme.Colors.textPrimary)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(AppTheme.Colors.surface)
    }
}

#Preview {
    ContentView()
}
