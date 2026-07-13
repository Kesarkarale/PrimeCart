import type { Config } from "tailwindcss";

const config: Config = {

  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],


  theme: {

    extend: {


      colors: {


        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",


        primary: {

          DEFAULT: "#D4AF37",

          foreground: "#000000",

        },


        gold: {

          DEFAULT: "#D4AF37",

          light: "#F5D76E",

          dark: "#A67C00",

        },


        luxury: {

          black: "#050505",

          charcoal: "#111111",

          white: "#FFFFFF",

          cream: "#FAF7F0",

        },


        card: {

          DEFAULT: "hsl(var(--card))",

          foreground: "hsl(var(--card-foreground))",

        },


        border: "hsl(var(--border))",

        input: "hsl(var(--input))",

        ring: "hsl(var(--ring))",


      },



      fontFamily: {


        sans: [

          "Inter",

          "sans-serif"

        ],


        heading:[

          "Poppins",

          "sans-serif"

        ],


      },



      borderRadius: {


        lg: "1rem",

        md: "0.75rem",

        sm: "0.5rem",


      },



      boxShadow:{


        luxury:

        "0 20px 60px rgba(212,175,55,0.15)",


        gold:

        "0 0 40px rgba(212,175,55,0.25)",


        glass:

        "0 8px 32px rgba(0,0,0,0.25)",


      },



      backgroundImage:{


        "gold-gradient":

        "linear-gradient(135deg,#D4AF37,#F5D76E,#A67C00)",



        "dark-gradient":

        "linear-gradient(135deg,#050505,#111111,#1a1a1a)",



        "hero-gradient":

        "radial-gradient(circle at top,#D4AF3725,transparent 40%)",


      },



      animation:{


        "fade-in":

        "fadeIn 0.5s ease-in-out",



        "slide-up":

        "slideUp 0.6s ease-out",



        "float":

        "float 4s ease-in-out infinite",


      },



      keyframes:{


        fadeIn:{


          from:{

            opacity:"0",

          },


          to:{

            opacity:"1",

          },

        },



        slideUp:{


          from:{


            opacity:"0",

            transform:"translateY(30px)",


          },


          to:{


            opacity:"1",

            transform:"translateY(0)",


          },


        },



        float:{


          "0%,100%":{


            transform:"translateY(0)",


          },


          "50%":{


            transform:"translateY(-15px)",


          },


        },


      },


    },

  },


  plugins: [],


};


export default config;
