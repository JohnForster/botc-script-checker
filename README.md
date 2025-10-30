# Blood on the Clocktower Script Checker

A web-based tool for spotting common mistakes in Blood on the Clocktower custom
scripts.

## ⚠️ Beta Status

Please provide feedback here: https://forms.gle/z1yeAW7x91X4Uc4H8

**This project is currently in beta.** The validation rules are based on general
script-writing guidelines and common patterns, but they are not definitive. Many
warnings may not apply to your specific script design, and experienced script
creators may have valid reasons to ignore certain recommendations.

**Always use your own judgment** when evaluating the suggestions provided by
this tool.

## What It Does

The Script Checker analyzes your custom Blood on the Clocktower scripts and
identifies potential issues across several categories:

### Severity Levels

Recommendations are sorted into three levels of severity

- **🔴 High**: Significant issues which are potentially game-ruining.
- **🟡 Medium**: Potential problems worth considering
- **🔵 Low**: Minor suggestions that may improve script quality

## How to Use

1. **Upload or Paste**: Load your script JSON file or paste the contents
   directly
2. **Validate**: Click the validation button to analyze your script
3. **Review Results**: Examine the warnings and suggestions provided
4. **Apply Judgment**: Decide which recommendations are relevant to your
   script's design goals

### Supported Script Formats

Scripts should be in one of the following formats:

```
[{"id": "_meta", "author":"TPI", "name":"TB"}, "washerwoman", "librarian", "investigator", etc...]
```

or

```
[{"id": "_meta", "author": "TPI", "name": "TB"}, {"id": "washerwoman"},  {"id": "librarian"},  {"id": "investigator"}, etc...]
```

Both formats are automatically detected and converted as needed.

## Technical Details

Built with Preact, TypeScript and Vite

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

This project is open source and available under the MIT License.

All characters, rules and descriptions are copyright of the TPI institute.
