# Technical Task

This project is a technical task showcasing various features and components built with Vue.js. The project includes branch management, utility functions, dark mode support, and more.

## Features

1. **Component Auto-Importing**:

   - Components are auto-imported using `unplugin-vue-components`.

2. **Utility Functions**:

   - Utility functions for creating UUIDs and managing day orders.
   - Includes API client setup for making HTTP requests.

3. **Icons Integration**:

   - Integration with various icon sets (e.g., Fluent, IconPark, Zondicons).
   - Components for rendering icons with customizable styles.

4. **Dark Mode Support**:
   - Dark mode support using `useDark` and `useToggle` from VueUse.
   - Customizable dark mode styles for components and layout.

## Technologies Used

- **Vue.js**: JavaScript framework for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Pinia**: Store library for Vue.js.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **VueUse**: Collection of essential Vue composition utilities.
- **unplugin-vue-components**: On-demand components auto-importing for Vue.

## Tools

- **Vite**: Next-generation frontend tooling for Vue.js.
- **Axios**: Promise-based HTTP client for making API requests.

## Folder Structure

```
technicalTask/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   └── (Static assets such as images, icons, etc.)
│   ├── components/
│   │   ├── Features/
│   │   │   ├── BranchsMangment/
│   │   │   │   └── (Components related to branch management)
│   │   │   ├── Feature2/
│   │   │   │   └── (Additional feature components)
│   │   ├── Layout/
│   │   │   └── (Layout components such as Navbar, Footer, etc.)
│   │   ├── sharedAtoms/
│   │   │   ├── atoms/
│   │   │   │   └── (Reusable atomic components like buttons, inputs, etc.)
│   │   │   ├── molecules/
│   │   │   │   └── (Reusable complex components like modals, tables, etc.)
│   ├── services/
│   │   └── (API service functions)
│   ├── store/
│   │   └── (Pinia store modules)
│   ├── types/
│   │   └── (TypeScript type definitions)
│   ├── utils/
│   │   └── (Utility functions)
│   ├── App.vue
│   ├── auto-imports.d.ts
│   ├── components.d.ts
│   ├── main.ts
│   └── router.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.ts
```

### Folder Descriptions

- **public/**:

  - Contains static files like `favicon.ico` and `index.html` that are served directly.

- **src/**:

  - Main source folder for the application.

  - **assets/**:

    - This folder contains static assets such as images, icons, and other media files.

  - **components/**:

    - Contains Vue components organized into subfolders:
      - **Features/**: Components related to specific features.
      - **Layout/**: Components for layout structures like Navbar, Footer, etc.
      - **sharedAtoms/**: Reusable components:
        - **atoms/**: Basic components such as buttons, inputs, etc.
        - **molecules/**: More complex components like modals, tables, etc.

  - **services/**:

    - Contains API service functions for making HTTP requests.

  - **store/**:

    - Contains Pinia store modules for state management.

  - **types/**:

    - Contains TypeScript type definitions.

  - **utils/**:

    - Contains utility functions.

  - **App.vue**:

    - The root Vue component for the application.

  - **auto-imports.d.ts**:

    - TypeScript declaration file for auto-imported components.

  - **components.d.ts**:

    - TypeScript declaration file for global components.

  - **main.ts**:

    - Entry point for the Vue application.

  - **router.ts**:
    - Vue Router configuration file.

- **.gitignore**:

  - Specifies files and directories to be ignored by Git.

- **index.html**:

  - The main HTML file for the application.

- **package.json**:

  - Contains project metadata and dependencies.

- **README.md**:

  - Project documentation file.

- **tailwind.config.js**:

  - Configuration file for Tailwind CSS.

- **vite.config.ts**:
  - Configuration file for Vite.

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedmaghraby/technicalTask.git
   ```
2. Navigate to the project directory:
   ```bash
   cd technicalTask
   ```
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Previewing the Production Build

```bash
npm run preview
# or
yarn preview
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

```

Feel free to modify the README file as needed to fit the specifics of your project.
```
