# BriX: A Modern AI Business Builder 🚀

![Banner Image for BriX](https://cdn.discordapp.com/attachments/1212099014745391207/1235335524005318776/528cc757-b70e-470b-8526-6d2be483d58f.png?ex=6634a81c&is=6633569c&hm=6ef640338d195cf5eae29a99f7a4ae067bc982bcdfb2a3b9080d60847f347238&)  <!-- Add a relevant banner image -->

# Brix-Pakverse Documentation

## Overview

Brix-Pakverse is an innovative AI-driven application designed to assist entrepreneurs in launching their businesses. By leveraging AI capabilities, the application interacts with users through a chatbot, refining and suggesting business-related parameters based on user input.

## Features

- **Content Generation**: Generates detailed business content for various aspects like marketing strategies and legal issues once initial parameters are set.

- **Automated Customer Interactions:** BriX enhances customer engagement through AI-powered chatbots and support systems. These tools continuously update and refine business parameters based on user feedback.

- **Customized Business Solutions:** Recognizing that no two businesses are alike, BriX allows for the creation of tailor-made modules. It generates detailed business content for various aspects like marketing strategies and legal issues once initial parameters are set.

- **Scalable Infrastructure:** As businesses grow, their needs evolve. BriX's scalable architecture ensures that businesses can expand their use of the platform without compromising performance, whether it's handling more users or integrating additional services.

- **Intuitive User Experience:** Designed with a focus on usability, BriX features an easy-to-navigate interface, making advanced business analytics accessible to users of varying technical skills.


## Prerequisites

- Node.js
- A modern browser
- An account with Vercel for deployment
- OpenAI API access for AI functionalities

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Graphfied/2024-AI-Challenge-Pakverse-Brix.git
   cd 2024-AI-Challenge-Pakverse-Brix
   ```

2. **Install dependencies with PNPM:**

   ```bash
   pnpm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root of your project and populate it with the necessary environment variables:
   ```plaintext
   NEXT_PUBLIC_OPENAI_KEY=<your openai key>
   NEXT_PUBLIC_ASSISTANT_ID=<your openai assistant id>
   ```

## Running the Application

To run the application locally:

```bash
pnpm run dev
```

**Don't forget Prisma**

```bash
npx prisma generate
```

This will start the development server on [http://localhost:3000](http://localhost:3000). Open this address in your browser to start using the application.

## Application Workflow

1. **User Input Collection**: Users input their Business Location, Budget, and Idea.
2. **Interaction with AI Chatbot**: The chatbot brain-storm with the users and refines these inputs and suggests additional business parameters.
3. **Confirmation and Refinement**: Users interact with the chatbot to refine these parameters until satisfaction.
4. **Final Submission**: Upon clicking the "GO" button, the refined data is used to generate detailed business content.
5. **Content Generation**: The application uses AI models trained with various business-related texts to generate content for specific business aspects.

## Tools Used

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Next.js API routes
- **AI Tools**: OpenAI's GPT models
- **Deployment**: Vercel
- **Package Manager**: PNPM

## Deployment

Deploy the application using Vercel. You can connect your GitHub repository to Vercel so that each push to your repository automatically deploys a new version of your site.

1. **Log in to your Vercel account and create a new project.**
2. **Connect your repository and configure build settings as follows:**
   - Build Command: `pnpm build`
   - Output Directory: `out`
3. **Add the same environment variables used locally to your Vercel project settings.**

## Conclusion

Brix-Pakverse offers a unique platform for entrepreneurs to refine their business ideas with the assistance of advanced AI technology. It simplifies the process of starting a business by providing tailored suggestions and generating necessary business documents.

# VoicedOver

## 2024 AI Challenge – Lazy Devs
"Talk your way through anything."

### Problem
In today's fast-paced world, speed and efficiency in digital interactions are essential, yet many technologies still fall short in delivering instant results. VoicedOver addresses this need by significantly enhancing user interaction speeds with digital platforms, advancing our global pursuit of faster technological responses.

### Solution
VoicedOver enables seamless communication with devices through voice commands, allowing users to operate applications without physical interaction. This enhances efficiency and accessibility, particularly beneficial for e-commerce platforms.

### Target Audience
The initial focus of VoicedOver is on e-commerce stores, with plans to expand to other sectors in the future.

## Engineering

### High-Level Design
VoicedOver is an API tool designed to evolve into a microservice. It accepts audio inputs, processes them using advanced AI technologies, and performs tasks within integrated applications.

### How It Works
1. **Audio Input**: Captures audio commands from the user.
2. **Speech to Text**: Uses OpenAI's Whisper to convert audio into text.
3. **Command Processing**: The text is processed by the OpenAI Assistant to determine and execute the required commands.
4. **Contextual Understanding**: GPT-4 Turbo enhances the response with relevant context.
5. **Text to Speech**: The final response is converted back into audio using TTS-1 for output to the user.

### Role of Generative AI
Generative AI is pivotal in interpreting user intent from audio inputs, executing appropriate actions, and providing audio responses, streamlining user interactions with digital platforms.

### Technologies
- Python 3.12
- Poetry
- FastAPI 0.110.2
- OpenAI Whisper
- OpenAI GPT-4 Turbo
- OpenAI TTS-1
- Streamlit (ONLY IF YOU WANT TO TEST IT IN STREAMLIT)

## Installation and Running the Application

### Prerequisites
Ensure you have Python 3.12 installed on your system. You can download it from [Python's official site](https://www.python.org/downloads/).

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd voicedover
   ```
3. Install dependencies using Poetry:
   ```bash
   poetry install
   ```
If poetry is not installed, you can always install it via:
 ```bash
   pip install poetry
   ```

### Running the Application
1. In one terminal, start the Streamlit frontend: (ONLY IF YOU WANT TO TEST IT IN STREAMLIT)
   ```bash
   streamlit run frontend.py
   ```
2. In another terminal, launch the FastAPI backend with Uvicorn:
   ```bash
   poetry run uvicorn voicedover.main:app --reload
   ```

## Results and Analysis
Our testing focused on the core functionalities such as listing, adding, and updating to-do items. The application demonstrated high reliability and user-friendliness, with only minor issues in update functionalities.

---

For more information or if you encounter any issues, please open an issue in this repository.


