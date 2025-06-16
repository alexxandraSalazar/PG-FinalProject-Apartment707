# Apartment 707: Visualizing Nana’s World 🍓🪷

**Apartment 707** is a web-based 3D application developed using WebGL and React, which recreates the iconic apartment shared by the two protagonists of the manga and anime *Nana* by Ai Yazawa. This project is a tribute to that space and an exercise in applying advanced concepts of computer graphics programming. It was developed as part of the Computer Graphics course for third-year students in the Computer Engineering program at the Universidad Nacional de Ingeniería (UNI).

<p align="center">
  <img src="./readme-badge.svg" alt="Nana reame badge">
</p>


The project aims to demonstrate a practical implementation of real-time 3D rendering, object modeling, camera systems, lighting, and texture mapping, using modern web technologies. The final result is an interactive digital tour of Apartment 707, where users can navigate the virtual space and explore various elements and decorations familiar to fans of the series.

---

## Abstract

This project applies WebGL, React, and Three.js to recreate Apartment 707, combining design accuracy and interactive functionality. The development involved creating 3D models in Blender, managing scenes and assets using Three.js, and handling user interaction with keyboard and mouse controls. The outcome is a smooth and immersive web experience that reflects the spatial narrative of the source material while highlighting key computer graphics techniques.

---

## Keywords

- React  
- WebGL  
- Three.js  
- JavaScript  
- GLSL  
- 3D Rendering  
- Texture Mapping  
- Scene Composition  
- Orbit Controls  
- Camera System  
- Lighting Models  
- Blender  
- Modular UI  
- Frontend Architecture  

---

## Introduction

Apartment 707 is not only a physical space in the narrative of *Nana*, but also a symbolic one that reflects the lives and personalities of its residents. This project attempts to capture both the spatial and emotional atmosphere of the apartment using browser-based technologies.

The decision to implement the project in WebGL and React allows full compatibility with modern web environments, requiring no installation or compilation on the user’s part. All 3D assets were modeled externally using Blender, exported in glTF format, and integrated into the scene graph. React was used to organize UI components and manage the rendering lifecycle, while Three.js served as the main rendering engine for WebGL abstractions.

Through this project, students demonstrate knowledge in the following areas:

- WebGL-based rendering pipelines
- Real-time lighting and shading models
- Interactive navigation systems
- Import and management of external 3D assets
- Modular development of graphical scenes using JavaScript frameworks

---

## How to Navigate the Environment

Once the environment is running in the browser, users may explore the apartment freely using the following controls:

- `W` – Move forward  
- `S` – Move backward  
- `A` – Move left  
- `D` – Move right  
- Mouse drag – Rotate the view  
- Scroll wheel – Zoom in or out  
- `ESC` – Exit or pause the navigation  

These controls are implemented using orbit and pointer lock controls provided by Three.js, enhanced with custom logic for a smoother first-person experience.

---

## Running the Project Locally

To run the project on a local development server, follow these steps. You must have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

1. **Clone the repository**
   
   Open your terminal or command prompt and run:
   ```bash
   https://github.com/alexxandraSalazar/PG-FinalProject-Apartment707.git
   ```
2.**Install the dependencies**

  The project uses npm to manage packages:
   ```bash 
npm install
  ```
3.**Start the development server**

Use the following command to start the local development server:
   ```bash 
   npm run dev
  ```
  This will start the application, typically available at:
   ```bash 
  http://localhost:5173
  ```
You can now open your browser and navigate through Apartment 707 interactively.

4.**Build for production (optional)**
If you need to create a production-ready build:
   ```bash 
  npm run build
  ```
This will generate a dist/ directory with all the optimized files ready to be deployed to a hosting provider like Vercel, Netlify, or GitHub Pages.


## Authors

This project was developed by students of the **Universidad Nacional de Ingeniería (UNI)**, as part of the *Computer Graphics* course:

- [Salazar Alexandra](https://github.com/alexxandraSalazar)  
- [Reynosa Alexa](https://github.com/aaalexa)  
- [Martínez Didier](https://github.com/DYoussefMM)  
- [Alemán Kelvin ](https://github.com/kianaleman)

---

## License

This project is released under a **dual-license model**. You may use it under the terms of either license:

- [MIT License](https://choosealicense.com/licenses/mit/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

Both licenses permit free usage, modification, and distribution of the software under open-source terms.


## Conclusion

**Apartment 707** is a fusion of storytelling, visual design, and technical development. It serves as a demonstration of how web-based computer graphics can be used to recreate spaces from fiction in an immersive and interactive way. Through this project, students applied the theoretical concepts learned in class to create a meaningful digital experience that combines aesthetics with functionality.
