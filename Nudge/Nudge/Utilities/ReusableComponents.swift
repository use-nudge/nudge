//
//  ReusableComponents.swift
//  Nudge
//
//  Created by Le, Lambert on 10/16/26.
//

import SwiftUI

// Button Styles

// The available button appearance types
enum NudgeButtonType {
    case primary
    case secondary
}

// A reusable button style for Nudge buttons
struct NudgeButtonStyle: ButtonStyle {

    let type: NudgeButtonType

    func makeBody(configuration: Configuration) -> some View {

        configuration.label
            .font(AppTheme.Typography.cardTitle)
            .frame(maxWidth: .infinity)
            .frame(height: AppTheme.Control.buttonHeight)
            .foregroundStyle(
                type == .primary
                ? Color.white
                : AppTheme.Colors.primary
            )
            .background(
                type == .primary
                ? AppTheme.Colors.primary
                : AppTheme.Colors.surface
            )
            .overlay {
                RoundedRectangle(
                    cornerRadius: AppTheme.Radius.small
                )
                .stroke(
                    type == .secondary
                    ? AppTheme.Colors.primary
                    : Color.clear,
                    lineWidth: AppTheme.Border.width
                )
            }
            .clipShape(
                RoundedRectangle(
                    cornerRadius: AppTheme.Radius.small
                )
            )
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}

// Card Style

// Types of card borders used throughout the app
enum NudgeCardType {
    case standard
    case dashed
}

// Applies the standard Nudge card appearance
struct NudgeCardModifier: ViewModifier {

    let type: NudgeCardType

    func body(content: Content) -> some View {

        content
            .padding(AppTheme.Spacing.large)
            .background(AppTheme.Colors.surface)
            .overlay {
                RoundedRectangle(
                    cornerRadius: AppTheme.Radius.card
                )
                .stroke(
                    AppTheme.Colors.border,
                    style: type == .dashed
                    ? StrokeStyle(
                        lineWidth: AppTheme.Border.width,
                        dash: AppTheme.Border.dash
                    )
                    : StrokeStyle(
                        lineWidth: AppTheme.Border.width
                    )
                )
            }
            .clipShape(
                RoundedRectangle(
                    cornerRadius: AppTheme.Radius.card
                )
            )
            .shadow(
                color: type == .standard
                ? AppTheme.Shadow.color
                : Color.clear,
                radius: AppTheme.Shadow.radius,
                y: AppTheme.Shadow.y
            )
    }
}

extension View {
    
    func nudgeCard(
        type: NudgeCardType = .standard
    ) -> some View {
        
        modifier(
            NudgeCardModifier(type: type)
        )
    }
}

// Status Badge

// Status appearances used throughout the app
enum NudgeStatus {
    case live
    case scheduled
    case waiting
    case paused
    case resolved
    case closed

    var title: String {
        switch self {
        case .live:
            return "Live"
        case .scheduled:
            return "Scheduled"
        case .waiting:
            return "Waiting"
        case .paused:
            return "Paused"
        case .resolved:
            return "Resolved"
        case .closed:
            return "Closed"
        }
    }

    var textColor: Color {
        switch self {
        case .live, .resolved:
            return AppTheme.Colors.success

        case .scheduled, .waiting:
            return AppTheme.Colors.primary

        case .paused:
            return AppTheme.Colors.coralText

        case .closed:
            return AppTheme.Colors.textSecondary
        }
    }

    var backgroundColor: Color {
        switch self {
        case .live, .resolved:
            return AppTheme.Colors.successSoft

        case .scheduled, .waiting:
            return AppTheme.Colors.primarySoft

        case .paused:
            return AppTheme.Colors.coralSoft

        case .closed:
            return AppTheme.Colors.background
        }
    }
}

// Displays a small status label
struct NudgeStatusBadge: View {

    let status: NudgeStatus

    var body: some View {

        Text(status.title)
            .font(AppTheme.Typography.caption)
            .foregroundStyle(status.textColor)
            .padding(.horizontal, AppTheme.Spacing.medium)
            .padding(.vertical, AppTheme.Spacing.small)
            .background(
                status.backgroundColor,
                in: Capsule()
            )
    }
}

// Form Field

// A reusable text-entry field used throughout Nudge
struct NudgeTextField: View {

    let title: String
    let placeholder: String

    @Binding var text: String

    var isSecure = false

    var body: some View {

        VStack(
            alignment: .leading,
            spacing: AppTheme.Spacing.small
        ) {

            Text(title)
                .font(AppTheme.Typography.caption)
                .foregroundStyle(
                    AppTheme.Colors.textPrimary
                )

            Group {

                if isSecure {

                    SecureField(
                        placeholder,
                        text: $text
                    )

                } else {

                    TextField(
                        placeholder,
                        text: $text
                    )
                }
            }
            .padding(.horizontal, AppTheme.Spacing.large)
            .frame(
                height: AppTheme.Control.fieldHeight
            )
            .background(AppTheme.Colors.surface)
            .overlay {
                RoundedRectangle(
                    cornerRadius: AppTheme.Radius.small
                )
                .stroke(
                    AppTheme.Colors.border,
                    lineWidth: AppTheme.Border.width
                )
            }
        }
    }
}

// Section Header

// Displays a standard section title with an optional action
struct NudgeSectionHeader: View {

    let title: String
    var actionTitle: String? = nil
    var action: (() -> Void)? = nil

    var body: some View {

        HStack {

            Text(title)
                .font(AppTheme.Typography.sectionTitle)
                .foregroundStyle(
                    AppTheme.Colors.textPrimary
                )

            Spacer()

            if let actionTitle,
               let action {

                Button(
                    actionTitle,
                    action: action
                )
                .font(AppTheme.Typography.cardTitle)
                .foregroundStyle(
                    AppTheme.Colors.primary
                )
            }
        }
    }
}
