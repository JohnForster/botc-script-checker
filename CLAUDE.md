# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Blood on the Clocktower script validation tool built with Preact, TypeScript, and Vite. The application analyzes custom game scripts for balance issues and provides recommendations to script creators. It's deployed to GitHub Pages at `https://johnforster.github.io/botc-script-checker`.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Build for production (includes TypeScript compilation)
npm run build

# Preview production build
npm run preview
```

## Project Architecture

### Tech Stack
- **Frontend Framework**: Preact (React-like library)  
- **Build Tool**: Vite
- **Language**: TypeScript
- **Testing**: Vitest
- **Styling**: CSS

### Core Application Flow

1. **Script Input**: Users upload JSON files or paste script content via `ScriptChecker.tsx`
2. **Validation Engine**: `validator/validator.ts` runs multiple validation checks against the script
3. **Results Display**: Issues are categorized by severity (high/medium/low) and displayed with explanations

### Key Data Structures

The validation system relies on comprehensive character data:

- `src/data/all_characters.ts` - Complete character database with abilities, types, and metadata
- `src/data/considerations.ts` - Character balance considerations including:
  - `requirements`: Mandatory conditions for including characters
  - `suggestions`: Recommended conditions for optimal balance  
  - `tags`: Categories for character behavior/effects (e.g., "causes-droisoning", "resurrection")
  - `clashes`: Characters that conflict with each other
  - `setup`: How characters affect game setup (outsider counts, etc.)

### Type System

- `src/types/schema.ts` - Complete Blood on the Clocktower custom script schema
- `src/types/types.ts` - Core application types (Script = BloodOnTheClocktowerCustomScript)
- `src/types/script.ts` - Utility functions for working with script data
- `src/types/considerations.ts` - Types for validation rules and character metadata

### Validation Rules

The validator implements checks for common script balance issues:

- **Misinformation Balance**: Too much/little droisoning and misregistration
- **Single Sources**: Lone resurrection or extra death sources  
- **Character Clashes**: Incompatible character combinations
- **Legion Scripts**: Characters overpowered when paired with Legion
- **Outsider Modification**: Scripts need ways for evil to bluff outsiders
- **Extra Evil Players**: Balance issues from too many evil-adding characters
- **Confirmation Chains**: Too many self-confirming characters
- **Execution Protection**: Balance between good/evil execution immunity

### File Structure

```
src/
├── app.tsx                 # Main application component
├── components/
│   └── ScriptChecker.tsx   # Primary UI component for script validation
├── data/
│   ├── all_characters.ts   # Character database
│   └── considerations.ts   # Validation rules and character metadata
├── types/                  # TypeScript type definitions
├── validator/
│   └── validator.ts       # Core validation engine with 9 rule checks
└── utils.ts               # Shared utilities
test/
├── scripts/               # Test script fixtures (official + custom)
└── validator.test.ts      # Comprehensive validation test suite
```

## Testing

The project has comprehensive test coverage for all validation rules using Vitest. Test scripts include official editions (Trouble Brewing, Bad Moon Rising, Sects & Violets) and edge case scenarios. Tests verify both positive and negative cases for each validation rule.

## Configuration Notes

- Vite config sets base path for GitHub Pages deployment
- TypeScript uses project references pattern (tsconfig.json → tsconfig.app.json + tsconfig.node.json)
- Uses pnpm for package management