1. Film (Diegetic Prototypes) Crate Digger
This prompt instructs the AI to design an interface that feels like a film archivist’s light table or a post-production editing bay.

XML
<prompt name="CRATE_DIGGER_INTERFACE" version="1.1" target="film_prototype">
  <role>
    You are a designer of digital interfaces for deep research. You build tools that make exploration feel like crate digging—tactile, serendipitous, rewarding. You also respect the rigor of academic inquiry.
  </role>
  <instruction>
    Generate a single, self-contained HTML file that presents a collection of film production dossiers as a browsable, filterable, crate-digging interface. The file must include inline CSS and JavaScript. No external dependencies. Mobile-friendly. The interface should feel like flipping through storyboards on a light table or scanning physical film strips.
  </instruction>
  <design_specification>
    - **Visual Aesthetic:** "The Editor's Bay." Dark mode by default (deep charcoal/black) with glowing amber or cyan accents. Typography should mix a clean sans-serif for UI elements and a typewriter font for script notes.
    - **Card Design:** Each site in the "crate" should look like a mounted 35mm slide or a polaroid continuity photo. Hovering over a card should give a slight backlight effect.
    - **Filtering/Sorting:** Include a top navigation bar that looks like a film timeline. Filters must include categories like: "Pre-Production", "VFX Friction", "On-Set Notes", and "Technical Advising".
    - **Modal View (The Dossier):** When a user clicks a card, the modal should expand like a glowing light table. The five sections of the dossier (Pre-Production, Execution, Tech Logs, Post-Production, Reception) should be laid out like a script breakdown sheet.
  </design_specification>
  <technical_requirements>
    - Pure HTML, CSS, JavaScript. No frameworks, no external libraries.
    - Mobile-first responsive. Touch-friendly.
    - Accessible: semantic HTML, focus states, proper contrast.
    - Modal must be scrollable if content overflows.
    - Filter and search must work together (AND logic).
    - Default state: show all sites.
  </technical_requirements>
  <output_format>
    Return a single HTML file with inline <style> and <script>. Include a comment header with the prompt version. The user will paste their site list into a designated area in the script (marked with "PASTE SITES HERE").
  </output_format>
  <tone_and_feeling>
    This should feel like a tool made by an archivist who loves celluloid. Slightly worn. Highly technical but warm. Inviting exploration. Not sterile. The kind of interface you want to spend hours digging through in a dark room.
  </tone_and_feeling>
</prompt>
2. Repair Manuals Crate Digger
This prompt instructs the AI to design an interface that feels like a grease-stained workbench or a mechanic's filing cabinet.

XML
<prompt name="CRATE_DIGGER_INTERFACE" version="1.1" target="repair_manual">
  <role>
    You are a designer of digital interfaces for deep research. You build tools that make exploration feel like crate digging—tactile, serendipitous, rewarding. You also respect the rigor of academic inquiry.
  </role>
  <instruction>
    Generate a single, self-contained HTML file that presents a collection of technological repair dossiers as a browsable, filterable, crate-digging interface. The file must include inline CSS and JavaScript. No external dependencies. Mobile-friendly. The interface should feel like flipping through a battered metal filing cabinet in a subterranean repair shop.
  </instruction>
  <design_specification>
    - **Visual Aesthetic:** "The Workbench." Background should be a subtle blueprint grid or off-white with smudged textures. Colors should be industrial: safety orange, steel grey, and faded manila folder yellow. Typography must be purely monospace (e.g., Courier, Inconsolata) to mimic technical schematics and dot-matrix printers.
    - **Card Design:** Each site should look like a battered index card or a folded schematic. Hover states should feel slightly clunky, like pulling a heavy drawer.
    - **Filtering/Sorting:** Filters should look like physical toggle switches or tabbed manila folders. Categories must include: "OEM Specs", "Rogue Hacks", "Diagnostic Logs", and "Supply Chain".
    - **Modal View (The Dossier):** Clicking a card should open a modal that resembles a clipboard holding a multi-page work order. The five dossier sections should look like stamped or typed entries on a maintenance log.
  </design_specification>
  <technical_requirements>
    - Pure HTML, CSS, JavaScript. No frameworks, no external libraries.
    - Mobile-first responsive. Touch-friendly.
    - Accessible: semantic HTML, focus states, proper contrast.
    - Modal must be scrollable if content overflows.
    - Filter and search must work together (AND logic).
    - Default state: show all sites.
  </technical_requirements>
  <output_format>
    Return a single HTML file with inline <style> and <script>. Include a comment header with the prompt version. The user will paste their site list into a designated area in the script (marked with "PASTE SITES HERE").
  </output_format>
  <tone_and_feeling>
    This should feel like a tool made by a rogue mechanic who hoards documentation. Smudged. Pragmatic. Inviting exploration. Not glossy. The kind of interface you want to spend hours digging through to find the one hack that works.
  </tone_and_feeling>
</prompt>
3. Quick Start Guides Crate Digger
This prompt instructs the AI to design an interface that feels like the unnerving, hyper-clean experience of unboxing a consumer gadget with hidden dangers.

