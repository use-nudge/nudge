//
//  AppUser.swift
//  Nudge
//
//  Created by Felipe Benitez on 10/15/26.
//

import Foundation
import FirebaseFirestore

struct AppUser: Codable, Identifiable {
    @DocumentID var id: String?

    var name: String
    var displayName: String?
    var email: String
    var createdAt: Date
}
