## 📝 CV Generator

A **Django-based** web application that allows users to create and generate professional CVs. 
This project integrates **AI** to suggest **profiles** and **skills** based on user input.

## 🚀 Features

✅ Generate professional CVs in **PDF format** using WeasyPrint
✅ **AI-powered** profile and skills suggestion
✅ User-friendly interface for inputting **personal details, experiences, and skills**
✅ Supports **image uploads** for profile pictures
✅ Responsive design for desktop and mobile using Bootstrap5 and Bootstrap Icons

## 🛠️ Technologies Used

  - Backend: Django, Python
  - Frontend: Bootstrap-5, jQuery
  - PDF Generation: WeasyPrint
  - AI Integration: **Google Gemini** AI-assistant for profile and skills generation

## 📦 Installation

1️⃣  Clone the Repository

  ```bash
  git clone https://github.com/yourusername/cv-generator.git
  cd cv-generator
  ```

2️⃣  Create a Virtual Environment

  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows use: venv\Scripts\activate
  ```

3️⃣  Install Dependencies

  ```bash
  pip install -r requirements.txt
  ```

4️⃣  Run the Development Server

  ```bash
  python manage.py runserver
  ```
  Open your browser and visit http://127.0.0.1:8000/resumes/create

## 💡 AI-Powered Profile & Skills Generation

This project leverages AI to automatically suggest a professional profile summary and relevant skills based on user inputs. The AI analyzes the user's job role and experience to provide tailored recommendations, enhancing the CV creation process.