XML
<prompt name="CRATE_DIGGER_INTERFACE" version="1.1" target="quickstart_guide">
  <role>
    You are a designer of digital interfaces for deep research. You build tools that make exploration feel like crate digging—tactile, serendipitous, rewarding. You also respect the rigor of academic inquiry.
  </role>
  <instruction>
    Generate a single, self-contained HTML file that presents a collection of onboarding dossiers as a browsable, filterable, crate-digging interface. The file must include inline CSS and JavaScript. No external dependencies. Mobile-friendly. The interface should feel like unfolding a glossy, seemingly simple consumer pamphlet that gets darker the further you read.
  </instruction>
  <design_specification>
    - **Visual Aesthetic:** "The Sterile Unboxing." Stark, hospital white background. High contrast. Accent colors should be corporate blue and jarring "warning label" red. Typography must be hyper-legible, minimalist Helvetica/Arial for the "friendly" parts, and unreadably tiny 6pt serif for the "liability" parts.
    - **Card Design:** Each site should look like a pristine, folded paper leaflet or an app icon. Hovering should trigger a smooth, overly-engineered corporate animation (like a sleek slide-up).
    - **Filtering/Sorting:** Filters should look like minimalist pill buttons. Categories must include: "Step 1-3", "User Error", "Liability Shield", and "Internal Testing".
    - **Modal View (The Dossier):** The modal should open like an accordion-fold pamphlet. The glossy pitch sections should be huge and friendly, while the "Consequences" and "Liability" sections should be crammed at the bottom in dense, anxiety-inducing blocks of text.
  </design_specification>
  <technical_requirements>
    - Pure HTML, CSS, JavaScript. No frameworks, no external libraries.
    - Mobile-first responsive. Touch-friendly.
    - Accessible: semantic HTML, focus states, proper contrast.
    - Modal must be scrollable if content overflows.
    - Filter and search must work together (AND logic).
    - Default state: show all sites.
  </technical_requirements>
  <output_format>
    Return a single HTML file with inline <style> and <script>. Include a comment header with the prompt version. The user will paste their site list into a designated area in the script (marked with "PASTE SITES HERE").
  </output_format>
  <tone_and_feeling>
    This should feel like a tool made by a corporate whistleblower. Initially friendly and sleek, but ultimately suffocating and legalistic. Inviting exploration, but punishing it with fine print. 
  </tone_and_feeling>
</prompt>
4. Product Catalogs Crate Digger
This prompt instructs the AI to design an interface that mimics a cheap, densely packed mail-order catalog or dystopian discount circular.

XML
<prompt name="CRATE_DIGGER_INTERFACE" version="1.1" target="product_catalog">
  <role>
    You are a designer of digital interfaces for deep research. You build tools that make exploration feel like crate digging—tactile, serendipitous, rewarding. You also respect the rigor of academic inquiry.
  </role>
  <instruction>
    Generate a single, self-contained HTML file that presents a collection of retail dossiers as a browsable, filterable, crate-digging interface. The file must include inline CSS and JavaScript. No external dependencies. Mobile-friendly. The interface should feel like flipping through a cheap, newsprint mail-order catalog or an airplane Skymall magazine.
  </instruction>
  <design_specification>
    - **Visual Aesthetic:** "The Discount Circular." Background should be a slightly yellowed newsprint off-white. Use garish, high-contrast retail colors: bright yellow highlight boxes, "SALE" red, and cheap-looking halftone shadow effects. Typography should mix heavy, loud display fonts for titles and dense, cramped serif fonts for descriptions.
    - **Card Design:** Each site should look like a mail-order product listing in a dense grid. Hovering should trigger a cheap "magnifying glass" effect or slap a "BEST SELLER" sticker on it.
    - **Filtering/Sorting:** Filters should look like catalog index tabs or cheap coupon cut-outs. Categories must include: "Glossy Pitch", "Factory Reality", "1-Star Reviews", and "Grey Market".
    - **Modal View (The Dossier):** Clicking a card should pop up a modal that looks like a chaotic product detail page. The marketing pitch at the top, bordered by dotted "cut here" lines, descending into the gritty reality of manufacturing logs and regulatory warnings further down.
  </design_specification>
  <technical_requirements>
    - Pure HTML, CSS, JavaScript. No frameworks, no external libraries.
    - Mobile-first responsive. Touch-friendly.
    - Accessible: semantic HTML, focus states, proper contrast.
    - Modal must be scrollable if content overflows.
    - Filter and search must work together (AND logic).
    - Default state: show all sites.
  </technical_requirements>
  <output_format>
    Return a single HTML file with inline <style> and <script>. Include a comment header with the prompt version. The user will paste their site list into a designated area in the script (marked with "PASTE SITES HERE").
  </output_format>
  <tone_and_feeling>
    This should feel like a tool made by a bargain hunter in a dystopian flea market. Crowded. Loud. Cheap but fascinating. Inviting exploration. The kind of interface you want to spend hours digging through to find the weirdest possible artifacts.
  </tone_and_feeling>
</prompt> 