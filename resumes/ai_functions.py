#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import dotenv
dotenv.load_dotenv(dotenv.find_dotenv())

import google.generativeai as genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_profile(job_title):
    prompt = f"""
    You are an expert in career development and job market analysis.
    I am building a CV generator, and I need a profile of given job title.

    - Generate a professional summary for a {job_title} profile.
    - Detect the language of the job title provided and return the response in the same language.
    - The summary should highlight key skills, expertise, and experience relevant to the role.
    - Keep it concise (100-150 words) and well-structured, making it suitable for a CV or LinkedIn profile.
    - Use a professional and engaging tone.
    - Do **not** include unnecessary explanations, just return the experience description as a single string.
    """
    try:
        res = model.generate_content(prompt)
        ai_profile = res.text
        return {'status': 'success', 'ai_profile': ai_profile}
    except Exception as err:
        return {'status': 'error', 'message': str(err)}


def generate_education_description(diploma):
    prompt = f"""
    You are an expert in education and career development.
    I am building a CV generator, and I need a **professional education description** based on the given diploma or degree.

    ### **Diploma/Degree:** **{diploma}**

    ### **Requirements:**
    - Detect the language of the diploma and generate the response in the same language.
    - Generate a concise and well-structured description (3-5 sentences).
    - Highlight key subjects, skills acquired, and relevance to the job market.
    - Use a formal and professional tone suitable for a CV.
    - If the diploma is general (e.g., "Bachelor of Science"), make the description **broad but relevant**.
    - If it's specific (e.g., "Bachelor in Computer Science"), focus on **technical knowledge and industry relevance**.
    - **Only return the description text without any extra information.**

    ### **Example Output (for "Bachelor in Computer Science")**
    "A Bachelor's degree in Computer Science provides a strong foundation in programming, algorithms, and software engineering. Students develop expertise in data structures, databases, and system architecture. The program emphasizes problem-solving, analytical thinking, and hands-on experience with modern technologies, preparing graduates for roles in software development, data analysis, and IT consulting."
    """
    try:
        res = model.generate_content(prompt)
        ai_edu_desc = res.text
        return {'status': 'success', 'ai_edu_desc': ai_edu_desc}
    except Exception as err:
        return {'status': 'error', 'message': str(err)}


def generate_skills(job_title):
    prompt = f"""
    You are an expert in career development and job market analysis.
    I am building a CV generator, and I need a list of essential skills for a given job title.

    Detect the language of the job title provided and return the response in the same language.
    Please return a structured JSON list of **exactly 15** skills for the following job title: **{job_title}**

    ### **Output Format (JSON)**
    {{
        "skills": [
            "Skill 1",
            "Skill 2",
            "Skill 10",
            "..."
        ]
    }}

    - Make sure the skills are **highly relevant** and include both **technical** and **soft skills** if applicable.
    - Only return the JSON response without any extra text.
    """
    try:
        res = model.generate_content(prompt)
        skills = list()

        txt = res.text.split('\n')
        for line in txt:
            line = line.strip().strip(',')
            if line.startswith('"') and line.endswith('"'):
                skills.append(line.strip('"'))
        return {'status': 'success', 'ai_skills': skills}
    except Exception as err:
        return {'status': 'error', 'message': str(err)}


def generate_experience_description(job_title):
    prompt = f"""
    You are an expert in career development and job market analysis.
    I am building a CV generator, and I need a **professional experience description** based on the given job title.

    ### **Job Title:** **{job_title}**

    - Provide a concise yet detailed description of key responsibilities, achievements, and impact.
    - Focus on practical tasks, tools used, and measurable outcomes.
    - Maintain a formal and professional tone suitable for a CV.
    - Ensure the response is a single, well-structured paragraph.
    - Detect the language of the job title and generate the response in the same language.
    - Do **not** include unnecessary explanations, just return the experience description as a single string.
    """
    try:
        res = model.generate_content(prompt)
        ai_edu_desc = res.text
        return {'status': 'success', 'ai_exp_desc': ai_edu_desc}
    except Exception as err:
        return {'status': 'error', 'message': str(err)}


if __name__ == '__main__':
    """
    Install an additional SDK for JSON schema support Google AI Python SDK
    $ pip install google.ai.generativelanguage
    """
    import time
    import pyautogui
    from pathlib import Path

    BASE_DIR = Path(__file__).resolve().parent.parent

    time.sleep(2)
    pyautogui.hotkey('ctrl', 'p')
    # x = 1103
    # y = 695
    time.sleep(1)
    pyautogui.press('return')

    time.sleep(1)
    x = 458
    y = 72
    pyautogui.click(x, y)

    # pyautogui.write(str(BASE_DIR))
    # pyautogui.press('return')
