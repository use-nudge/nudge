//
//  AccountEditingView.swift
//  Nudge
//
//  Created by Le, Lambert on 10/17/26.
//

import SwiftUI
// Account Editing screen
struct AccountEditingView: View {
    // Account information
    @State private var name = ""
    @State private var email = ""
    @State private var displayName = ""

    // Password fields
    @State private var currentPassword = ""
    @State private var newPassword = ""
    @State private var confirmPassword = ""

    // UI state
    @State private var showSuccessMessage = false
    
    init(
        name: String = "",
        email: String = "",
        displayName: String = ""
    ){
        _name = State(initialValue: name)
        _email = State(initialValue: email)
        _displayName = State(initialValue: displayName)
    }

    var body: some View {
        ScrollView {
            VStack(spacing: AppTheme.Spacing.extraLarge) {

                profileSection

                accountInformationSection

                passwordSection

                if showSuccessMessage {
                    successMessage
                }
            }
            .padding(.horizontal, AppTheme.Spacing.page)
            .padding(.top, AppTheme.Spacing.large)
            .padding(.bottom, AppTheme.Spacing.section)
        }
        .background(AppTheme.Colors.background)
        .navigationTitle("Account")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Save") {
                    saveAccount()
                }
                .font(AppTheme.Typography.cardTitle)
                .foregroundStyle(AppTheme.Colors.primary)
            }
        }
    }

    // MARK: - Profile

    private var profileSection: some View {
        VStack(spacing: AppTheme.Spacing.small) {
            ZStack {
                Circle()
                    .fill(AppTheme.Colors.primarySoft)
                    .frame(width: 64, height: 64)

                Text(initials)
                    .font(AppTheme.Typography.cardTitle)
                    .foregroundStyle(AppTheme.Colors.primary)
            }

            Button("Change Photo") {
                // Photo picker can be added later
            }
            .font(AppTheme.Typography.caption)
            .foregroundStyle(AppTheme.Colors.primary)
        }
        .frame(maxWidth: .infinity)
    }

    // MARK: - Account Information

    private var accountInformationSection: some View {
        VStack(alignment: .leading, spacing: AppTheme.Spacing.large) {
            NudgeTextField(
                title: "Name",
                placeholder: "Enter your name",
                text: $name
            )

            NudgeTextField(
                title: "Email",
                placeholder: "Enter your email",
                text: $email
            )

            NudgeTextField(
                title: "Queue display name",
                placeholder: "Enter a display name",
                text: $displayName
            )
        }
    }

    // MARK: - Password

    private var passwordSection: some View {
        VStack(alignment: .leading, spacing: AppTheme.Spacing.large) {
            Text("Change password")
                .font(AppTheme.Typography.sectionTitle)
                .foregroundStyle(AppTheme.Colors.textPrimary)

            NudgeTextField(
                title: "Current password",
                placeholder: "Required",
                text: $currentPassword,
                isSecure: true
            )

            NudgeTextField(
                title: "New password",
                placeholder: "At least 8 characters",
                text: $newPassword,
                isSecure: true
            )

            NudgeTextField(
                title: "Confirm new password",
                placeholder: "Re-enter password",
                text: $confirmPassword,
                isSecure: true
            )
        }
    }

    // MARK: - Success Message

    private var successMessage: some View {
        HStack(spacing: AppTheme.Spacing.small) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundStyle(AppTheme.Colors.success)

            Text("Account information saved successfully")
                .font(AppTheme.Typography.body)
                .foregroundStyle(AppTheme.Colors.textPrimary)

            Spacer()
        }
        .padding(AppTheme.Spacing.medium)
        .background(AppTheme.Colors.successSoft)
        .clipShape(
            RoundedRectangle(
                cornerRadius: AppTheme.Radius.small
            )
        )
    }

    // MARK: - Helpers

    private var initials: String {
        let parts = name.split(separator: " ")

        let letters = parts.prefix(2).compactMap {
            $0.first
        }

        return String(letters).uppercased()
    }

    // MARK: - Actions

    private func saveAccount() {
        // Firebase/ViewModel code will replace this later.
        showSuccessMessage = true
    }
}

#Preview {
    NavigationStack {
        AccountEditingView(
            name: MockData.user.name,
            email: MockData.user.email,
            displayName: MockData.user.displayName!
        )
    }
}
