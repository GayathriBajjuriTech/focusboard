# AI Usage Disclosure

## Tools Used
- Claude (Anthropic): generated the first version of the code and documentation, and helped me debug, test and match the Figma design.

## Representative Prompts
1. "Build the whole FocusBoard project" (I attached the assignment brief and the implementation guide).
2. "Update the Focus Notes carousel to match these Figma slides" (I shared screenshots of the three slides).
3. "Give me the full index.css with the horizontal scroll fixed."
4. "Give me a checklist to test the app at 390, 768 and 1440 px."

## AI-Assisted Areas
- Component structure, state management and CRUD logic
- localStorage hook, filtering and statistics
- Responsive CSS and accessibility attributes
- README, test checklist and debugging help

## Verified or Corrected Suggestion
The first version used placeholder text for the Focus Notes slides, because the AI could not open Figma. I checked it against the Figma frames and replaced the text, the labels and the card on each slide with the exact Figma content. While testing, I also found a horizontal scrollbar at an in-between window width, and fixed it with min-width rules in the CSS.