//
//  AccountEditingViewModel.swift
//  Nudge
//
//  Created by Le, Lambert on 10/17/26.
//

import Foundation
import Combine

@MainActor
final class AccountViewModel: ObservableObject {

    // MARK: - Account Information

    @Published var name = ""
    @Published var email = ""
    @Published var displayName = ""

    // MARK: - Password Information

    @Published var currentPassword = ""
    @Published var newPassword = ""
    @Published var confirmPassword = ""

    // MARK: - UI State

    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var successMessage: String?

    // MARK: - Services

    private let userService: UserService
    private let authService: AccountAuthService

    // Used to determine whether the email was changed.
    private var originalEmail = ""

    // MARK: - Initializer

    init(
        userService: UserService = UserService(),
        authService: AccountAuthService = AccountAuthService()
    ) {
        self.userService = userService
        self.authService = authService
    }

    // MARK: - Load Account

    func loadAccount() async {
        isLoading = true
        errorMessage = nil

        do {
            let user = try await userService.getCurrentUser()

            name = user.name
            email = user.email
            displayName = user.displayName ?? ""

            originalEmail = user.email
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    // MARK: - Save Account

    func saveAccount() async {
        errorMessage = nil
        successMessage = nil

        guard !name.trimmingCharacters(in: .whitespaces).isEmpty else {
            errorMessage = "Name cannot be empty."
            return
        }

        guard !email.trimmingCharacters(in: .whitespaces).isEmpty else {
            errorMessage = "Email cannot be empty."
            return
        }

        isLoading = true

        do {
            // If the email changed, update Firebase Authentication first.
            if email != originalEmail {
                guard !currentPassword.isEmpty else {
                    errorMessage = "Enter your current password to change your email."
                    isLoading = false
                    return
                }

                try await authService.updateEmail(
                    newEmail: email,
                    currentPassword: currentPassword
                )
            }

            // Save profile information to Firestore.
            let newDisplayName: String? =
                displayName.trimmingCharacters(in: .whitespaces).isEmpty
                ? nil
                : displayName

            try await userService.updateProfile(
                name: name,
                displayName: newDisplayName,
                email: email
            )

            originalEmail = email
            currentPassword = ""

            successMessage = "Account information saved successfully."
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    // MARK: - Change Password

    func changePassword() async {
        errorMessage = nil
        successMessage = nil

        guard !currentPassword.isEmpty else {
            errorMessage = "Current password is required."
            return
        }

        guard newPassword.count >= 8 else {
            errorMessage = "New password must be at least 8 characters."
            return
        }

        guard newPassword == confirmPassword else {
            errorMessage = "New passwords do not match."
            return
        }

        isLoading = true

        do {
            try await authService.changePassword(
                currentPassword: currentPassword,
                newPassword: newPassword
            )

            currentPassword = ""
            newPassword = ""
            confirmPassword = ""

            successMessage = "Password changed successfully."
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    // MARK: - Password Reset

    func sendPasswordReset() async {
        errorMessage = nil
        successMessage = nil

        guard !email.isEmpty else {
            errorMessage = "No email address is available."
            return
        }

        isLoading = true

        do {
            try await authService.sendPasswordReset(
                email: email
            )

            successMessage = "Password reset email sent."
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    // MARK: - Delete Account

    func deleteAccount() async {
        errorMessage = nil
        successMessage = nil

        guard !currentPassword.isEmpty else {
            errorMessage = "Enter your current password before deleting your account."
            return
        }

        isLoading = true

        do {
            // Firebase may require a recent login before deletion.
            try await authService.reauthenticate(
                currentPassword: currentPassword
            )

            // Delete the user's Firestore information.
            try await userService.deleteCurrentUserData()

            // Delete the Firebase Authentication account.
            try await authService.deleteCurrentUser()

        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
