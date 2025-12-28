# 🩺 AI-Cura Health

**AI-Cura Health** is an intelligent, AI-powered healthcare platform designed to provide early disease detection, personalized health insights, and instant medical assistance. By leveraging Machine Learning (ML) for diagnostics and Large Language Models (LLMs) for consultation, AI-Cura aims to make healthcare more accessible and proactive.

## 🚀 Key Features

* **Multi-Disease Prediction**: Highly accurate ML models to predict common health conditions:
* 💓 **Heart Disease**: Risk assessment based on clinical parameters.
* 🍬 **Diabetes**: Prediction based on glucose, BMI, and age.
* 🏥 **Chronic Kidney Disease**: Analysis of kidney health indicators.
* 🧠 **Liver Disease**: Assessment of hepatic biomarkers.


* **AI Medical Assistant**: An LLM-powered chatbot (utilizing Google Gemini/OpenAI GPT) that answers medical queries, explains reports, and provides general health advice.
* **Health Dashboard**: A user-friendly interface to track health metrics and view prediction history.
* **Smart Recommendations**: Personalized diet and lifestyle suggestions based on prediction results.

## 🛠️ Tech Stack

* **Frontend**: [Streamlit / React.js]
* **Backend**: [Python / FastAPI / Flask]
* **Machine Learning**: Scikit-learn, XGBoost, TensorFlow
* **Generative AI**: Google Gemini API / OpenAI API / LangChain
* **Data Handling**: Pandas, NumPy
* **Deployment**: [Heroku / Streamlit Cloud / Docker]

## 📂 Project Structure

```text
ai-cura-health/
├── datasets/             # Raw and processed health data
├── models/               # Saved .pkl or .h5 ML models
├── notebooks/            # Jupyter notebooks for EDA and Training
├── static/               # Images and CSS files
├── app.py                # Main application file (Streamlit/Flask)
├── requirements.txt      # List of dependencies
└── README.md             # Project documentation

```

## ⚙️ Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/rishicodesforfun/ai-cura-health.git
cd ai-cura-health

```


2. **Create a Virtual Environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

```


3. **Install Dependencies**:
```bash
pip install -r requirements.txt

```


4. **Set Up Environment Variables**:
Create a `.env` file in the root directory and add your API keys:
```env
GEMINI_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key

```


5. **Run the Application**:
```bash
streamlit run app.py

```



## 📊 How It Works

1. **Input Data**: User enters clinical data (e.g., Blood Pressure, Glucose levels).
2. **ML Processing**: The backend processes the input through trained models to determine the probability of a disease.
3. **AI Insight**: If a risk is detected, the AI Chatbot provides an explanation and suggests the next steps.
4. **Visualization**: Real-time graphs show how the user's data compares to healthy benchmarks.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**Rishi** - [@rishicodesforfun](https://www.google.com/search?q=https://github.com/rishicodesforfun)

Project Link: [https://github.com/rishicodesforfun/ai-cura-health](https://github.com/rishicodesforfun/ai-cura-health)

---

*Disclaimer: AI-Cura Health is an AI-assisted tool and should not be used as a replacement for professional medical diagnosis or treatment. Always consult a certified doctor.*

