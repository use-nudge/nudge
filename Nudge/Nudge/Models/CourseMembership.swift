//
//  CourseMembership.swift
//  Nudge
//
//  Created by Felipe Benitez on 10/15/26.
//
import Foundation

struct CourseMembership: Codable {
    var userId: String
    var role: CourseRole
    var joinedAt: Date
}
