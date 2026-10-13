# Nudge

Nudge is a queue-management application designed to help students and teaching staff coordinate office-hour sessions.

CS 371L — Fall 2026

## Project Structure

Nudge will use SwiftUI with a MVVM (Model-View-ViewModel) architecture (can change if we decide another architecture is better)

- **Models:** Define the application's data structures (for example, users, courses, queue entries)
- **Views:** SwiftUI screens and reusable UI components
- **ViewModels:** Manage UI state and screen-specific logic
- **Services:** Handle Firebase operations and shared application logic
- **Utilities:** Shared helper functions and constants

Remove the .gitkeep file from the folder once actual files are added

## Firebase

Nudge uses Firebase for authentication and cloud data storage.

- **Firebase Authentication:** Email/Password sign-in
- **Cloud Firestore:** Stores application data and supports real-time updates

### Configuration

- Firebase dependencies are managed through Swift Package Manager
- `GoogleService-Info.plist` contains the configuration for the shared Firebase project
- Firebase is initialized in `NudgeApp.swift`
- Cloud Firestore currently uses restrictive security rules

## Design

The initial app design is in [here](docs/nudge-design.png).


