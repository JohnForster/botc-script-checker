# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Blood on the Clocktower script validation tool built with Preact, TypeScript, and Vite. The application appears to be designed to check the compatibility and balance of character combinations in Blood on the Clocktower game scripts.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

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
- **Styling**: CSS

### Key Data Structure

The project centers around Blood on the Clocktower character data:

- `src/data/compiled_characters.json` - Complete character database with abilities, types, and metadata
- `src/data/considerations.json` - Character balance considerations including jinxes, requirements, suggestions, and tags
- `jinxes.txt` - Text format jinx rules for character interactions

### Data Schema

Characters have the following structure:
- Basic info: name, ability, type (townsfolk/minion/demon/outsider/travellers/fabled)
- Game mechanics: first_night, other_nights, reminders, affects_setup
- Metadata: home_script, icon, id

Considerations include:
- `jinxes`: Characters that conflict with this character
- `requirements`: Mandatory conditions for including this character
- `suggestions`: Recommended conditions for optimal balance
- `tags`: Categories for character behavior/effects
- `setup`: How the character affects game setup

### File Structure
- `src/main.tsx` - Entry point
- `src/app.tsx` - Main application component (currently default Vite template)
- `src/data/` - Character and rules data
- `index.html` - HTML template
- Configuration: `vite.config.ts`, `tsconfig.json`, `package.json`

## Development Notes

The application is currently in early development - the main app component still contains the default Vite + Preact template. The core functionality for script validation will likely be built around processing the character data and considerations to validate script compatibility and balance.