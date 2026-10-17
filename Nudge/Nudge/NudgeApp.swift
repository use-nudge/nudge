// xcode: set sdk=iOS

//
//  NudgeApp.swift
//  Nudge
//
//  Created by Felipe Benitez on 10/12/26.
//

import SwiftUI
import FirebaseCore

class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()
    print("Firebase initialized: \(FirebaseApp.app() != nil)")
    return true
  }
}

@main
struct NudgeApp: App {
  // register app delegate for Firebase setup
  @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}
