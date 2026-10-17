import SwiftUI

// Defines colors, font sizes, spacing, corner radii, shadows
enum AppTheme {
    // Reusable colors for app
    enum Colors {
        static let primary = Color(red: 154 / 255, green: 52 / 255, blue: 18 / 255)
        static let primaryDark = Color(red: 124 / 255, green: 45 / 255, blue: 18 / 255)
        static let primaryBright = Color(red: 194 / 255, green: 65 / 255, blue: 12 / 255)
        static let primarySoft = Color(red: 255 / 255, green: 237 / 255, blue: 213 / 255)
        static let primaryFaint = Color(red: 255 / 255, green: 247 / 255, blue: 237 / 255)

        static let background = Color(red: 245 / 255, green: 246 / 255, blue: 250 / 255)
        static let surface = Color.white
        static let textPrimary = Color(red: 22 / 255, green: 21 / 255, blue: 33 / 255)
        static let textSecondary = Color(red: 102 / 255, green: 99 / 255, blue: 115 / 255)
        static let textTertiary = Color(red: 150 / 255, green: 146 / 255, blue: 161 / 255)
        static let border = Color(red: 231 / 255, green: 229 / 255, blue: 236 / 255)
        static let coralSoft = Color(red: 255 / 255, green: 235 / 255, blue: 228 / 255)
        static let coralText = Color(red: 170 / 255, green: 76 / 255, blue: 45 / 255)
        static let success = Color(red: 34 / 255, green: 139 / 255, blue: 94 / 225)
        static let successSoft = Color(red: 232 / 255, green: 247 / 255, blue: 239 / 255)
    }
    
    // Reusable fonts
    enum Typography {
        // Large title text
        static let largeTitle = Font.system(size: 30, weight: .regular)
        
        // Large greeting
        static let greeting = Font.system(size: 27, weight: .regular, design: .default)
        
        // Section headings
        static let sectionTitle = Font.system(size: 22, weight: .regular)
        
        // Titles inside cards
        static let cardTitle = Font.system(size: 17, weight: .semibold)
        
        // Normal text
        static let body = Font.system(size: 15, weight: .regular)
        
        // Smaller text
        static let caption = Font.system(size: 13, weight: .regular)
        
        // Small bold text
        static let eyebrow = Font.system(size: 13, weight: .bold)
    }

    enum Spacing {
        static let extraSmall: CGFloat = 4
        static let small: CGFloat = 8
        static let medium: CGFloat = 12
        static let large: CGFloat = 16
        static let extraLarge: CGFloat = 24
        static let section: CGFloat = 30
        static let page: CGFloat = 20
    }

    enum Radius {
        static let small: CGFloat = 12
        static let medium: CGFloat = 16
        static let card: CGFloat = 20
        static let large: CGFloat = 24
    }

    enum Shadow {
        static let color = Color.black.opacity(0.06)
        static let radius: CGFloat = 14
        static let y: CGFloat = 7
    }
    
    // Width and pattern for borders
    enum Border {
        static let width: CGFloat = 1
        static let dash: [CGFloat] = [4]
    }
    
    // Standard visual sizes for icons
    enum Icon {
        static let small: CGFloat = 16
        static let medium: CGFloat = 20
        static let large: CGFloat = 24
    }
    
    // Standard dimensions for interactive elements
    enum Control {
        static let buttonHeight: CGFloat = 50
        static let fieldHeight: CGFloat = 48
        static let minimumTapTarget: CGFloat = 44
    }
}
