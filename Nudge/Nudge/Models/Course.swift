//
//  Course.swift
//  Nudge
//
//  Created by Felipe Benitez on 10/15/26.
//

import Foundation
import FirebaseFirestore

struct Course: Codable, Identifiable {
    @DocumentID var id: String?

    var name: String
    var description: String
    var joinCode: String
    var createdAt: Date
}
