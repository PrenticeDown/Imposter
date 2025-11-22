# Design Guidelines: Imposter Party Game Web App

## Design Approach
**Material Design System** - Selected for mobile-first utility applications requiring clear touch interactions, strong visual feedback, and content-focused layouts. This party game prioritizes efficiency and clarity over visual flair.

## Core Design Principles
1. **Touch-First**: Large tap targets (minimum 48px height) for easy interaction when passing device
2. **Clear Hierarchy**: Bold typography and spacing to guide users through setup → reveal flow
3. **Instant Feedback**: Visual states for all interactions without distracting animations
4. **Privacy-Conscious**: Clear visual separation between reveal and hidden states

---

## Typography System

**Font Family**: Roboto (via Google Fonts CDN)
- Primary: Roboto (400, 500, 700 weights)

**Type Scale**:
- Page Titles: text-3xl font-bold (Setup, Players)
- Section Headers: text-xl font-medium (Player Names, Game Settings)
- Labels: text-base font-medium (Number of Players, Toggle labels)
- Body Text: text-base (Instructions, player names in list)
- Role Reveals: text-2xl font-bold (IMPOSTER / CREWMATE headings)
- Secret Words: text-xl font-medium (The actual word display)
- Helper Text: text-sm (Validation messages, hints)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-6
- Between sections: space-y-6
- Between form elements: space-y-4
- Button padding: px-6 py-3
- Card/container padding: p-8

**Container Strategy**:
- Max width: max-w-md (optimized for mobile/tablet portrait)
- Centering: mx-auto
- Full viewport: min-h-screen with centered content
- Side margins: px-4 (breathing room on small screens)

**Screen Flow Layout**:
1. **Setup Screen**: Single column, vertically stacked form
2. **Name Entry Screen**: Single column list of input fields
3. **Role Reveal Screen**: Single column list of player name buttons
4. **Role Modal/Reveal**: Centered overlay taking majority of viewport

---

## Component Library

### Form Components

**Number Input** (Player count, Imposter count):
- Border: border-2 with rounded corners (rounded-lg)
- Padding: px-4 py-3
- Full width: w-full
- Focus state: Thicker border treatment

**Text Input** (Player names):
- Same styling as number input
- Large enough for comfortable typing
- Placeholder text for guidance

**Toggle Switch** (Hint word option):
- Material Design switch component
- Label positioned to the left
- Clear on/off states with different visual treatment
- Touch target: minimum h-12

**Buttons**:
- Primary Action (Start Game, Continue, Reveal): Filled style, px-6 py-3, rounded-lg, font-medium
- Secondary Action (New Game, Back): Outlined or text style, same padding
- Full width on mobile: w-full
- Icon support (Heroicons) for navigation where helpful

### Player Name List

**List Item Structure**:
- Each player name as a full-width button
- Padding: px-6 py-4
- Border between items
- Active/pressed state with background change
- Clear typography: text-lg font-medium

### Role Reveal Modal/Screen

**When player taps their name**:
- Full-screen overlay with semi-transparent backdrop
- Centered card: max-w-sm, p-8, rounded-2xl
- Role title at top: Large, bold
- Word display below: Generous spacing (mt-6)
- Visual countdown indicator (progress bar or simple text: "Hiding in 3...")

**Role-Specific Content**:
- Crewmate: "CREWMATE" header + "Your word is:" + [large word display]
- Imposter with hint: "IMPOSTER" header + "Your hint word is:" + [word]
- Imposter without hint: "IMPOSTER" header + "You do not have a word." (italic, softer treatment)

### Validation & Feedback

**Inline Validation Messages**:
- Below relevant input: text-sm
- Spacing: mt-2
- Icons from Heroicons (alert-circle for errors)

**Empty States**:
- When no names entered: Centered message with helpful prompt

---

## Navigation & Flow

**Screen Progression**:
1. Setup → Name Entry → Role Reveal List
2. "New Game" button always accessible to restart

**Back Navigation** (optional on earlier screens):
- Text button in top-left: "← Back"

**Step Indicators** (optional):
- Simple text: "Step 1 of 3" centered below title

---

## Mobile Optimization

**Touch Targets**: All interactive elements minimum 44-48px height
**Viewport Management**: Each screen takes natural height, no forced 100vh
**Input Focus**: Ensure keyboard doesn't obscure active input (scroll into view)
**Orientation**: Optimized for portrait, functional in landscape

---

## Interaction Patterns

**Role Reveal Behavior**:
- Tap player name → Instant reveal (no animation)
- 4-second display
- Auto-hide with smooth fade (200ms)
- Return to name list

**Form Submission**:
- Validate on submit
- Disable button during processing
- Clear error states when user corrects

---

## Icons

**Library**: Heroicons (via CDN)
**Usage**:
- Form validation: exclamation-circle, check-circle
- Navigation: arrow-left, arrow-right
- Buttons: play, refresh
- All icons: 20px or 24px sizing

---

## Accessibility

- Clear focus indicators on all interactive elements
- Sufficient contrast for all text
- Semantic HTML (form elements, buttons, headings)
- Touch target sizes for motor accessibility
- Logical tab order through forms